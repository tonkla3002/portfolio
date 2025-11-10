import { contact } from "@/data/resume";

export default function Contact() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">
        Feel free to reach me via email, phone, or social links below.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-6 dark:border-white/10">
          <h2 className="mb-3 text-xl font-medium">Channels</h2>
          <ul className="space-y-2 text-sm">
            <li>
              Email: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              Phone: <span className="text-zinc-700 dark:text-zinc-300">{contact.phone}</span>
            </li>
            <li>
              LinkedIn: <a className="underline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">linkedin.com</a>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border p-6 dark:border-white/10">
          <h2 className="mb-3 text-xl font-medium">Open to Work</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Interested in Fullstack roles and eager to learn new technologies.
          </p>
        </div>
      </div>
    </section>
  );
}