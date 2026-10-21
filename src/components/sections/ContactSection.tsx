import { contact } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import { PixelSparkles } from "@/components/PixelIcons";

export default function ContactSection() {
  const { t } = useI18n();
  const email = contact.email.toLowerCase();
  const phone = contact.phone.replace(/^\+66(\d{2})(\d{3})(\d{4})$/, "+66 $1 $2 $3");

  return (
    <footer id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pt-28 md:pt-40">
      <div className="border-t border-ink pt-16 text-center md:pt-24">
        <div className="label text-muted">{t("sections.contact")}</div>
        <h2 id="contact-title" className="serif-caps mx-auto mt-4 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[0.95]">
          {t("contact.heading")}
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="mt-10 inline-block break-all text-[clamp(1.05rem,2.2vw,1.6rem)] underline decoration-1 underline-offset-[0.3em] transition-opacity hover:opacity-60"
        >
          {email}
        </a>
        <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
          <a href={`tel:${contact.phone}`} className="label hover:underline">
            {phone}
          </a>
          <a href="/Resume-Thanakorn-Wannatong.pdf" target="_blank" rel="noreferrer" className="label hover:underline">
            {t("nav.resume")} PDF ↗
          </a>
        </div>
      </div>

      <div lang="en" className="mt-28 grid grid-cols-[1fr_auto_1fr] items-end gap-4 pb-6 md:mt-36">
        <span className="label text-muted">Thanakorn W.</span>
        <span className="serif-caps text-[clamp(1.6rem,3.6vw,3rem)] leading-none">
          Folio©{new Date().getFullYear()} <PixelSparkles />
        </span>
        <span className="label text-right text-muted">Next.js · Tailwind</span>
      </div>
    </footer>
  );
}
