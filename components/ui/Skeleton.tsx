import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block rounded-md bg-border motion-safe:animate-pulse",
        className,
      )}
    />
  );
}

type PendingValueProps = {
  className?: string;
  label?: string;
};

export function PendingValue({
  className,
  label = "Information à compléter",
}: PendingValueProps) {
  return (
    <>
      <Skeleton className={cn("h-4 align-middle", className)} />
      <span className="sr-only">{label}</span>
    </>
  );
}
