import { experiences, resumeProjects } from "@/data/resume";
import { useI18n } from "@/context/i18n";

type Project = { title: string; description: string; period?: string; link?: string };

const projects: Project[] = [
  {
    title: "Senior Project",
    description:
      "Temperature & current standards testing system: Electron.js gateway, PostgreSQL storage, Next.js dashboard.",
    period: experiences[0].period,
  },
  ...resumeProjects.map((p) => ({ title: p.title, description: p.description, period: p.period })),
];

export default function Projects() {
  const { t } = useI18n();
  return (
    <section className="space-y-6 section-reveal">
      <h1 className="text-3xl font-semibold">{t("sections.projects")}</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">
        {/* Static helper text already Thai; keep as-is or translate if needed */}
        ตัวอย่างผลงานที่เคยทำและทดลอง
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.title} className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-medium">
                {(() => {
                  if (p.title === "Senior Project") return t("exp.0.title");
                  const rpIdx = resumeProjects.findIndex((rp) => rp.title === p.title);
                  if (rpIdx >= 0) return t(`proj.${rpIdx}.title`);
                  return p.title;
                })()}
              </h2>
              {p.period && (
                <span className="text-xs text-zinc-600 dark:text-zinc-400">
                  {(() => {
                    if (p.title === "Senior Project") return t("exp.0.period");
                    const rpIdx = resumeProjects.findIndex((rp) => rp.period === p.period && rp.title === p.title);
                    if (rpIdx >= 0) return t(`proj.${rpIdx}.period`);
                    return p.period;
                  })()}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {(() => {
                if (p.title === "Senior Project") return t("exp.0.bullets.0");
                const rpIdx = resumeProjects.findIndex((rp) => rp.description === p.description && rp.title === p.title);
                if (rpIdx >= 0) return t(`proj.${rpIdx}.description`);
                return p.description;
              })()}
            </p>
            {p.link && (
              <a
                href={p.link}
                className="mt-4 inline-block text-sm text-zinc-900 underline dark:text-zinc-100 tap-press"
              >
                ดูรายละเอียด
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}