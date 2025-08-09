import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import { parseResponse, useQuery } from "./hooks/useQuery.tsx";

type SkillsResponse = {
  summary: string[];
  skills: { category: string; items: string[] }[];
};

export const SectionSkills = () => {
  const queryFn = useCallback(
    () => fetch("/api/skills").then(parseResponse<SkillsResponse>),
    [],
  );
  const { isPending, error, data } = useQuery<SkillsResponse>({
    queryKey: ["skillsData"],
    queryFn,
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
        Skills
      </h2>
      <ul className="list-disc pl-5 text-gray-700 mb-4">
        {data.summary.map((line, idx) => <li key={idx}>{line}</li>)}
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-semibold mb-1">{group.category}</h3>
            <p className="text-gray-700">{group.items.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
