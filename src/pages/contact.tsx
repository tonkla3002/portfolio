import { contact } from "@/data/resume";
import { useI18n } from "@/context/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">{t("sections.contact")}</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">{t("contact.subtitle")}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-6 dark:border-white/10">
          <h2 className="mb-3 text-xl font-medium">{t("contact.channels")}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              {t("label.email")}: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              {t("label.phone")}: <span className="text-zinc-700 dark:text-zinc-300">{contact.phone}</span>
            </li>
            <li>
              {t("label.linkedin")}: <a className="underline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">linkedin.com</a>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border p-6 dark:border-white/10">
          <h2 className="mb-3 text-xl font-medium">{t("contact.openToWork")}</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{t("contact.openToWork.text")}</p>
        </div>
      </div>
    </section>
  );
}