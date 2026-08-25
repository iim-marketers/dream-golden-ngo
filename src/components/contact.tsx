"use client";

import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion-primitives";
import {
  ArrowRightIcon,
  GlobeIcon,
  HeartIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { contact, site } from "@/lib/site";

const channels = [
  {
    icon: MapPinIcon,
    label: "Location",
    value: contact.address,
    href: `https://www.google.com/maps/search/${encodeURIComponent(contact.address)}`,
  },
  {
    icon: PhoneIcon,
    label: "Direct Contact / WhatsApp",
    value: contact.phone,
    href: contact.whatsappHref,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: GlobeIcon,
    label: "Official Portal",
    value: contact.portal,
    href: contact.portalHref,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative overflow-hidden bg-forest-900 py-12 text-cream-100 lg:py-16"
    >
      <Image
        src="/images/cta-band.svg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-forest-950 via-forest-900/92 to-forest-900/70"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <p className="eyebrow text-gold-300">Visit Us</p>
          <h2 className="mt-5 max-w-md font-heading text-3xl leading-[1.06] font-extrabold tracking-[-0.02em] uppercase sm:text-4xl lg:text-[2.85rem]">
            Connect With Our{" "}
            <span className="bg-linear-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Field Office
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream-100/70">
            We welcome donors, partners, and visitors to see our work firsthand.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              external
              href={site.donateUrl}
              size="lg"
              className="group h-13 rounded-full bg-gold-500 px-7 font-semibold text-forest-950 hover:bg-gold-400"
            >
              <HeartIcon className="size-4" />
              Sponsor a Cause Today
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </LinkButton>
            <LinkButton
              external
              href={contact.whatsappHref}
              size="lg"
              variant="outline"
              className="h-13 rounded-full border-cream-100/25 bg-transparent px-7 font-semibold text-cream-100 hover:bg-cream-100/10 hover:text-cream-50"
            >
              Message on WhatsApp
            </LinkButton>
          </div>
        </Reveal>

        <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:content-center">
          {channels.map((channel) => (
            <StaggerItem key={channel.label} className="h-full">
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-3 rounded-2xl border border-cream-100/12 bg-forest-800/45 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:bg-forest-800/70"
              >
                <span className="grid size-10 place-items-center rounded-full border border-gold-500/35 text-gold-300">
                  <channel.icon className="size-[1.05rem]" />
                </span>
                <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold-400 uppercase">
                  {channel.label}
                </span>
                <span className="text-[0.9rem] leading-relaxed text-cream-100/80">
                  {channel.value}
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
