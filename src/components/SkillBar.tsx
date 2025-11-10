type SkillBarProps = {
  label: string;
  level: number; // 0-100
};

export default function SkillBar({ label, level }: SkillBarProps) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-zinc-500 dark:text-zinc-400">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded-full bg-zinc-900 transition-[width] duration-500 dark:bg-zinc-100"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}