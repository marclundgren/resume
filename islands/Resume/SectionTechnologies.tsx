export const SectionTechnologies = () => {
  const technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "Go",
    "REST APIs",
    "GraphQL",
    "Jest",
    "Cypress",
    "AWS",
    "GitHub Copilot",
    "Claude Code",
  ];

  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
        Technologies
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        {technologies.join(" • ")}
      </p>
    </section>
  );
};
