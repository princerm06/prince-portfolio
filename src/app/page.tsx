import { HeroIdentity } from "@/components/HeroIdentity";
import { ExperiencePreview } from "@/components/ExperiencePreview";
import { ProjectEcosystem } from "@/components/ecosystem/ProjectEcosystem";
import { ResearchPreview } from "@/components/ResearchPreview";
import { SelectedWork } from "@/components/SelectedWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-12 lg:pb-28"
      >
        <section
          aria-label="Introduction"
          className="grid gap-12 pt-6 lg:grid-cols-[44fr_56fr] lg:items-center lg:gap-10 xl:gap-14"
        >
          <HeroIdentity />
          <ProjectEcosystem />
        </section>
        <SelectedWork />
        <ExperiencePreview />
        <ResearchPreview />
      </main>
      <SiteFooter />
    </>
  );
}