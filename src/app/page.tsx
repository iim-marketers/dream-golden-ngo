import { SiteOnHold } from "@/components/site-on-hold";

/**
 * To take the site off hold: render `<HomePage />` from src/components/home-page.tsx, and
 * flip `siteOnHold` to `false` in `src/lib/site.ts`.
 */
export default function Home() {
  return <SiteOnHold />;
}
