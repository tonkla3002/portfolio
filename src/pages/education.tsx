import { education } from "@/data/resume";

export default function Education() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Education</h1>
      <div className="rounded-xl border p-6 dark:border-white/10">
        <div className="text-xl font-medium">{education.university}</div>
        <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{education.period}</div>
        <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">{education.degree}</p>
      </div>
    </section>
  );
}