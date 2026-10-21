import { useReveal } from "@/hooks/useReveal";

type SectionProps = {
  id: string;
  title: string;
  count?: number;
  children: React.ReactNode;
};

// Section with a serif-caps title and an optional count, e.g. "SELECTED PROJECTS (04)".
// Its title and any .reveal-item descendants animate in when the section scrolls into view.
export default function Section({ id, title, count, children }: SectionProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 pt-24 md:pt-36">
      <h2 id={`${id}-title`} className="reveal-item mb-8 flex items-start gap-2 md:mb-10" style={{ ["--i" as string]: 0 }}>
        <span className="serif-caps text-[clamp(1.9rem,4vw,3.25rem)] leading-[0.95]">{title}</span>
        {count !== undefined && <span className="label mt-1 text-muted">({String(count).padStart(2, "0")})</span>}
      </h2>
      {children}
    </section>
  );
}
