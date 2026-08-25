import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { contact, nav, pillars, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-cream-100/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.88rem] leading-relaxed">
              {site.legalName} — {site.tagline}
            </p>
            <p className="mt-5 inline-flex rounded-full border border-gold-500/30 px-3.5 py-1.5 text-[0.7rem] tracking-wider text-gold-300">
              NITI Aayog Verified · {site.registration}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-heading text-[0.7rem] font-bold tracking-[0.2em] text-cream-50 uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-[0.88rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-[0.7rem] font-bold tracking-[0.2em] text-cream-50 uppercase">
              Our Programmes
            </h3>
            <ul className="mt-5 space-y-3 text-[0.88rem]">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <a
                    href="#pillars"
                    className="transition-colors hover:text-gold-300"
                  >
                    {pillar.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-cream-100/10" />

        <div className="flex flex-col gap-4 text-[0.78rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${contact.email}`}
              className="transition-colors hover:text-gold-300"
            >
              {contact.email}
            </a>
            <a
              href={contact.phoneHref}
              className="transition-colors hover:text-gold-300"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
