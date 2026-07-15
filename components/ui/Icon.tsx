import {
  HugeiconsIcon,
  type IconSvgElement,
  type HugeiconsIconProps,
} from "@hugeicons/react";

import { cn } from "@/lib/utils";

type IconProps = {
  icon: IconSvgElement;
  size?: number;
  className?: string;
  strokeWidth?: number;
  label?: string;
} & Pick<HugeiconsIconProps, "altIcon" | "showAlt">;

export function Icon({
  icon,
  size = 24,
  className,
  strokeWidth = 1.5,
  label,
  altIcon,
  showAlt,
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      altIcon={altIcon}
      showAlt={showAlt}
      size={size}
      color="currentColor"
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
