import { education } from "@/data/resume";

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24 space-y-6 section-reveal">
      <h2 className="text-3xl font-semibold">Education</h2>
      <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-medium">{education.university}</div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300">{education.degree}</div>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{education.period}</span>
        </div>
      </div>
    </section>
  );
}