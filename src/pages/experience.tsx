import { experiences, resumeProjects, competition } from "@/data/resume";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">{children}</div>
  );
}

export default function Experience() {
  return (
    <section className="space-y-10 section-reveal">
      <h1 className="text-3xl font-semibold">Experience</h1>

      <div className="space-y-6">
        {experiences.map((exp) => (
          <Card key={exp.title}>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-medium">{exp.title}</h2>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{exp.period}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {exp.bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {resumeProjects.map((p) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-4">
                <div className="font-medium">{p.title}</div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-medium">Competition</h2>
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{competition.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{competition.note}</div>
            </div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{competition.period}</span>
          </div>
        </Card>
      </div>
    </section>
  );
}