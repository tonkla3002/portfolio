import { summary, softSkills } from "@/data/resume";

export default function About() {
  return (
    <section className="space-y-6 section-reveal">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">{summary}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
          <h2 className="mb-3 text-xl font-medium">Soft Skills</h2>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {softSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
          <h2 className="mb-3 text-xl font-medium">Related Links</h2>
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              <a className="underline tap-press" href="/Resume-Thanakorn-Wannatong.pdf" target="_blank" rel="noreferrer">
                Download Resume (PDF)
              </a>
            </li>
            <li>
              <a className="underline tap-press" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}