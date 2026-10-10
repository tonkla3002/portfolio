import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";

type Project = {
  titleKey: string;
  periodKey: string;
  descKey: string;
  context: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    titleKey: "proj.0.title",
    periodKey: "proj.0.period",
    descKey: "proj.0.description",
    context: "J Ventures",
    tags: ["Mobile App", "Back-office Portal", "EWA"],
  },
  {
    titleKey: "proj.1.title",
    periodKey: "proj.1.period",
    descKey: "proj.1.description",
    context: "J Ventures",
    tags: ["CRM", "LINE OA", "Back-office"],
  },
  {
    titleKey: "exp.2.title",
    periodKey: "exp.2.period",
    descKey: "exp.2.bullets.0",
    context: "Senior Project",
    tags: ["Microcontroller", "Electron.js", "PostgreSQL", "Next.js"],
  },
];

export default function ProjectsSection() {
  const { t } = useI18n();
  return (
    <Section id="projects" index="03" title={t("sections.projects")}>
      <ol className="border-t border-line">
        {PROJECTS.map((p, i) => (
          // Hover inverts the row to paper-on-ink.
          <li
            key={p.titleKey}
            className="group -mx-5 border-b border-line px-5 py-10 transition-colors duration-300 hover:bg-ink hover:text-paper sm:mx-0 sm:px-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label text-accent">
                {String(i + 1).padStart(2, "0")} — {p.context}
              </span>
              <span className="label text-muted transition-colors group-hover:text-paper/70">{t(p.periodKey)}</span>
            </div>
            <h3 className="display mt-4 max-w-[28ch] text-[1.6rem] leading-[1.15] sm:text-[2rem]">{t(p.titleKey)}</h3>
            <p className="mt-4 max-w-[60ch] text-[1.0625rem] leading-[1.75] text-muted transition-colors group-hover:text-paper/80">
              {t(p.descKey)}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-sm transition-colors group-hover:border-paper/30"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
