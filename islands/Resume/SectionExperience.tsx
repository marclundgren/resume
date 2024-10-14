import { ExperienceItem } from "./ExperienceItem.tsx";
import experienceData from "../../data/experienceData.json" with {
  type: "json",
};

export const SectionExperience = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
      Experience
    </h2>
    <div className="space-y-6">
      {experienceData.map((experience, index) => (
        <ExperienceItem
          key={index}
          title={experience.title}
          company={experience.company}
          period={experience.period}
          responsibilities={experience.responsibilities}
          technologies={experience.technologies}
        />
      ))}
    </div>
  </section>
);
