export type ExperienceItemProps = {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  technologies: string;
};

export const ExperienceItem = (
  { title, company, period, responsibilities, technologies }:
    ExperienceItemProps,
) => (
  <div>
    <h3 className="text-base font-semibold">{title} - {company}</h3>
    <p className="text-sm text-gray-600">{period}</p>
    <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 space-y-0.5">
      {responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
    </ul>
    <p className="mt-1 text-xs text-gray-600 italic">Tech: {technologies}</p>
  </div>
);
