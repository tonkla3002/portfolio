import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";
import RowTable, { Column } from "@/components/RowTable";

type Project = {
  titleKey: string;
  descKey: string;
  category: string;
  client: string;
  year: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    titleKey: "proj.0.title",
    descKey: "proj.0.description",
    category: "Mobile app, Back-office",
    client: "J Ventures",
    year: "2026",
    tags: ["EWA", "Mobile App", "Back-office Portal"],
  },
  {
    titleKey: "proj.1.title",
    descKey: "proj.1.description",
    category: "CRM, LINE OA",
    client: "J Ventures",
    year: "2026",
    tags: ["CRM", "LINE OA", "Back-office"],
  },
  {
    titleKey: "exp.2.title",
    descKey: "exp.2.bullets.0",
    category: "IoT, Dashboard",
    client: "Senior Project, NU",
    year: "2025",
    tags: ["Microcontroller", "Electron.js", "PostgreSQL", "Next.js"],
  },
  {
    titleKey: "competition.title",
    descKey: "competition.note",
    category: "Competition, Web",
    client: "University team",
    year: "2024",
    tags: ["Silver Medal"],
  },
];

// "Senior Project: The system for ..." reads better in the table without its prefix.
const dropPrefix = (s: string) => (s.includes(":") ? s.slice(s.indexOf(":") + 1).trim() : s);

export default function ProjectsSection() {
  const { t } = useI18n();
  const columns: Column[] = [
    { label: t("col.project") },
    { label: t("col.category"), desktopOnly: true },
    { label: t("col.client"), desktopOnly: true },
    { label: t("col.year"), align: "right" },
  ];

  return (
    <Section id="projects" title={t("sections.selected")} count={PROJECTS.length}>
      <RowTable
        columns={columns}
        hint={t("table.hint")}
        template="minmax(0,1.6fr) minmax(0,1fr) minmax(0,1fr) 5rem"
        rows={PROJECTS.map((p) => ({
          id: p.titleKey,
          cells: [dropPrefix(t(p.titleKey)), p.category, p.client, p.year],
          body: (
            <div className="grid gap-4 md:gap-x-6 md:[grid-template-columns:var(--cols)]">
              <p className="max-w-[60ch] leading-relaxed text-muted">{t(p.descKey)}</p>
              <div className="md:col-span-3">
                <p className="label text-muted md:hidden">
                  {p.category} — {p.client}
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 md:mt-0">
                  {p.tags.map((tag) => (
                    <li key={tag} className="label">
                      ✳ {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ),
        }))}
      />
    </Section>
  );
}
