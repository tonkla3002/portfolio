import { resumeProjects, experiences } from "@/data/resume";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">{children}</div>;
}

export default function ProjectsSection() {
  const senior = experiences.find((e) => e.title.toLowerCase().startsWith("senior project"));
  const all = [
    senior ? { title: senior.title, period: senior.period, description: senior.bullets?.[0] } : undefined,
    ...resumeProjects,
  ].filter(Boolean) as { title: string; period?: string; description?: string }[];

  return (
    <section
      id="projects"
      className="scroll-mt-24 space-y-6 section-reveal fade-side"
      data-direction="left"
      data-fade-out="true"
      //@ts-ignore
      style={{ "--fx-duration": "700ms" }}
    >
      <h2 className="text-3xl font-semibold">Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {all.map((p) => (
          <Card key={p.title}>
            <div className="flex items-start justify-between gap-4">
              <div className="font-medium">{p.title}</div>
              {p.period && (
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{p.period}</span>
              )}
            </div>
            {p.description && (
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.description}</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}