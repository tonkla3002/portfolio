import Image from "next/image";
import { softSkills } from "@/data/resume";
import { useI18n } from "@/context/i18n";
import Section from "@/components/SectionHeading";

const softSkillKeyMap: Record<string, string> = {
  "Honest and Responsible": "soft.honesty",
  Communication: "soft.communication",
  Teamwork: "soft.teamwork",
  "Problem Solving": "soft.problemSolving",
  Adaptability: "soft.adaptability",
  "Fast Learner": "soft.fastLearner",
};

export default function AboutSection() {
  const { t } = useI18n();
  return (
    <Section id="about" title={t("sections.about")}>
      <div className="grid gap-10 border-t border-ink pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        {/* Greyscale portrait that warms up to colour on hover. */}
        <figure className="group">
          <div className="relative aspect-[4/5] w-full max-w-[22rem] overflow-hidden">
            <Image
              src="/profile-web.jpg"
              alt="Thanakorn Wannatong"
              fill
              sizes="(min-width: 768px) 22rem, 90vw"
              className="object-cover object-[50%_20%] grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="label mt-3 flex justify-between text-muted">
            <span>Thanakorn W.</span>
            <span>Fig. 01</span>
          </figcaption>
        </figure>

        <div>
          <p className="max-w-[42ch] text-pretty text-[1.3rem] leading-[1.6] sm:text-[1.45rem]">{t("about.summary")}</p>
          <div className="mt-10 grid gap-2 border-t border-line pt-4 sm:grid-cols-[9rem_1fr]">
            <div className="label text-muted">{t("label.strengths")}</div>
            <p className="leading-relaxed">{softSkills.map((s) => t(softSkillKeyMap[s] ?? s)).join(", ")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
