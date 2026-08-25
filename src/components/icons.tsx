import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function BookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5.5c3.2-1.6 6-1.6 9 .5v13c-3-2.1-5.8-2.1-9-.5z" />
      <path d="M21 5.5c-3.2-1.6-6-1.6-9 .5v13c3-2.1 5.8-2.1 9-.5z" />
    </svg>
  );
}

export function HealthIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.5S3.5 15 3.5 9.7A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 8.5 1.7C20.5 15 12 20.5 12 20.5z" />
      <path d="M6.5 11.5H9l1.2-2.4 2 4.6 1.2-2.2h2.6" />
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11.5h17c0 4.6-3.8 7.5-8.5 7.5s-8.5-2.9-8.5-7.5z" />
      <path d="M8 8.5c0-1.5 1.5-2 1.5-3.5" />
      <path d="M12 8c0-1.7 1.7-2.2 1.7-4" />
      <path d="M16 8.5c0-1.5 1.5-2 1.5-3.5" />
    </svg>
  );
}

export function PawIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="7.2" cy="9" rx="1.9" ry="2.5" />
      <ellipse cx="12" cy="7.4" rx="1.9" ry="2.5" />
      <ellipse cx="16.8" cy="9" rx="1.9" ry="2.5" />
      <path d="M12 12.2c3.3 0 5.3 2.4 5.3 4.5S15 19 12 19s-5.3-.2-5.3-2.3 2-4.5 5.3-4.5z" />
    </svg>
  );
}

export function HandsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 13.5 7.6 9.9a1.6 1.6 0 0 1 2.3 2.1l-1.8 1.8" />
      <path d="M20 13.5 16.4 9.9a1.6 1.6 0 0 0-2.3 2.1l1.8 1.8" />
      <path d="M12 6.5v7" />
      <path d="M5 14.5c2.6 3.2 11.4 3.2 14 0" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 5.8v5.4c0 4.2 2.9 7.6 7 9.3 4.1-1.7 7-5.1 7-9.3V5.8z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 2 5.6L19.5 11 14 13.4 12 19l-2-5.6L4.5 11 10 8.6z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-5.7 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.3 12 21 12 21z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 6.8 7.1 5.2a2 2 0 0 0 2.2 0l7.1-5.2" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.5S3.5 15 3.5 9.7A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 8.5 1.7C20.5 15 12 20.5 12 20.5z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export const pillarIcons = {
  book: BookIcon,
  health: HealthIcon,
  bowl: BowlIcon,
  paw: PawIcon,
} as const;
