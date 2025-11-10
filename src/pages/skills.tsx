import { technicalSkills, softSkills } from "@/data/resume";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
      {children}
    </span>
  );
}

export default function Skills() {
  return (
    <section className="space-y-10">
      <h1 className="text-3xl font-semibold">Skills</h1>
      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-xl font-medium">Programming Languages</h2>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.programmingLanguages.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-medium">Frameworks & Libraries</h2>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.frameworksLibraries.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-medium">Database</h2>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.databases.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-medium">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.tools.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-medium">Other Skills</h2>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.other.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-medium">Soft Skills</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {softSkills.map((s) => (
            <li key={s} className="text-sm text-zinc-700 dark:text-zinc-300">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}