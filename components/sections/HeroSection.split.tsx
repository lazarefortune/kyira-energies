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
      <span className="font-editorial-new text-primary-500 font-medium italic">
        {TITLE_ACCENT}
      </span>
      {after}
    </>
  );
}

export function HeroSectionSplit() {
  const { hero } = landingContent;

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden bg-white"
    >
      <Image
        src={hero.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] lg:object-[center_center]"
        aria-hidden
      />
      <div
        className="hero-diagonal-fade pointer-events-none absolute inset-0"
        aria-hidden
      />

      <Container
        as="div"
        className="relative z-10 flex min-h-screen items-center pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
      >
        <div className="w-full max-w-xl lg:max-w-2xl">
          <h1
            id="hero-title"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-tight"
          >
            <HeroTitle title={hero.title} />
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
              <Icon icon={ctaArrowIcon} size={18} className="ml-2" />
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
