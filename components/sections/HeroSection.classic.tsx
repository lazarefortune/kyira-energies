import Image from "next/image";

import { landingContent } from "@/content/landing";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { ctaArrowIcon } from "@/lib/icons";

const TITLE_ACCENT = "récupération de chaleur";

function HeroTitle({ title }: { title: string }) {
  if (!title.includes(TITLE_ACCENT)) {
    return <>{title}</>;
  }

  const [before, after] = title.split(TITLE_ACCENT);

  return (
    <>
      {before}
      <span className="font-editorial-new text-primary-400 font-medium italic">
        {TITLE_ACCENT}
      </span>
      {after}
    </>
  );
}

export function HeroSectionClassic() {
  const { hero } = landingContent;

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border"
    >
      <Image
        src={hero.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/78 to-zinc-900/55"
        aria-hidden
      />

      <Container
        as="div"
        className="relative flex min-h-screen items-center justify-start pt-28 pb-16 sm:pt-32 sm:pb-24 md:items-end lg:pt-36 lg:pb-28"
      >
        <div className="max-w-3xl">
          <h1
            id="hero-title"
            className="text-3xl font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl lg:leading-tight"
          >
            <HeroTitle title={hero.title} />
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={hero.primaryCta.href}
              variant="light"
              size="lg"
              className="font-semibold"
            >
              {hero.primaryCta.label}
              <Icon icon={ctaArrowIcon} size={18} className="ml-2" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white/35 text-white hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
