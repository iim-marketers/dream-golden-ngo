"use client";

import { useEffect, useRef, useState } from "react";

import { LinkButton } from "@/components/link-button";
import { Logo } from "@/components/logo";
import {
  ArrowRightIcon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { contact, nav, site } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

/* Matches the panel's close transition below, so the scroll starts only once
   the body scroll lock has been released. */
const MENU_CLOSE_MS = 220;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(headerRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the panel is open the page behind it must not scroll. The padding
     compensates for a scrollbar that disappears with the overflow, which would
     otherwise shift the header sideways. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const previous = {
      overflow: body.style.overflow,
      pad: body.style.paddingRight,
    };
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.pad;
    };
  }, [open]);

  /* Escape closes and hands focus back to the trigger; growing past the `lg`
     breakpoint closes too, since the desktop nav takes over there. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <div id="top" className="bg-green-900 text-cream-100">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center text-[0.72rem] tracking-wide sm:justify-between sm:text-left">
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-coral-400" />
            NITI Aayog Verified · {site.registration}
          </p>
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 text-coral-300 transition-colors hover:text-coral-200 sm:flex"
          >
            <PhoneIcon className="size-3.5" />
            {contact.phone}
          </a>
        </div>
      </div>

      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-green-950/35 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header
        ref={headerRef}
        className={cn(
          "fade-in sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled && !open
            ? "border-b border-green-900/10 bg-cream-50/85 backdrop-blur-md"
            : "border-b border-transparent bg-cream-50",
        )}
      >
        <div className="mx-auto flex h-(--header-height) max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            onClick={(event) => scrollToSection(event, "#top")}
            aria-label={`${site.name} home`}
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
                className="relative text-sm font-medium text-green-800/80 transition-colors hover:text-green-900 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-coral-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LinkButton
              external
              href={site.donateUrl}
              className="hidden h-10 rounded-full bg-coral-600 px-5 text-cream-50 shadow-none hover:bg-coral-500 sm:inline-flex"
            >
              <HeartIcon className="size-4" />
              Donate Now
            </LinkButton>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-green-900/15 text-green-900 transition-colors hover:bg-cream-100 focus-visible:ring-2 focus-visible:ring-coral-500/50 focus-visible:outline-none lg:hidden"
            >
              <MenuToggleIcon open={open} />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          inert={!open}
          className={cn(
            "absolute inset-x-0 top-full origin-top overflow-hidden transition-[opacity,transform] duration-200 ease-out lg:hidden",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0",
          )}
        >
          <div className="mx-auto max-h-[calc(100dvh-var(--header-height)-1.5rem)] max-w-7xl overflow-y-auto rounded-b-3xl border-x border-b border-green-900/10 bg-cream-50 px-4 pb-5 shadow-[0_24px_48px_-24px_rgba(18,38,29,0.45)] sm:px-6">
            <nav className="divide-y divide-green-900/8">
              {nav.map((item, index) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      setOpen(false);
                      scrollToSection(event, item.href, MENU_CLOSE_MS);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    style={{
                      transitionDelay: open ? `${80 + index * 45}ms` : "0ms",
                    }}
                    className={cn(
                      "group flex items-center gap-4 py-4 transition-[opacity,transform] duration-300 ease-out",
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0",
                    )}
                  >
                    <span
                      className={cn(
                        "font-heading text-xl font-semibold transition-colors",
                        isActive
                          ? "text-coral-700"
                          : "text-green-900 group-hover:text-coral-700",
                      )}
                    >
                      {item.label}
                    </span>
                    <ArrowRightIcon
                      className={cn(
                        "ml-auto size-4 transition-all duration-300",
                        isActive
                          ? "translate-x-0 text-coral-600 opacity-100"
                          : "-translate-x-1 text-green-900/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            <div
              style={{
                transitionDelay: open ? `${80 + nav.length * 45}ms` : "0ms",
              }}
              className={cn(
                "mt-5 space-y-3 transition-[opacity,transform] duration-300 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              <LinkButton
                external
                href={site.donateUrl}
                onClick={() => setOpen(false)}
                className="h-12 w-full rounded-full bg-coral-600 text-base text-cream-50 hover:bg-coral-500"
              >
                <HeartIcon className="size-4" />
                Donate Now
              </LinkButton>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contact.phoneHref}
                  className="flex h-11 items-center justify-center gap-2 rounded-full border border-green-900/12 bg-cream-100/60 text-sm font-medium text-green-800 transition-colors hover:bg-cream-200/60"
                >
                  <PhoneIcon className="size-4" />
                  Call us
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex h-11 items-center justify-center gap-2 rounded-full border border-green-900/12 bg-cream-100/60 text-sm font-medium text-green-800 transition-colors hover:bg-cream-200/60"
                >
                  <MailIcon className="size-4" />
                  Email
                </a>
              </div>

              <p className="pt-1 text-center text-[0.7rem] tracking-wide text-green-900/45">
                NITI Aayog Verified · {site.registration}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

/** Three bars that fold into a cross while the menu is open. */
function MenuToggleIcon({ open }: { open: boolean }) {
  const bar =
    "absolute h-0.5 w-4.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <span aria-hidden className="relative grid size-5 place-items-center">
      <span className={cn(bar, open ? "rotate-45" : "-translate-y-1.5")} />
      <span
        className={cn(
          "absolute h-0.5 w-4.5 rounded-full bg-current transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span className={cn(bar, open ? "-rotate-45" : "translate-y-1.5")} />
    </span>
  );
}

/**
 * The nav href whose section currently sits just under the header, so the menu
 * can show where the reader already is. Measures the header instead of assuming
 * `--header-height`, so the two can never drift apart.
 */
function useActiveSection(headerRef: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Document order wins, so overlapping sections resolve to the topmost.
        const current = sections.find((section) => visible.has(section.id));
        setActive(current ? `#${current.id}` : null);
      },
      { rootMargin: `-${headerHeight + 1}px 0px -55% 0px` },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [headerRef]);

  return active;
}
