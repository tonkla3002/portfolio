import { contact } from "@/data/resume";

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 space-y-6 section-reveal">
      <h2 className="text-3xl font-semibold">Contact</h2>
      <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <span className="font-medium">Phone:</span> <a className="underline tap-press" href={`tel:${contact.phone}`}>{contact.phone}</a>
          </li>
          <li>
            <span className="font-medium">Email:</span> <a className="underline tap-press" href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
      </div>
    </section>
  );
}