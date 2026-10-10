type SectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

// Two-column section: the heading sits on the left (sticky on desktop), content on the right.
export default function Section({ id, index, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-20 gap-8 border-t border-line py-20 md:grid-cols-[minmax(11rem,17rem)_1fr] md:gap-12 md:py-28"
    >
      <div className="md:sticky md:top-28 md:self-start">
        <div className="label text-accent">{index}</div>
        <h2 id={`${id}-title`} className="display mt-2 text-4xl leading-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
