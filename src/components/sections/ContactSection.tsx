import { contact } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import { useReveal } from "@/hooks/useReveal";

export default function ContactSection() {
  const { t } = useI18n();
  const ref = useReveal<HTMLElement>();
  const email = contact.email.toLowerCase();
  const phone = contact.phone.replace(/^\+66(\d{2})(\d{3})(\d{4})$/, "+66 $1 $2 $3");

  return (
    <footer ref={ref} id="contact" aria-labelledby="contact-title" className="scroll-mt-16 pt-28 pb-24 md:pt-40 md:pb-32">
      <div className="border-t border-ink pt-16 text-center md:pt-24">
        <div className="reveal-item label text-muted" style={{ ["--i" as string]: 0 }}>{t("sections.contact")}</div>
        <h2 id="contact-title" style={{ ["--i" as string]: 1 }} className="reveal-item serif-caps mx-auto mt-4 max-w-[16ch] text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[0.95]">
          {t("contact.heading")}
        </h2>
        <a
          href={`mailto:${contact.email}`}
          style={{ ["--i" as string]: 2 }}
          className="reveal-item sweep mt-10 inline-block break-all text-[clamp(1.05rem,2.2vw,1.6rem)]"
        >
          {email}
        </a>
        <div className="reveal-item mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2" style={{ ["--i" as string]: 3 }}>
          <a href={`tel:${contact.phone}`} className="label sweep">
            {phone}
          </a>
          <a href="/Resume-Thanakorn-Wannatong.pdf" target="_blank" rel="noreferrer" className="label sweep">
            {t("nav.resume")} PDF ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
