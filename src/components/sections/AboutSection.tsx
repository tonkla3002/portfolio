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
    <Section id="about" index="01" title={t("sections.about")}>
      <p className="max-w-[38ch] text-pretty text-[1.4rem] leading-[1.6] sm:text-[1.6rem]">{t("about.summary")}</p>
      <div className="mt-12 max-w-2xl">
        <div className="label text-muted">{t("label.strengths")}</div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <li key={s} className="rounded-full border border-line px-4 py-1.5 text-[0.95rem]">
              {t(softSkillKeyMap[s] ?? s)}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
