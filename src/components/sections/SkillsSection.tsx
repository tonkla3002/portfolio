import { technicalSkills } from "@/data/resume";
import TypingText, { TypingTextHandle } from "@/components/TypingText";
import { useRef } from "react";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border px-3 py-1 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300 ui-chip tap-press">
      {children}
    </span>
  );
}

export default function SkillsSection() {
  const typingRef = useRef<TypingTextHandle | null>(null);
  return (
    <section
      id="skills"
      className="scroll-mt-24 space-y-8 section-reveal fade-side"
      data-direction="left"
      data-fade-out="true"
      //@ts-ignore
      style={{ "--fx-duration": "700ms" }}
    >
      <h2 className="text-3xl font-semibold">Skills</h2>
      <div className="flex items-center gap-3">
        <TypingText
          ref={typingRef}
          text="Technical Skills: TypeScript · React · Next.js · Node.js"
          speedMs={300}
          className="text-sm text-zinc-600 dark:text-zinc-400"
        />
        <button
          type="button"
          onClick={() => typingRef.current?.start()}
          className="text-xs underline text-zinc-600 dark:text-zinc-400 tap-press"
          aria-label="Restart typing"
        >
          Restart
        </button>
        <button
          type="button"
          onClick={() => typingRef.current?.reset()}
          className="text-xs underline text-zinc-600 dark:text-zinc-400 tap-press"
          aria-label="Reset typing"
        >
          Reset
        </button>
      </div>
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