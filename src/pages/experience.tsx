import { experiences, resumeProjects, competition } from "@/data/resume";
import { useI18n } from "@/context/i18n";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">{children}</div>
  );
}

export default function Experience() {
  const { t } = useI18n();
  return (
    <section className="space-y-10 section-reveal">
      <h1 className="text-3xl font-semibold">{t("sections.experience")}</h1>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <Card key={exp.title}>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-medium">{t(`exp.${idx}.title`)}</h2>
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
        <h2 className="text-xl font-medium">{t("sections.projects")}</h2>
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
        <h2 className="text-xl font-medium">{t("sections.competition")}</h2>
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