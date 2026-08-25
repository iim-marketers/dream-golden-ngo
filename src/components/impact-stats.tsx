"use client";

import {
  CountUp,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion-primitives";
import { grounded, stats } from "@/lib/site";

export function ImpactStats() {
  return (
    <section id="impact" className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-coral-700">{grounded.eyebrow}</p>
            <h2 className="mt-5 max-w-md font-heading text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] text-green-900 sm:text-4xl lg:text-[2.85rem]">
              {grounded.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-green-800/70">
              {grounded.body}
            </p>

            <blockquote className="mt-8 border-l-2 border-coral-500 pl-5">
              <p className="font-heading text-lg leading-snug font-semibold text-green-800 italic sm:text-xl">
                “{grounded.quote}”
              </p>
            </blockquote>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-3 lg:content-center">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group h-full rounded-2xl border border-green-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coral-500/45 hover:shadow-[0_18px_40px_-24px_rgba(14,42,27,0.45)] sm:p-7">
                  <div className="font-heading text-[2.1rem] leading-none font-extrabold tracking-[-0.03em] text-green-900 sm:text-[2.4rem]">
                    {stat.value !== null ? (
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span className="text-[1.7rem] sm:text-[1.9rem]">
                        {stat.display}
                      </span>
                    )}
                  </div>
                  <span className="mt-4 block h-px w-9 bg-coral-500 transition-all duration-300 group-hover:w-16" />
                  <p className="mt-4 text-[0.86rem] leading-relaxed text-green-800/65">
                    {stat.label}
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
