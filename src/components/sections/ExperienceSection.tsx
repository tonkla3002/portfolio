import { experiences } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";
import RowTable, { Column } from "@/components/RowTable";

// "Full Stack Developer, J Ventures Co.,Ltd." -> role + company.
// "Senior Project: The system for ..." -> role "Senior Project" + the rest as a detail line.
function splitTitle(title: string) {
  const colon = title.indexOf(":");
  if (colon !== -1) return { role: title.slice(0, colon).trim(), company: "", detail: title.slice(colon + 1).trim() };
  const i = title.indexOf(",");
  if (i === -1) return { role: title, company: "", detail: "" };
  return { role: title.slice(0, i).trim(), company: title.slice(i + 1).trim(), detail: "" };
}

export default function ExperienceSection() {
  const { t } = useI18n();
  const columns: Column[] = [
    { label: t("col.role") },
    { label: t("col.company"), desktopOnly: true },
    { label: t("col.period"), align: "right" },
  ];

  return (
    <Section id="experience" title={t("sections.experience")} count={experiences.length}>
      <RowTable
        columns={columns}
        template="minmax(0,1.6fr) minmax(0,1.4fr) 13rem"
        mobileTemplate="minmax(0,1.1fr) minmax(0,1fr)"
        rows={experiences.map((exp, idx) => {
          const { role, company, detail } = splitTitle(t(`exp.${idx}.title`));
          return {
            id: exp.title,
            cells: [role, company || "Naresuan University", t(`exp.${idx}.period`)],
            body: (
              <ul className="max-w-3xl space-y-2 leading-relaxed text-muted">
                {company && <li className="label text-ink md:hidden">{company}</li>}
                {detail && <li className="font-medium text-ink">{detail}</li>}
                {exp.bullets.map((_, i) => (
                  <li key={i} className="relative pl-5">
                    <span className="absolute left-0" aria-hidden>
                      —
                    </span>
                    {t(`exp.${idx}.bullets.${i}`)}
                  </li>
                ))}
              </ul>
            ),
          };
        })}
      />
      <a
        href="/Resume-Thanakorn-Wannatong.pdf"
        target="_blank"
        rel="noreferrer"
        className="label mt-6 inline-block underline-offset-4 hover:underline"
      >
        {t("cta.resumeFull")} ↗
      </a>
    </Section>
  );
}
