import Image from "next/image";

import { site } from "@/lib/site";

export function SiteOnHold() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-green-950 px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,rgba(214,95,66,0.22),transparent_70%)]"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center">
        <Image
          src="/logo-192.png"
          alt={`${site.legalName} emblem`}
          width={192}
          height={192}
          priority
          className="size-20 rounded-full ring-1 ring-coral-500/40"
        />

        <p className="mt-8 text-[0.65rem] font-semibold tracking-[0.3em] text-coral-300 uppercase">
          {site.legalName}
        </p>

        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-balance text-cream-50 sm:text-4xl">
          We&rsquo;ll be back shortly.
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-cream-100/75">
          Our website is temporarily unavailable while it is being updated.
          Thank you for your patience — our work on the ground in West Medinipur
          continues as always.
        </p>
      </div>
    </main>
  );
}
