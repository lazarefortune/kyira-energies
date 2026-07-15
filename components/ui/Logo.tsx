import Image from "next/image";

import { landingContent } from "@/content/landing";
import { cn } from "@/lib/utils";

type LogoVariant = "dark" | "light";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "dark", className, priority = false }: LogoProps) {
  const { siteName, logo } = landingContent;
  const src = variant === "dark" ? logo.dark : logo.light;

  return (
    <Image
      src={src}
      alt={siteName}
      width={467}
      height={197}
      priority={priority}
      className={cn("h-8 w-auto sm:h-9", className)}
    />
  );
}
