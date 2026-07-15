export const easeOut = [0.22, 1, 0.36, 1] as const;

export const motionViewport = { once: false, amount: 0.2 } as const;

/** Durée d'animation : 0 si l'utilisateur préfère reduced motion. */
export function motionDuration(
  prefersReducedMotion: boolean | null,
  seconds: number,
) {
  return prefersReducedMotion ? 0 : seconds;
}

/** Stagger / delay : 0 si reduced motion. */
export function motionDelay(
  prefersReducedMotion: boolean | null,
  seconds: number,
) {
  return prefersReducedMotion ? 0 : seconds;
}
