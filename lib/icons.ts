import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  Mouse01Icon,
  Audit02Icon,
  Award01Icon,
  Cancel01Icon,
  CallIcon,
  Certificate01Icon,
  ChartEvaluationIcon,
  ChartLineIcon,
  Check,
  CustomerSupportIcon,
  EnergyIcon,
  Flowchart01Icon,
  FlowchartIcon,
  Hotel01Icon,
  Idea01Icon,
  Location01Icon,
  Loading03Icon,
  Mail01Icon,
  MailSend01Icon,
  OfficeIcon,
  QuoteUpIcon,
  SaveEnergy01Icon,
  Search01Icon,
  Settings02Icon,
  SmileIcon,
  Store01Icon,
  SystemUpdate01Icon,
  Tick02Icon,
  UniversityIcon,
} from "@hugeicons/core-free-icons";

export const problemIcons: IconSvgElement[] = [
  SaveEnergy01Icon,
  ChartEvaluationIcon,
  FlowchartIcon,
];

export const serviceIcons: IconSvgElement[] = [
  Audit02Icon,
  SystemUpdate01Icon,
  ChartLineIcon,
  Flowchart01Icon,
];

export const sectorIcons: IconSvgElement[] = [
  Store01Icon,
  Hotel01Icon,
  OfficeIcon,
  UniversityIcon,
];

export const trustIcons: IconSvgElement[] = [
  Certificate01Icon,
  Award01Icon,
  Location01Icon,
];

export const methodIcons: IconSvgElement[] = [
  Audit02Icon,
  Search01Icon,
  Idea01Icon,
  CustomerSupportIcon,
];

export const contactIcons = {
  phone: CallIcon,
  email: Mail01Icon,
  address: Location01Icon,
} as const;

export const aboutHighlightIcon = Check;
export const heroEyebrowIcon = EnergyIcon;
export const ctaArrowIcon = ArrowRight01Icon;
export const backArrowIcon = ArrowLeft01Icon;
export const scrollDownIcon = Mouse01Icon;
export const testimonialSmileIcon = SmileIcon;
export const testimonialQuoteIcon = QuoteUpIcon;

export const contactFormLoadingIcon = Loading03Icon;
export const contactFormSendingIcon = MailSend01Icon;
export const contactFormSuccessIcon = Tick02Icon;
export const toastCloseIcon = Cancel01Icon;
