"use client";

import { useState } from "react";

import { LinkButton } from "@/components/link-button";
import { Badge } from "@/components/ui/badge";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion-primitives";
import { ArrowRightIcon } from "@/components/icons";
import { bank, waysToGive } from "@/lib/site";
import { cn } from "@/lib/utils";

const bankRows = [
  { label: "Account Name", value: bank.accountName },
  { label: "Bank", value: bank.bankName },
  { label: "Account No.", value: bank.accountNumber },
  { label: "IFSC Code", value: bank.ifsc },
];

export function WaysToGive() {
  return (
    <section id="give" className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-coral-700">Get Involved</p>
          <h2 className="mt-5 font-heading text-3xl leading-[1.06] font-extrabold tracking-[-0.02em] text-green-900 sm:text-4xl lg:text-[3rem]">
            3 Ways You Can Create an Impact Today
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {waysToGive.map((way) => (
            <StaggerItem key={way.id} className="h-full">
              <div
                className={cn(
                  "group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8 border-coral-500/40",
                  way.featured
                    ? "grain border-coral-500/30 bg-green-700 text-cream-100"
                    : " bg-white hover:shadow-[0_20px_45px_-28px_rgba(38,84,63,0.45)]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-heading text-3xl font-extrabold tabular-nums",
                      way.featured ? "text-coral-400/70" : "text-green-700/70",
                    )}
                  >
                    {way.index}
                  </span>
                  {way.featured && (
                    <Badge className="rounded-full border-none bg-coral-600 text-[0.65rem] font-semibold tracking-wider text-cream-50 uppercase">
                      Most popular
                    </Badge>
                  )}
                </div>

                <h3
                  className={cn(
                    "mt-6 font-heading text-xl leading-snug font-bold tracking-tight sm:text-[1.35rem]",
                    way.featured ? "text-cream-50" : "text-green-700",
                  )}
                >
                  {way.title}
                </h3>

                <p
                  className={cn(
                    "mt-4 text-[0.92rem] leading-relaxed",
                    way.featured ? "text-cream-100/70" : "text-green-800/85",
                  )}
                >
                  {way.body}
                </p>

                <div className="mt-auto pt-7">
                  <LinkButton
                    href={way.href}
                    external={way.href.startsWith("http")}
                    variant={way.featured ? "default" : "outline"}
                    className={cn(
                      "group/btn h-11 w-full rounded-full bg-coral-600 text-cream-50! hover:bg-coral-500",
                    )}
                  >
                    {way.cta}
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </LinkButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <BankDetails />
      </div>
    </section>
  );
}

function BankDetails() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      // Clipboard unavailable (insecure context) — the value is still visible.
    }
  }

  return (
    <Reveal className="mt-6">
      <div className="rounded-3xl border border-green-900/10 bg-white p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-heading text-xl font-bold tracking-tight text-green-900">
            Bank Transfer Details
          </h3>
          <p className="text-[0.78rem] text-green-800/70">
            Prefer NEFT / UPI? Use the account below.
          </p>
        </div>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-green-900/10 sm:grid-cols-2">
          {bankRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 bg-cream-50 px-5 py-4"
            >
              <div className="min-w-0">
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-green-800/65 uppercase">
                  {row.label}
                </dt>
                <dd className="mt-1 truncate text-[0.92rem] font-medium text-green-900">
                  {row.value}
                </dd>
              </div>
              <button
                type="button"
                onClick={() => copy(row.label, row.value)}
                className="shrink-0 rounded-full border border-green-900/12 px-3 py-1.5 text-[0.7rem] font-semibold text-green-800/85 transition-colors hover:border-coral-600 hover:text-coral-700"
              >
                {copied === row.label ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
