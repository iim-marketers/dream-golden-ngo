"use client";

import {
  CountUp,
  ProgressBar,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion-primitives";
import { ShieldCheckIcon } from "@/components/icons";
import { allocation } from "@/lib/site";

export function Transparency() {
  return (
    <section id="transparency" className="bg-cream-100 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-coral-700">100% Transparency</p>
            <h2 className="mt-5 max-w-sm font-heading text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] text-green-900 sm:text-4xl lg:text-[2.85rem]">
              Where Your Contribution Goes
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-green-800/70">
              Every rupee is tracked to ensure maximum field impact.
            </p>

            <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-coral-500/30 bg-white p-5">
              <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-coral-700" />
              <p className="text-[0.85rem] leading-relaxed text-green-800/75">
                Books are open to every donor and CSR partner — request a
                field-utilisation report any time.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="space-y-8">
            {allocation.map((item, i) => (
              <StaggerItem key={item.label}>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-lg font-bold text-green-900 sm:text-xl">
                      {item.label}
                    </h3>
                    <span className="font-heading text-2xl font-extrabold tracking-tight text-coral-600 tabular-nums sm:text-3xl">
                      <CountUp value={item.percent} suffix="%" />
                    </span>
                  </div>
                  <ProgressBar
                    percent={item.percent}
                    delay={0.1 + i * 0.12}
                    className="mt-3.5"
                  />
                  <p className="mt-3 text-[0.85rem] text-green-800/60">
                    {item.detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
