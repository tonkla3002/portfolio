import { summary, softSkills } from "@/data/resume";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 space-y-6 section-reveal fade-side"
      data-direction="left"
      data-fade-out="true"
      //@ts-ignore
      style={{ "--fx-duration": "700ms" }}
    >
      <h2 className="text-3xl font-semibold">About</h2>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">{summary}</p>
      <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate">
        <h3 className="mb-3 text-xl font-medium">Soft Skills</h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {softSkills.map((s) => (
            <li key={s} className="text-sm text-zinc-700 dark:text-zinc-300">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}