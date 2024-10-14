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
    <h3 className="text-lg font-semibold">{title} - {company}</h3>
    <p className="text-gray-600">{period}</p>
    <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
      {responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
    </ul>
    <p className="mt-2 text-gray-600">Technologies: {technologies}</p>
  </div>
);
