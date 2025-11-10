import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  const [firstScrolled, setFirstScrolled] = useState(false);
  const parallaxRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section className={`${geistSans.className} ${geistMono.className} space-y-16`}>
      {/* Hero */}
      <div className="mx-auto w-full max-w-5xl grid items-center gap-10 sm:grid-cols-2 hero-shell p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="hero-title title-balance text-[clamp(1.5rem,4.3vw,2.75rem)] sm:text-[clamp(1.7rem,4.3vw,3.2rem)] md:text-[clamp(1.9rem,3.4vw,3.4rem)] font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:whitespace-nowrap">
              Hey There, I’m Tonkla Fullstack Developer
            </h1>
          </div>
          <div className="flex items-center gap-8">
            {/* <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">10</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">YEARS
              <br />
              EXPERIENCE
            </div> */}
          </div>

          {/* Avatar + brush background with parallax */}
          <div className="relative mt-4" ref={parallaxRef}>
            <div className="absolute -inset-6 -z-10 bg-[url('/file.svg')] bg-center bg-no-repeat opacity-25 dark:opacity-20 parallax-layer" />
            <div className="relative h-[17.6rem] w-[13.2rem] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/profile.jpg"
                alt="Tonkla"
                fill
                sizes="212px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <p className="max-w-md text-zinc-700 dark:text-zinc-300">
          I build beautifully simple fullstack applications, and I love what I do.
          </p>
          <div>
            <a
              href="/Resume-Thanakorn-Wannatong.pdf"
              className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 border-zinc-200 dark:border-white/10 backdrop-blur transition-colors tap-press"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume (PDF)
            </a>
          </div>
          <div className={`reveal reveal-stagger flex flex-wrap gap-2`}>
            {["TypeScript", "React", "Next.js", "Node.js", "Tailwind"].map((label, idx) => (
              <span
                key={label}
                style={{ //@ts-ignore
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
