import { technicalSkills } from "@/data/resume";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300 ui-chip tap-press">
      {children}
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 space-y-8 section-reveal">
      <h2 className="text-3xl font-semibold">Skills</h2>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-xl font-medium">Programming Languages</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.programmingLanguages.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-medium">Frameworks & Libraries</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.frameworksLibraries.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-medium">Database</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.databases.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-medium">Tools</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.tools.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-medium">Other Skills</h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.other.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}