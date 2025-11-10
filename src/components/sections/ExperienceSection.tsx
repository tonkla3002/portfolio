import { experiences, resumeProjects, competition } from "@/data/resume";
import { useI18n } from "@/context/i18n";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">{children}</div>;
}

export default function ExperienceSection() {
  const { t } = useI18n();
  return (
    <section
      id="experience"
      className="scroll-mt-24 space-y-10 section-reveal fade-side"
      data-direction="left"
      data-fade-out="true"
      //@ts-ignore
      style={{ "--fx-duration": "700ms" }}
    >
      <h2 className="text-3xl font-semibold">{t("sections.experience")}</h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <Card key={exp.title}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-medium">{t(`exp.${idx}.title`)}</h3>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{t(`exp.${idx}.period`)}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {exp.bullets.map((_, i) => (
                <li key={i}>• {t(`exp.${idx}.bullets.${i}`)}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium">{t("sections.projects")}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeProjects.map((p, idx) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-4">
                <div className="font-medium">{t(`proj.${idx}.title`)}</div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{t(`proj.${idx}.period`)}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{t(`proj.${idx}.description`)}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-medium">{t("sections.competition")}</h3>
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{t("competition.title")}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{t("competition.note")}</div>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{t("competition.period")}</span>
          </div>
        </Card>
      </div>
    </section>
  );
}