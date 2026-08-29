import { createHash } from "node:crypto";

import { site } from "@/lib/site";

const GRAPH_VERSION = "v23.0";

export const ALLOWED_EVENTS = [
  "PageView",
  "Lead",
  "Contact",
  "Donate",
] as const;

export type MetaEventName = (typeof ALLOWED_EVENTS)[number];

export function isAllowedEvent(value: unknown): value is MetaEventName {
  return (
    typeof value === "string" &&
    (ALLOWED_EVENTS as readonly string[]).includes(value)
  );
}

/** Signals collected server-side from the request, never trusted from the client. */
export type UserSignals = {
  ip?: string;
  userAgent?: string;
  /** `_fbp` browser-pixel cookie. */
  fbp?: string;
  /** `_fbc` click-id cookie, or one derived from an `fbclid` query param. */
  fbc?: string;
  email?: string;
  phone?: string;
};

export type ConversionEvent = {
  eventName: MetaEventName;
  eventId: string;
  eventSourceUrl?: string;
  signals: UserSignals;
  customData?: Record<string, string | number>;
  /* Unix seconds. Defaults to now; pass the real payment time for events
     replayed from a webhook retry so attribution stays accurate. */
  eventTime?: number;
};

/* Meta matches on SHA-256 of normalized values: lowercased and trimmed, with
   phone numbers reduced to digits. Hashing the un-normalized string produces a
   different digest and silently fails to match. */
function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: string): string {
  return hash(email.trim().toLowerCase());
}

function hashPhone(phone: string): string {
  return hash(phone.replace(/\D/g, ""));
}

function buildUserData(signals: UserSignals) {
  const userData: Record<string, unknown> = {};

  if (signals.ip) userData.client_ip_address = signals.ip;
  if (signals.userAgent) userData.client_user_agent = signals.userAgent;
  if (signals.fbp) userData.fbp = signals.fbp;
  if (signals.fbc) userData.fbc = signals.fbc;
  /* Hashed identifiers are arrays — Meta accepts several per user. */
  if (signals.email) userData.em = [hashEmail(signals.email)];
  if (signals.phone) userData.ph = [hashPhone(signals.phone)];

  return userData;
}

export type SendResult =
  | { ok: true; eventsReceived: number }
  | { ok: false; reason: string };

export async function sendConversionEvent(
  event: ConversionEvent,
): Promise<SendResult> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!accessToken) {
    return { ok: false, reason: "META_CAPI_ACCESS_TOKEN is not set" };
  }

  const payload = {
    data: [
      {
        event_name: event.eventName,
        /* Seconds, not milliseconds. Meta rejects events older than 7 days. */
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: "website",
        user_data: buildUserData(event.signals),
        custom_data: event.customData,
      },
    ],
    access_token: accessToken,
  };

  const endpoint = `https://graph.facebook.com/${GRAPH_VERSION}/${site.metaPixelId}/events`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = (await response.json()) as {
      events_received?: number;
      error?: { message?: string };
    };

    if (!response.ok) {
      return {
        ok: false,
        reason: body.error?.message ?? `HTTP ${response.status}`,
      };
    }

    return { ok: true, eventsReceived: body.events_received ?? 0 };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "network error",
    };
  }
}
