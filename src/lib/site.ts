export const site = {
  name: "Dream Golden NGO",
  legalName: "Belyamaharajpur Dream Golden Memories Club",
  shortName: "DGMC",
  tagline: "Turning small acts of kindness into lifelong transformation.",
  registration: "WB/2022/0333385",
  /* Overridable via env so a provider switch needs no code change. Inlined
     at build time, so a change requires a redeploy. */
  donateUrl:
    process.env.NEXT_PUBLIC_DONATE_URL ??
    "https://payments.cashfree.com/forms?code=dgmc",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1473690964816595",
} as const;

export const contact = {
  address: "Belya Maharajpur, District – West Medinipur, West Bengal – 721260",
  phone: "+91-90022-22268",
  phoneHref: "tel:+919002222268",
  whatsappHref: "https://wa.me/919002222268",
  email: "dreamgoldenmemories@gmail.com",
  portal: "dgmcngo.org",
  portalHref: "https://dgmcngo.org",
} as const;

export const nav = [
  { label: "Our Work", href: "#pillars" },
  { label: "Transparency", href: "#transparency" },
  { label: "Ways to Give", href: "#give" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Belyamaharajpur Dream Golden Memories Club",
  titleLines: ["Every Life Has a Story.", "You Can Write the"],
  titleAccent: "Happy Ending.",
  body: "From classrooms in rural West Medinipur to street shelters for abandoned animals — DGMC turns small acts of kindness into lifelong transformation.",
  primaryCta: "Sponsor a Cause Today",
  secondaryCta: "See How Your Donation Works",
} as const;

export const stats = [
  {
    value: 15000,
    suffix: "+",
    label: "Lives Directly Impacted",
  },
  {
    value: 7000,
    suffix: "+",
    label: "Empowered Donors & Changemakers",
  },
  {
    value: null,
    display: "NITI Aayog",
    suffix: "",
    label: `Verified (${site.registration})`,
  },
] as const;

export const grounded = {
  eyebrow: "Who We Are",
  title: "Grounded in Medinipur, Trusted Nationwide",
  body: "We aren't a distant corporate foundation — we are community organizers, teachers, and volunteers working directly on the ground in Belya Maharajpur.",
  quote:
    "True service starts at the grassroots. When you empower a single child or save an animal in a rural village, you uplift an entire ecosystem.",
} as const;

export type Pillar = {
  id: string;
  index: string;
  name: string;
  english: string;
  blurb: string;
  points: string[];
  image: string;
  icon: "book" | "health" | "bowl" | "paw";
};

export const pillars: Pillar[] = [
  {
    id: "education",
    index: "01",
    name: "Swapna Shiksha",
    english: "Education Beyond Textbooks",
    blurb: "We don't just hand out bags; we reform classroom experiences.",
    points: [
      "Teacher Support: Training and resources for rural government school teachers.",
      "Student Survival Kits: Books, tuition aid, and digital learning tools for kids at risk of dropping out.",
    ],
    image: "/new-images/swapna-shiksha.jpeg",
    icon: "book",
  },
  {
    id: "health",
    index: "02",
    name: "Gramin Swasthya",
    english: "Doorstep Healthcare",
    blurb:
      "For thousands in rural Bengal, medical care is hours away. We bring it to their doorstep.",
    points: [
      "Preventive health awareness and free diagnostic camps.",
      "Distribution of critical medicines and emergency medical relief.",
    ],
    image: "/new-images/gramin-swastha.jpeg",
    icon: "health",
  },
  {
    id: "food",
    index: "03",
    name: "Anna Seva",
    english: "Dignity Through Food",
    blurb: "Hunger isn't just a physical need — it's a loss of dignity.",
    points: [
      "Nutrient-dense meal distributions for daily wage earners, elderly individuals, and struggling families.",
    ],
    image: "/new-images/anna-seva.jpeg",
    icon: "bowl",
  },
  {
    id: "animals",
    index: "04",
    name: "Karuna",
    english: "Animal Shelter & Rescue",
    blurb: "A compassionate community cares for all living beings.",
    points: [
      "Safe shelter, winter warmth, and veterinary care for 200+ rescued stray animals in West Medinipur.",
    ],
    image: "/new-images/karuna.jpeg",
    icon: "paw",
  },
];

export const allocation = [
  {
    percent: 85,
    label: "Direct Field Execution",
    detail: "Food, Books, Medicine, Animal Feed",
  },
  {
    percent: 10,
    label: "Logistics, Shelter Upkeep & Transportation",
    detail: "Vehicles, storage, and daily shelter running costs",
  },
  {
    percent: 5,
    label: "Outreach & Community Awareness",
    detail: "Camps, awareness drives, and volunteer mobilisation",
  },
] as const;

export const bank = {
  accountName: "Belyamaharajpur Dream Golden Memories Club",
  bankName: "State Bank of India (SBI)",
  accountNumber: "43690550344",
  ifsc: "SBIN0008862",
} as const;

export const waysToGive = [
  {
    id: "micro",
    index: "01",
    title: "Micro-Donations & One-Time Giving",
    body: "No amount is too small. A single contribution of ₹500 provides a child's learning material for a month or feeds a rescued animal for two weeks.",
    cta: "Donate now",
    href: site.donateUrl,
    featured: true,
  },
  {
    id: "csr",
    index: "02",
    title: "Corporate & Brand Partnerships (CSR)",
    body: "Align your enterprise values with grassroots execution. Partner with us for measurable, field-tested CSR campaigns across West Bengal.",
    cta: "Talk to our CSR desk",
    href: `mailto:${contact.email}?subject=CSR%20Partnership%20Enquiry`,
    featured: false,
  },
  {
    id: "evangelist",
    index: "03",
    title: "Become a Digital Evangelist",
    body: "Share our cause, volunteer remotely, or lead a fundraiser within your school, company, or community group.",
    cta: "Start a fundraiser",
    href: contact.whatsappHref,
    featured: false,
  },
] as const;

export const gallery = [
  { src: "/images/gallery-1.svg", alt: "Volunteers at a DGMC field drive" },
  { src: "/images/gallery-2.svg", alt: "Community care in Belya Maharajpur" },
  { src: "/images/gallery-3.svg", alt: "Children supported by Swapna Shiksha" },
  {
    src: "/images/gallery-4.svg",
    alt: "Student survival kits being distributed",
  },
] as const;
