import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";
import RowTable, { Column } from "@/components/RowTable";

export default function EducationSection() {
  const { t } = useI18n();
  const columns: Column[] = [
    { label: t("col.school") },
    { label: t("col.detail"), desktopOnly: true },
    { label: t("col.period"), align: "right" },
  ];
  // On mobile the degree sits under the university name instead of in its own column.
  const school = (
    <span key="s">
      {t("education.university")}
      <span className="block text-muted md:hidden">{t("education.degree")}</span>
    </span>
  );
  return (
    <Section id="education" title={t("sections.education")}>
      <RowTable
        columns={columns}
        template="minmax(0,1.6fr) minmax(0,1.4fr) 13rem"
        rows={[
          {
            id: "nu",
            cells: [school, t("education.degree"), t("education.period")],
          },
        ]}
      />
    </Section>
  );
}
