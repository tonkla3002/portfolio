import { contact } from "@/data/resume";
import { useI18n } from "@/context/i18n";

export default function ContactSection() {
  const { t } = useI18n();
  const email = contact.email.toLowerCase();
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line pt-20 pb-12 md:pt-28">
      <div className="label text-accent">06 — {t("sections.contact")}</div>
      <h2 id="contact-title" className="display mt-4 text-[clamp(3rem,9vw,9rem)] leading-[0.95]">
        {t("contact.heading")}
      </h2>
      <p className="mt-6 max-w-xl text-[1.2rem] leading-relaxed text-muted">{t("contact.lead")}</p>

      <a
        href={`mailto:${contact.email}`}
        className="group mt-12 flex items-center justify-between gap-6 border-y border-line py-8 transition-colors hover:text-accent"
      >
        <span className="display min-w-0 break-words text-[clamp(1.6rem,4.4vw,4.25rem)] leading-tight">
          <span className="latin">{email}</span>
        </span>
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-current text-2xl transition-transform duration-300 group-hover:-rotate-45 sm:h-20 sm:w-20"
          aria-hidden
        >
          →
        </span>
      </a>

      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-[1.0625rem]">
        <a href={`tel:${contact.phone}`} className="link-underline">
          {contact.phone.replace(/^\+66(\d{2})(\d{3})(\d{4})$/, "+66 $1 $2 $3")}
        </a>
        <a href="/Resume-Thanakorn-Wannatong.pdf" target="_blank" rel="noreferrer" className="link-underline">
          {t("nav.resume")} (PDF) ↗
        </a>
      </div>

      <footer className="mt-24 flex flex-col justify-between gap-3 text-sm text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Thanakorn Wannatong</span>
        <span className="max-w-md sm:text-right">{t("footer.credit")}</span>
      </footer>
    </section>
  );
}
