import type { MouseEvent } from "react";

export function scrollToSection(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  delayMs = 0,
) {
  if (!href.startsWith("#")) return;

  // Leave modified clicks alone — they open a new tab, where the hash is the point.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();

  const scroll = () => target.scrollIntoView({ block: "start" });
  if (delayMs > 0) window.setTimeout(scroll, delayMs);
  else scroll();
}
