import { experiences } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";

export default function ExperienceSection() {
  const { t } = useI18n();
  return (
    <Section id="experience" index="02" title={t("sections.experience")}>
      <ol className="space-y-16">
        {experiences.map((exp, idx) => (
          <li key={exp.title} className="max-w-3xl">
            <div className="label text-accent">{t(`exp.${idx}.period`)}</div>
            <h3 className="mt-2 text-[1.2rem] font-semibold leading-snug sm:text-[1.3rem]">{t(`exp.${idx}.title`)}</h3>
            <ul className="mt-5 space-y-3 text-[1.0625rem] leading-[1.75] text-muted">
              {exp.bullets.map((_, i) => (
                <li key={i} className="relative pl-6">
                  <span className="absolute left-0 top-[0.85em] h-px w-3 bg-accent" aria-hidden />
                  {t(`exp.${idx}.bullets.${i}`)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <a
        href="/Resume-Thanakorn-Wannatong.pdf"
        target="_blank"
        rel="noreferrer"
        className="mt-14 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 font-medium transition-colors hover:bg-ink hover:text-paper"
      >
        {t("cta.resumeFull")} <span aria-hidden>↗</span>
      </a>
    </Section>
  );
}
