export type NavLink = {
  label: string;
  href: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  reassurancePoints: string[];
  backgroundImage: string;
};

export type ProblemItem = {
  title: string;
  description: string;
};

export type ProblemContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ProblemItem[];
};

export type AboutContent = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  paragraphs: string[];
  highlights: string[];
  image: string;
  imageAlt: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type ServicesContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
  cta: CtaLink;
};

export type MethodStep = {
  step: string;
  title: string;
  description: string;
};

export type MethodContent = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  steps: MethodStep[];
};

export type SectorItem = {
  title: string;
  description: string;
};

export type SectorsContent = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  items: SectorItem[];
};

export type TrustItem = {
  label: string;
  value: string;
};

export type TrustContent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: TrustItem[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQContent = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  cta: CtaLink;
  items: FAQItem[];
};

export type ContactField = {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel";
  autoComplete?: string;
  required: boolean;
};

export type ContactContent = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessages: {
    validation: string;
    turnstile: string;
    config: string;
    send: string;
  };
  fieldErrors: {
    required: string;
    email: string;
    turnstile: string;
  };
  fields: ContactField[];
  reassurancePoints: string[];
  directContact: {
    name: string;
    role: string;
    photo: string;
  };
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  tagline: string;
  usefulLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyright: string;
};

export type SiteLogo = {
  dark: string;
  light: string;
};

export type SiteContent = {
  siteName: string;
  logo: SiteLogo;
  navigation: NavLink[];
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  method: MethodContent;
  sectors: SectorsContent;
  faq: FAQContent;
  contact: ContactContent;
  footer: FooterContent;
};
