import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import TypingText, { TypingTextHandle } from "@/components/TypingText";
import { useI18n } from "@/context/i18n";
import { useEffect, useRef, useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { lang, t } = useI18n();
  const [firstScrolled, setFirstScrolled] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const heroTypingRef = useRef<TypingTextHandle | null>(null);
  const heroTexts = [t("hero.title")];
  const heroSpeedMs = 100;
  const heroDelayMs = 800;

  useEffect(() => {
    let triggered = false;
    const onScroll = () => {
      if (!triggered && window.scrollY > 10) {
        triggered = true;
        setFirstScrolled(true);
        document.body.classList.add("first-scroll");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId = 0;
    const loop = () => {
      const y = Math.min(30, window.scrollY * 0.06);
      if (parallaxRef.current) {
        parallaxRef.current.style.setProperty("--parallax-y", `${y}px`);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Start typing effect on page load and when language changes
  useEffect(() => {
    let mounted = true;
    let timeoutId: number | null = null;

    const startAt = (index: number) => {
      if (!mounted) return;
      heroTypingRef.current?.start(heroTexts[index]);
      // If multiple texts, schedule next after typing completes + delay
      if (heroTexts.length > 1) {
        const current = heroTexts[index];
        const totalMs = current.length * heroSpeedMs + heroDelayMs;
        timeoutId = window.setTimeout(
          () => startAt((index + 1) % heroTexts.length),
          totalMs
        );
      }
    };

    startAt(0);

    return () => {
      mounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [lang]);

  return (
    <section
      className={`${geistSans.className} ${geistMono.className} space-y-16`}
    >
      {/* Hero */}
      {/* Hero Section */}
      <div className="mx-auto w-full max-w-5xl grid grid-cols-1 place-items-center gap-10 md:gap-12 hero-shell p-6 sm:p-8 min-h-[70vh]">
        {/* Left column: Title */}
        <div className="w-full space-y-3 text-center">
          <h1 className="hero-title title-balance text-[clamp(1.5rem,4.3vw,2.75rem)] sm:text-[clamp(1.7rem,4.3vw,3.2rem)] md:text-[clamp(1.9rem,3.4vw,3.4rem)] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:whitespace-nowrap">
            <TypingText
              ref={heroTypingRef}
              text={heroTexts[0]}
              speedMs={heroSpeedMs}
              blink
              startOnMount={false}
            />
          </h1>
        </div>

        {/* Right column: Avatar & Content */}
        <div className="w-full grid gap-8 sm:gap-10 sm:grid-cols-2 items-center justify-items-center sm:justify-items-center">
          {/* Avatar with parallax background */}
          <div className="relative place-self-center" ref={parallaxRef}>
            <div className="absolute -inset-6 -z-10 bg-[url('/file.svg')] bg-center bg-no-repeat opacity-25 dark:opacity-20 parallax-layer" />
            <div className="relative h-[17.6rem] w-[13.2rem] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/profile.jpg"
                alt="Tonkla"
                fill
                sizes="212px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Text & Tags */}
          <div className="space-y-6 text-center">
            <p className="max-w-md mx-auto text-zinc-700 dark:text-zinc-300">
              {t("hero.subtitle")}
            </p>

            {/* Resume Button */}
            <div className="flex justify-center">
              <a
                href="/Resume-Thanakorn-Wannatong.pdf"
                className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 border-zinc-200 dark:border-white/10 backdrop-blur transition-colors tap-press"
                target="_blank"
                rel="noreferrer"
              >
                {t("cta.resume")}
              </a>
            </div>

            {/* Tech Tags */}
            <div className="reveal reveal-stagger flex flex-wrap gap-2 justify-center">
              {["Nest.js", "Next.js", "Express.js", "Tailwind"].map((label, idx) => (
                <span
                  key={label}
                  style={{
                    //@ts-ignore
                    "--reveal-delay": `${idx * 60}ms`,
                  }}
                  className="rounded-full border border-transparent bg-black/5 dark:bg-white/5 px-3 py-1 text-xs text-zinc-700 dark:text-zinc-300"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Services + What do I help removed per request */}

      {/* Single-page sections below */}
      <div className="mx-auto w-full max-w-5xl space-y-16">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </section>
  );
}
