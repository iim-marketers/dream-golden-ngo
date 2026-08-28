"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/link-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { HeartIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { contact, nav, site } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";

/* Matches the sheet's close transition (see SheetContent) so the scroll
   starts only once Base UI has released its body scroll lock. */
const SHEET_CLOSE_MS = 200;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip. Also carries #top so the logo link returns to the
          very top of the document rather than to the hero's top edge. */}
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

      <header
        className={cn(
          "fade-in sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-green-900/10 bg-cream-50/85 backdrop-blur-md"
            : "border-b border-transparent bg-cream-50",
        )}
      >
        <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open menu"
                    className="size-10 rounded-full border-green-900/15 lg:hidden"
                  >
                    <MenuIcon className="size-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="bg-cream-50 sm:max-w-sm">
                <SheetHeader className="border-b border-green-900/10">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 py-2">
                  {nav.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <a
                          href={item.href}
                          onClick={(event) =>
                            scrollToSection(event, item.href, SHEET_CLOSE_MS)
                          }
                        />
                      }
                      className="rounded-lg px-3 py-3 text-left font-heading text-lg font-semibold text-green-900 transition-colors hover:bg-cream-200/60"
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-3 border-t border-green-900/10 p-4">
                  <LinkButton
                    external
                    href={site.donateUrl}
                    className="h-11 w-full rounded-full bg-coral-600 text-cream-50 hover:bg-coral-500"
                  >
                    <HeartIcon className="size-4" />
                    Donate Now
                  </LinkButton>
                  <a
                    href={contact.phoneHref}
                    className="flex items-center justify-center gap-2 text-sm text-green-800/70"
                  >
                    <PhoneIcon className="size-4" />
                    {contact.phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
