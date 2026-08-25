"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion-primitives";
import { pillarIcons } from "@/components/icons";
import { pillars } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Pillars() {
  return (
    <section
      id="pillars"
      className="grain relative overflow-hidden bg-green-900 py-12 text-cream-100 lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 size-144 rounded-full bg-coral-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-coral-300">What We Do</p>
          <h2 className="mt-5 font-heading text-3xl leading-[1.06] font-extrabold tracking-[-0.02em] uppercase sm:text-4xl lg:text-[3rem]">
            The 4 Pillars of{" "}
            <span className="bg-linear-to-r from-coral-200 to-coral-400 bg-clip-text text-transparent">
              Our Movement
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillarIcons[pillar.icon];
            const flip = i % 2 === 1;

            return (
              <Reveal key={pillar.id} delay={0.05}>
                <article
                  className={cn(
                    "group grid overflow-hidden rounded-3xl border border-cream-100/12 bg-green-800/50 transition-colors duration-300 hover:border-coral-500/35 lg:grid-cols-2",
                  )}
                >
                  {/* image */}
                  <div
                    className={cn(
                      "relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-84",
                      flip && "lg:order-2",
                    )}
                  >
                    <Image
                      src={pillar.image}
                      alt={`${pillar.name} — ${pillar.english}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-green-950/55 to-transparent lg:bg-linear-to-r"
                    />
                    <span className="absolute top-5 left-5 font-heading text-5xl font-extrabold text-cream-50/25 tabular-nums">
                      {pillar.index}
                    </span>
                  </div>

                  {/* copy */}
                  <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:p-12">
                    <span className="grid size-12 place-items-center rounded-full border border-coral-500/40 bg-coral-500/10 text-coral-300">
                      <Icon className="size-6" />
                    </span>

                    <div>
                      <h3 className="font-heading text-2xl font-extrabold tracking-tight text-cream-50 sm:text-[1.75rem]">
                        {pillar.name}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] font-semibold tracking-[0.16em] text-coral-300 uppercase">
                        {pillar.english}
                      </p>
                    </div>

                    <p className="text-[0.95rem] leading-relaxed text-cream-100/70">
                      {pillar.blurb}
                    </p>

                    <ul className="space-y-3 border-t border-cream-100/10 pt-5">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-[0.9rem] leading-relaxed text-cream-100/75"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
