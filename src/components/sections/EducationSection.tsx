import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";

export default function EducationSection() {
  const { t } = useI18n();
  const rows = [
    { period: t("education.period"), title: t("education.university"), note: t("education.degree") },
    { period: `${t("competition.period")} · ${t("label.award")}`, title: t("competition.title"), note: t("competition.note") },
  ];
  return (
    <Section id="education" index="05" title={t("sections.education")}>
      <ul className="grid gap-12 sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.title}>
            <div className="label text-accent">{r.period}</div>
            <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug">{r.title}</h3>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">{r.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
