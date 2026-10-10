import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/context/i18n";
import { LangSwitch, ThemeToggle } from "@/components/Controls";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

const NAV = ["about", "experience", "projects", "skills", "contact"] as const;

function TopBar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "sticky top-0 z-40 transition-colors duration-300 " +
        (scrolled ? "border-b border-line bg-paper/85 backdrop-blur-md" : "border-b border-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-10">
        <a href="#top" className="display text-2xl leading-none">
          <span className="latin">Thanakorn W.</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} className="link-underline text-[0.95rem] text-muted hover:text-ink">
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="flex flex-col justify-between pt-10 pb-16 sm:pt-14 lg:min-h-[calc(100svh-4rem)] lg:pb-10">
      <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-16">
        <div className="order-2 md:order-1">
          <div className="fade-in label text-accent" style={{ ["--d" as string]: "60ms" }}>
            Thanakorn Wannatong — &ldquo;Tonkla&rdquo;
          </div>
          <h1 className="hero-title display mt-5 text-[clamp(2.6rem,6.4vw,6.5rem)] leading-[0.98]">
            <span className="rise"><span style={{ ["--d" as string]: "120ms" }}>{t("hero.l1")}</span></span>
          </h1>
          <p
            className="fade-in mt-6 max-w-[34ch] text-[1.2rem] leading-relaxed text-muted sm:text-[1.35rem]"
            style={{ ["--d" as string]: "400ms" }}
          >
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="fade-in order-1 md:order-2 md:justify-self-end" style={{ ["--d" as string]: "200ms" }}>
          <div className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] bg-line sm:max-w-[26rem] md:w-[min(30vw,28rem)] md:max-w-none">
            <Image
              src="/profile-web.jpg"
              alt="Thanakorn Wannatong"
              fill
              sizes="(min-width: 768px) 28rem, 90vw"
              className="object-cover object-[50%_20%]"
              priority
            />
          </div>
        </div>
      </div>

      <div
        className="fade-in mt-14 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4"
        style={{ ["--d" as string]: "700ms" }}
      >
        <div>
          <div className="label text-muted">{t("hero.now")}</div>
          <p className="mt-1.5 leading-snug">{t("hero.position")}</p>
        </div>
        <div>
          <div className="label text-muted">{t("hero.stack")}</div>
          <p className="mt-1.5 leading-snug">NestJS · Go Fiber · Next.js · PostgreSQL</p>
        </div>
        <div>
          <div className="label text-muted">{t("hero.edu")}</div>
          <p className="mt-1.5 leading-snug">{t("hero.eduValue")}</p>
        </div>
        <a href="#about" className="group hidden items-end justify-end gap-3 lg:flex">
          <span className="label text-muted transition-colors group-hover:text-ink">{t("hero.scroll")}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="content" className="mx-auto max-w-[90rem] overflow-x-clip px-5 sm:px-10">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
