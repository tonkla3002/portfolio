import { useI18n } from "@/context/i18n";
import { LangSwitch, ThemeToggle } from "@/components/Controls";
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
        <a href="#top" className="nav-text">T.W.</a>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-7">
          <a href="#projects" className="nav-text hidden sweep sm:inline">{t("nav.projects")}</a>
          <a href="#about" className="nav-text hidden sweep sm:inline">{t("nav.about")}</a>
          <a href="#contact" className="nav-text sweep">{t("nav.contact")}</a>
          <LangSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

// One span per letter so each can react to the pointer (see .glyph in globals.css).
// Letters are grouped into nowrap words so lines still only break between words.
function Word({ text, initial }: { text: string; initial?: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {initial && (
        <span className="script-initial glyph" aria-hidden>
          {initial}
        </span>
      )}
      {[...text].map((c, i) => (
        <span key={i} className="glyph" aria-hidden>
          {c}
        </span>
      ))}
    </span>
  );
}

// Centered masthead in mixed type.
function Masthead() {
  const line = (delay: number, content: React.ReactNode) => (
    <span className="rise">
      <span style={{ ["--d" as string]: `${delay}ms` }}>{content}</span>
    </span>
  );

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5"
    >
      <div className="masthead-fade relative z-10">
        <h1
          lang="en"
          aria-label="Thanakorn Wannatong, Full Stack Developer"
          className="serif-caps text-center text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[0.98]"
        >
          {line(80, (
            <>
              <Word initial="T" text="hanakorn" /> <Word initial="W" text="annatong" />
            </>
          ))}
          {line(180, (
            <>
              <Word text="Full" /> <Word text="Stack" /> <Word text="Developer" />
            </>
          ))}
        </h1>
      </div>

      <a href="#projects" className="fade-in label absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-ink" style={{ ["--d" as string]: "1100ms" }}>
        ( Scroll <span className="bob" aria-hidden>↓</span> )
      </a>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="progress" aria-hidden />
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
