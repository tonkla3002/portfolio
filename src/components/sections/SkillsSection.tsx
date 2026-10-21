import { technicalSkills } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";
import RowTable, { Column } from "@/components/RowTable";

const GROUPS = [
  { key: "skills.programming", items: technicalSkills.programmingLanguages },
  { key: "skills.frameworks", items: technicalSkills.frameworksLibraries },
  { key: "skills.database", items: technicalSkills.databases },
  { key: "skills.tools", items: technicalSkills.tools },
  { key: "skills.other", items: technicalSkills.other },
];

export default function SkillsSection() {
  const { t } = useI18n();
  const columns: Column[] = [{ label: t("col.area") }, { label: t("col.stack"), desktopOnly: true }];
  return (
    <Section id="skills" title={t("sections.skills")}>
      <RowTable
        columns={columns}
        template="minmax(0,1fr) minmax(0,2.2fr)"
        mobileTemplate="minmax(0,1fr)"
        rows={GROUPS.map((g) => ({
          id: g.key,
          cells: [<span key="k" className="text-muted md:text-ink">{t(g.key)}</span>, g.items.join(", ")],
        }))}
      />
    </Section>
  );
}
