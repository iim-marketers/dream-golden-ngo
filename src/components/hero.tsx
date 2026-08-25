import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { Reveal } from "@/components/motion-primitives";
import {
  ArrowRightIcon,
  BookIcon,
  HandsIcon,
  HeartIcon,
  PawIcon,
  ShieldCheckIcon,
  SparkIcon,
} from "@/components/icons";
import { hero, site } from "@/lib/site";

const promises = [
  { icon: BookIcon, title: "Education", sub: "That Empowers" },
  { icon: HeartIcon, title: "Care", sub: "That Heals" },
  { icon: HandsIcon, title: "Dignity", sub: "That Restores" },
  { icon: PawIcon, title: "Compassion", sub: "That Shelters" },
];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden bg-green-900 text-cream-100">
      {/* warm glow behind the collage */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-168 rounded-full bg-coral-500/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-15%] size-136 rounded-full bg-green-600/25 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-16">
        {/* ---------- copy ---------- */}
        <div>
          <p className="eyebrow rise-in text-coral-300">{hero.eyebrow}</p>

          <h1 className="mt-6 font-heading text-[2.5rem] leading-none font-extrabold tracking-[-0.03em] uppercase sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem]">
            <span className="rise-in block" style={{ animationDelay: "0.08s" }}>
              {hero.titleLines[0]}
            </span>
            <span className="rise-in block" style={{ animationDelay: "0.16s" }}>
              {hero.titleLines[1]}{" "}
              <span className="bg-linear-to-r from-coral-200 to-coral-400 bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </span>
          </h1>

          <div
            className="fade-in mt-7 flex items-start gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            {/* <span className="mt-2.5 h-px w-10 shrink-0 bg-coral-500/70 sm:w-14" /> */}
            <p className="max-w-xl text-base leading-relaxed text-cream-100/75 sm:text-lg">
              {hero.body}
            </p>
          </div>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.42s" }}
          >
            <LinkButton
              external
              href={site.donateUrl}
              size="lg"
              className="group h-13 rounded-full bg-coral-600 px-7 text-[0.95rem] font-semibold text-cream-50 hover:bg-coral-500"
            >
              {hero.primaryCta}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton
              href="#transparency"
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-cream-100/25 bg-transparent px-7 text-[0.95rem] font-semibold text-cream-100 hover:bg-cream-100/10 hover:text-cream-50"
            >
              {hero.secondaryCta}
            </LinkButton>
          </div>

          {/* trust chips */}
          <ul
            className="fade-in mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.78rem] text-cream-100/60"
            style={{ animationDelay: "0.55s" }}
          >
            <li className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4 text-coral-400" />
              NITI Aayog Verified
            </li>
            <li className="flex items-center gap-2">
              <SparkIcon className="size-4 text-coral-400" />
              85% straight to the field
            </li>
            <li className="flex items-center gap-2">
              <HandsIcon className="size-4 text-coral-400" />
              Run by local volunteers
            </li>
          </ul>
        </div>

        {/* ---------- collage ---------- */}
        <div
          className="zoom-in relative mx-auto w-full max-w-lg lg:max-w-none"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] ring-1 ring-coral-500/25 sm:aspect-square lg:aspect-4/5">
            <Image
              src="/images/hero-main.svg"
              alt="A child from Belya Maharajpur supported by Swapna Shiksha"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-green-950/70 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>

      {/* ---------- promise strip ---------- */}
      <div className="relative border-t border-cream-100/10 bg-green-950/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-9 sm:px-6 lg:grid-cols-4 lg:px-8">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} y={16}>
              <div className="flex flex-col items-center gap-2.5 text-center">
                <span className="grid size-12 place-items-center rounded-full border border-coral-500/40 text-coral-400">
                  <p.icon className="size-5" />
                </span>
                <span className="font-heading text-[0.8rem] font-bold tracking-[0.16em] text-cream-50 uppercase">
                  {p.title}
                </span>
                <span className="-mt-1.5 text-[0.75rem] text-cream-100/55">
                  {p.sub}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
