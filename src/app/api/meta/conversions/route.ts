import type { NextRequest } from "next/server";

import {
  isAllowedEvent,
  sendConversionEvent,
  type UserSignals,
} from "@/lib/meta/conversions";

function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

function deriveFbc(
  cookieValue: string | undefined,
  sourceUrl: URL | undefined,
): string | undefined {
  if (cookieValue) return cookieValue;

  const fbclid = sourceUrl?.searchParams.get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

function parseSourceUrl(raw: unknown, request: NextRequest): URL | undefined {
  if (typeof raw !== "string") return undefined;

  try {
    const url = new URL(raw);
    return url.host === request.nextUrl.host ? url : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  const { eventName, eventId, eventSourceUrl } = (body ?? {}) as {
    eventName?: unknown;
    eventId?: unknown;
    eventSourceUrl?: unknown;
  };

  if (!isAllowedEvent(eventName)) {
    return Response.json({ error: "unsupported event" }, { status: 400 });
  }

  if (
    typeof eventId !== "string" ||
    eventId.length < 8 ||
    eventId.length > 128
  ) {
    return Response.json({ error: "invalid eventId" }, { status: 400 });
  }

  const sourceUrl = parseSourceUrl(eventSourceUrl, request);

  const signals: UserSignals = {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
    fbp: request.cookies.get("_fbp")?.value,
    fbc: deriveFbc(request.cookies.get("_fbc")?.value, sourceUrl),
  };

  const result = await sendConversionEvent({
    eventName,
    eventId,
    eventSourceUrl: sourceUrl?.toString(),
    signals,
  });

  if (!result.ok) {
    console.error(
      `[meta-capi] failed to send event: ${result.reason} ` +
        `fbtrace_id=${result.fbtraceId ?? "none"}`,
    );
    return Response.json({ error: "upstream rejected" }, { status: 502 });
  }

  return Response.json({ eventsReceived: result.eventsReceived });
}
