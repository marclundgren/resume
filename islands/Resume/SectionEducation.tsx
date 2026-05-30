import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import { parseResponse, useQuery } from "./hooks/useQuery.tsx";

type EducationItemProps = {
  school: string;
  degree: string;
  period: string;
};

export const SectionEducation = () => {
  const queryFn = useCallback(() =>
    fetch("/api/education")
      .then(parseResponse<EducationItemProps[]>), []);
  const { isPending, error, data } = useQuery<EducationItemProps[]>({
    queryKey: ["educationData"],
    queryFn,
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
        Education
      </h2>
      <div className="space-y-1.5">
        {data.map((education, index) => (
          <div key={index}>
            <p className="text-sm font-semibold text-gray-700">{education.degree}</p>
            <p className="text-xs text-gray-600">{education.school}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
