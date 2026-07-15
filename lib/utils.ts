export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** In-page anchors work from any route when prefixed with `/`. */
export function resolveSectionHref(href: string): string {
  if (href.startsWith("#") && href.length > 1) {
    return `/${href}`;
  }

  return href;
}
