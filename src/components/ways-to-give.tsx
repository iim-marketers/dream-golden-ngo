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
          <p className="eyebrow text-gold-500">Get Involved</p>
          <h2 className="mt-5 font-heading text-3xl leading-[1.06] font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl lg:text-[3rem]">
            3 Ways You Can Create an Impact Today
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {waysToGive.map((way) => (
            <StaggerItem key={way.id} className="h-full">
              <div
                className={cn(
                  "group flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-8",
                  way.featured
                    ? "grain border-gold-500/30 bg-forest-900 text-cream-100"
                    : "border-forest-900/10 bg-white hover:border-gold-500/40 hover:shadow-[0_20px_45px_-28px_rgba(14,42,27,0.5)]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-heading text-3xl font-extrabold tabular-nums",
                      way.featured ? "text-gold-400/70" : "text-forest-900/15",
                    )}
                  >
                    {way.index}
                  </span>
                  {way.featured && (
                    <Badge className="rounded-full border-none bg-gold-500 text-[0.65rem] font-semibold tracking-wider text-forest-950 uppercase">
                      Most popular
                    </Badge>
                  )}
                </div>

                <h3
                  className={cn(
                    "mt-6 font-heading text-xl leading-snug font-bold tracking-tight sm:text-[1.35rem]",
                    way.featured ? "text-cream-50" : "text-forest-900",
                  )}
                >
                  {way.title}
                </h3>

                <p
                  className={cn(
                    "mt-4 text-[0.92rem] leading-relaxed",
                    way.featured ? "text-cream-100/70" : "text-forest-800/70",
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
                      "group/btn h-11 w-full rounded-full",
                      way.featured
                        ? "bg-gold-500 text-forest-950 hover:bg-gold-400"
                        : "border-forest-900/15 bg-transparent text-forest-900 hover:bg-forest-900 hover:text-cream-50",
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
      <div className="rounded-3xl border border-forest-900/10 bg-white p-7 sm:p-9">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-heading text-xl font-bold tracking-tight text-forest-900">
            Bank Transfer Details
          </h3>
          <p className="text-[0.78rem] text-forest-800/55">
            Prefer NEFT / UPI? Use the account below.
          </p>
        </div>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-forest-900/10 sm:grid-cols-2">
          {bankRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 bg-cream-50 px-5 py-4"
            >
              <div className="min-w-0">
                <dt className="text-[0.68rem] font-semibold tracking-[0.16em] text-forest-800/50 uppercase">
                  {row.label}
                </dt>
                <dd className="mt-1 truncate text-[0.92rem] font-medium text-forest-900">
                  {row.value}
                </dd>
              </div>
              <button
                type="button"
                onClick={() => copy(row.label, row.value)}
                className="shrink-0 rounded-full border border-forest-900/12 px-3 py-1.5 text-[0.7rem] font-semibold text-forest-800/70 transition-colors hover:border-gold-500 hover:text-gold-500"
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
