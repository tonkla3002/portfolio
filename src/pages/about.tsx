import { summary, softSkills } from "@/data/resume";
import { useI18n } from "@/context/i18n";

export default function About() {
  const { t } = useI18n();
  const softSkillKeyMap: Record<string, string> = {
    "Honest and Responsible": "soft.honesty",
    Communication: "soft.communication",
    Teamwork: "soft.teamwork",
    "Problem Solving": "soft.problemSolving",
    Adaptability: "soft.adaptability",
    "Fast Learner": "soft.fastLearner",
  };
  return (
    <section className="space-y-6 section-reveal">
      <h1 className="text-3xl font-semibold">{t("sections.about")}</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">{t("about.summary")}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
          <h2 className="mb-3 text-xl font-medium">{t("skills.soft")}</h2>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {softSkills.map((s) => (
              <li key={s}>{t(softSkillKeyMap[s] ?? s)}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
          <h2 className="mb-3 text-xl font-medium">{t("about.relatedLinks")}</h2>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <a className="underline tap-press" href="/Resume-Thanakorn-Wannatong.pdf" target="_blank" rel="noreferrer">
                {t("cta.resume")}
              </a>
            </li>
            <li>
              <a className="underline tap-press" href="/contact">{t("nav.contact")}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}