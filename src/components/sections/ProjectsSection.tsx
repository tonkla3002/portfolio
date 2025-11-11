import { resumeProjects, experiences } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import SwiperCarousel from "@/components/SwiperCarousel";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-6 dark:border-white/10 hover-elevate tap-press">{children}</div>;
}

export default function ProjectsSection() {
  const { t } = useI18n();
  const senior = experiences.find((e) => e.title.toLowerCase().startsWith("senior project"));
  const all = [
    senior ? { title: senior.title, period: senior.period, description: senior.bullets?.[0] } : undefined,
    ...resumeProjects,
  ].filter(Boolean) as { title: string; period?: string; description?: string }[];

  const slides = all.map((p) => (
    <Card key={p.title}>
      <div className="flex items-start justify-between gap-4">
        <div className="font-medium">
          {(() => {
            const seniorIdx = 0;
            const rpIdx = resumeProjects.findIndex((rp) => rp.title === p.title);
            if (p.title === experiences[0]?.title) {
              return t(`exp.${seniorIdx}.title`);
            }
            if (rpIdx >= 0) return t(`proj.${rpIdx}.title`);
            return p.title;
          })()}
        </div>
        {p.period && (
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {(() => {
              const seniorIdx = 0;
              const rpIdx = resumeProjects.findIndex((rp) => rp.period === p.period && rp.title === p.title);
              if (p.title === experiences[0]?.title) {
                return t(`exp.${seniorIdx}.period`);
              }
              if (rpIdx >= 0) return t(`proj.${rpIdx}.period`);
              return p.period;
            })()}
          </span>
        )}
      </div>
      {p.description && (
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          {(() => {
            const seniorIdx = 0;
            const rpIdx = resumeProjects.findIndex((rp) => rp.description === p.description && rp.title === p.title);
            if (p.title === experiences[0]?.title) {
              return t(`exp.${seniorIdx}.bullets.0`);
            }
            if (rpIdx >= 0) return t(`proj.${rpIdx}.description`);
            return p.description;
          })()}
        </p>
      )}
    </Card>
  ));

  return (
    <section
      id="projects"
      className="scroll-mt-24 space-y-6 section-reveal fade-side"
      data-direction="left"
      data-fade-out="true"
      //@ts-ignore
      style={{ "--fx-duration": "700ms" }}
    >
      <h2 className="text-3xl font-semibold">{t("sections.projects")}</h2>
      <SwiperCarousel
        items={slides}
        className="w-full"
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }}
        loop={false}
        showNavigation
        showPagination
        ariaLabel="Projects carousel"
      />
    </section>
  );
}