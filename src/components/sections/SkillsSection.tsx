import { technicalSkills } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";

const GROUPS = [
  { key: "skills.programming", items: technicalSkills.programmingLanguages },
  { key: "skills.frameworks", items: technicalSkills.frameworksLibraries },
  { key: "skills.database", items: technicalSkills.databases },
  { key: "skills.tools", items: technicalSkills.tools },
  { key: "skills.other", items: technicalSkills.other },
];

const BAND = ["NestJS", "Go Fiber", "Next.js", "PostgreSQL", "TypeScript", "GORM", "Docker", "MongoDB"];

function StackBand() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {BAND.map((s) => (
        <li key={s} className="flex items-center">
          <span className="display px-8 text-4xl leading-none sm:text-5xl">
            <span className="latin">{s}</span>
          </span>
          <span className="text-2xl text-accent" aria-hidden>✳</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-ink py-7 text-paper">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { t } = useI18n();
  return (
    <>
      <StackBand />
      <Section id="skills" index="04" title={t("sections.skills")}>
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <div key={g.key}>
              <dt className="label text-muted">{t(g.key)}</dt>
              <dd className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[1.125rem] leading-relaxed">
                {g.items.map((s, i) => (
                  <span key={s}>
                    {s}
                    {i < g.items.length - 1 && <span className="text-line">,</span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
