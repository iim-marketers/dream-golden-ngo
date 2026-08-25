"use client";

import Image from "next/image";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import { gallery } from "@/lib/site";

export function Gallery() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-coral-700">From the Field</p>
          <h2 className="mt-5 font-heading text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] text-green-900 sm:text-4xl">
            Belya Maharajpur, in Frames
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((item, i) => (
            <StaggerItem key={item.src}>
              <figure
                className="group relative aspect-4/5 overflow-hidden rounded-2xl ring-1 ring-green-900/10"
                style={{ marginTop: i % 2 === 1 ? "1.75rem" : undefined }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 23vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-green-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-[0.78rem] font-medium text-cream-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.alt}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
