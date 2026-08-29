import { createHmac, timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

import { sendConversionEvent } from "@/lib/meta/conversions";

/* Cashfree signs webhooks as base64(HMAC-SHA256(timestamp + rawBody, secret)).
   The raw body must be hashed exactly as received — re-serializing the parsed
   JSON reorders keys and changes whitespace, which breaks the digest. */
function isSignatureValid(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
  secret: string,
): boolean {
  if (!timestamp || !signature) return false;

  const expected = createHmac("sha256", secret)
    .update(timestamp + rawBody)
    .digest("base64");

  const a = Buffer.from(expected);
  const b = Buffer.from(signature);

  /* timingSafeEqual throws on length mismatch, so guard before comparing. */
  return a.length === b.length && timingSafeEqual(a, b);
}

/* Cashfree's payload shape varies by API version, and payment forms differ
   again from the orders API. Rather than pin one shape, look through the
   plausible locations for each field. */
function pick(source: unknown, paths: string[][]): unknown {
  for (const path of paths) {
    let value: unknown = source;
    for (const key of path) {
      if (typeof value !== "object" || value === null) {
        value = undefined;
        break;
      }
      value = (value as Record<string, unknown>)[key];
    }
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export async function POST(request: NextRequest) {
  const secret = process.env.CASHFREE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[cashfree] CASHFREE_WEBHOOK_SECRET is not set");
    return Response.json({ error: "not configured" }, { status: 500 });
  }

  const rawBody = await request.text();

  /* Verified before parsing: an unsigned request must never be able to inject
     a fake donation into the ad data. */
  if (
    !isSignatureValid(
      rawBody,
      request.headers.get("x-webhook-timestamp"),
      request.headers.get("x-webhook-signature"),
      secret,
    )
  ) {
    console.warn("[cashfree] rejected webhook with invalid signature");
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  const type = asString(pick(payload, [["type"], ["event"]]));
  const status = asString(
    pick(payload, [
      ["data", "payment", "payment_status"],
      ["data", "order", "order_status"],
      ["payment_status"],
    ]),
  );

  /* Only completed payments are conversions. Everything else is acknowledged
     with a 200 so Cashfree stops retrying it. */
  const succeeded =
    type?.includes("PAYMENT_SUCCESS") || status === "SUCCESS" || status === "PAID";

  if (!succeeded) {
    return Response.json({ ignored: type ?? status ?? "unknown" });
  }

  const orderId = asString(
    pick(payload, [
      ["data", "order", "order_id"],
      ["order_id"],
      ["data", "payment", "cf_payment_id"],
    ]),
  );

  const value = asNumber(
    pick(payload, [
      ["data", "payment", "payment_amount"],
      ["data", "order", "order_amount"],
      ["order_amount"],
    ]),
  );

  const currency =
    asString(
      pick(payload, [
        ["data", "payment", "payment_currency"],
        ["data", "order", "order_currency"],
        ["order_currency"],
      ]),
    ) ?? "INR";

  const email = asString(
    pick(payload, [
      ["data", "customer_details", "customer_email"],
      ["customer_details", "customer_email"],
      ["customer_email"],
    ]),
  );

  const phone = asString(
    pick(payload, [
      ["data", "customer_details", "customer_phone"],
      ["customer_details", "customer_phone"],
      ["customer_phone"],
    ]),
  );

  if (!orderId || value === undefined) {
    /* Logged in full: the payload shape differs between Cashfree versions, and
       the raw body is what makes the mismatch diagnosable. */
    console.error("[cashfree] could not read order id or amount from:", rawBody);
    return Response.json({ error: "unrecognised payload" }, { status: 200 });
  }

  if (!email && !phone) {
    /* Still worth reporting, but Meta has nothing to match on, so it will not
       be attributed to an ad click. */
    console.warn(`[cashfree] order ${orderId} has no email or phone to match on`);
  }

  const result = await sendConversionEvent({
    eventName: "Donate",
    /* The order id doubles as the dedup key: Cashfree retries a webhook until
       it gets a 200, and Meta discards repeats of an id it has already seen. */
    eventId: orderId,
    /* Taken from the request rather than site config, so the reported origin
       matches wherever this is actually deployed (preview URL or live domain)
       instead of a hardcoded domain that may not serve the site yet. */
    eventSourceUrl: request.nextUrl.origin,
    signals: { email, phone },
    customData: { value, currency },
  });

  if (!result.ok) {
    console.error("[cashfree] failed to report donation:", result.reason);
    /* A 500 asks Cashfree to retry, which is the behaviour we want when the
       failure is transient. */
    return Response.json({ error: "reporting failed" }, { status: 500 });
  }

  console.log(`[cashfree] reported Donate ${currency} ${value} (order ${orderId})`);
  return Response.json({ ok: true });
}
