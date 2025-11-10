import { education } from "@/data/resume";
import { useI18n } from "@/context/i18n";

export default function Education() {
  const { t } = useI18n();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">{t("sections.education")}</h1>
      <div className="rounded-xl border p-6 dark:border-white/10">
        <div className="text-xl font-medium">{t("education.university")}</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{t("education.period")}</div>
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">{t("education.degree")}</p>
      </div>
    </section>
  );
}