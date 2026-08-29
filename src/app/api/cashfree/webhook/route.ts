import { createHmac, timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

import { sendConversionEvent } from "@/lib/meta/conversions";

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

/* Donor contact details are the match keys Meta needs, so it matters whether
   they arrived. Logs persist and are widely readable, so only a masked form is
   recorded: enough to confirm presence and spot a malformed value, not enough
   to identify anyone. */
function maskEmail(email: string | undefined): string {
  if (!email) return "MISSING";
  const [local, domain] = email.split("@");
  if (!domain) return "MALFORMED";
  return `${local.slice(0, 1)}***@${domain}`;
}

function maskPhone(phone: string | undefined): string {
  if (!phone) return "MISSING";
  const digits = phone.replace(/\D/g, "");
  return digits.length <= 4
    ? "TOO_SHORT"
    : `***${digits.slice(-4)} (${digits.length} digits)`;
}

/* Key names only, never values: shows where Cashfree put the customer fields
   when the expected paths come back empty. */
function keysOf(value: unknown): string {
  return typeof value === "object" && value !== null
    ? Object.keys(value).join(",")
    : "n/a";
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
    type?.includes("PAYMENT_SUCCESS") ||
    status === "SUCCESS" ||
    status === "PAID";

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
    console.error(
      "[cashfree] could not read order id or amount from:",
      rawBody,
    );
    return Response.json({ error: "unrecognised payload" }, { status: 200 });
  }

  console.log(
    `[cashfree] order ${orderId} match keys — email: ${maskEmail(email)}, phone: ${maskPhone(phone)}`,
  );

  if (!email && !phone) {
    const data = (payload as { data?: unknown }).data;
    console.warn(
      `[cashfree] order ${orderId} has no email or phone to match on. ` +
        `data keys: [${keysOf(data)}] customer_details keys: ` +
        `[${keysOf((data as { customer_details?: unknown })?.customer_details)}]`,
    );
  }

  const result = await sendConversionEvent({
    eventName: "Donate",
    eventId: orderId,
    eventSourceUrl: request.nextUrl.origin,
    signals: { email, phone },
    customData: { value, currency },
  });

  if (!result.ok) {
    console.error(
      `[cashfree] failed to report donation: ${result.reason} ` +
        `fbtrace_id=${result.fbtraceId ?? "none"}`,
    );
    return Response.json({ error: "reporting failed" }, { status: 500 });
  }

  console.log(
    `[cashfree] reported Donate ${currency} ${value} (order ${orderId}) ` +
      `events_received=${result.eventsReceived} fbtrace_id=${result.fbtraceId ?? "none"}`,
  );
  return Response.json({ ok: true });
}
