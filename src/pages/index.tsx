import Image from "next/image";
import { useRef, useState } from "react";
import { useI18n } from "@/context/i18n";
import { LangSwitch, ThemeToggle } from "@/components/Controls";
import { PixelLaptop, PixelSparkles, PixelSun, PixelSunOutline } from "@/components/PixelIcons";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

function TopBar() {
  const { t } = useI18n();
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <a href="#top" className="label">T.W.</a>
        <nav aria-label="Main" className="flex items-center gap-5">
          <a href="#projects" className="label hidden hover:underline sm:inline">{t("nav.projects")}</a>
          <a href="#about" className="label hidden hover:underline sm:inline">{t("nav.about")}</a>
          <a href="#contact" className="label hover:underline">{t("nav.contact")}</a>
          <LangSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

// Centered masthead in mixed type. Hovering it (mouse only) shows the portrait following the cursor.
function Masthead() {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const line = (delay: number, content: React.ReactNode) => (
    <span className="rise">
      <span style={{ ["--d" as string]: `${delay}ms` }}>{content}</span>
    </span>
  );

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setPos(null)}
      className="relative flex min-h-[100svh] cursor-crosshair items-center justify-center overflow-hidden px-5"
    >
      <div className="fade-in label absolute left-[11%] top-1/2 hidden -translate-y-1/2 text-muted lg:block" style={{ ["--d" as string]: "900ms" }}>
        Edition
        <br />
        0{String(new Date().getFullYear()).slice(2)}
      </div>
      <div className="fade-in label absolute right-[11%] top-1/2 hidden -translate-y-1/2 text-muted lg:block" style={{ ["--d" as string]: "900ms" }}>
        NestJS
        <br />
        Go Fiber
      </div>

      <h1 lang="en" className="serif-caps relative z-10 text-center text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[0.98]">
        {line(80, <><span className="script-initial">T</span>hanakorn <span className="script-initial">W</span>annatong</>)}
        {line(180, "Full Stack")}
        {line(280, (
          <span className="pixel inline-flex items-center gap-[0.18em] text-[0.88em]">
            <PixelSun className="spin-slow" />
            Developer
            <PixelSunOutline className="spin-slow" />
          </span>
        ))}
        {line(380, "At J Ventures")}
        {line(480, (
          <>
            Folio©{new Date().getFullYear()} <PixelLaptop /> <PixelSparkles />
          </>
        ))}
      </h1>

      {/* Cursor-following portrait (desktop mouse only). */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 h-[17rem] w-[13.5rem] overflow-hidden transition-[opacity,transform] duration-300 ease-out"
        style={{
          left: pos?.x ?? 0,
          top: pos?.y ?? 0,
          opacity: pos ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${pos ? 1 : 0.9})`,
        }}
      >
        <Image src="/profile-web.jpg" alt="" fill sizes="216px" className="object-cover object-[50%_20%] grayscale" priority />
      </div>

      <a href="#projects" className="fade-in label absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-ink" style={{ ["--d" as string]: "1100ms" }}>
        ( Scroll )
      </a>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TopBar />
      <Masthead />
      <main id="content" className="mx-auto max-w-[72rem] px-6 sm:px-10 lg:px-16">
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
