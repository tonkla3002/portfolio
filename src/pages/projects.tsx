import { experiences, resumeProjects } from "@/data/resume";

type Project = { title: string; description: string; period?: string; link?: string };

const projects: Project[] = [
  {
    title: "Senior Project",
    description:
      "Temperature & current standards testing system: Electron.js gateway, PostgreSQL storage, Next.js dashboard.",
    period: experiences[0].period,
  },
  ...resumeProjects.map((p) => ({ title: p.title, description: p.description, period: p.period })),
];

export default function Projects() {
  return (
    <section className="space-y-6 section-reveal">
      <h1 className="text-3xl font-semibold">โปรเจค</h1>
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">
        ตัวอย่างผลงานที่เคยทำและทดลอง
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.title} className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-medium">{p.title}</h2>
              {p.period && (
                <span className="text-xs text-zinc-600 dark:text-zinc-400">{p.period}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
            {p.link && (
              <a
                href={p.link}
                className="mt-4 inline-block text-sm text-zinc-900 underline dark:text-zinc-100 tap-press"
              >
                ดูรายละเอียด
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}