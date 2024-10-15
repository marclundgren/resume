import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import {
  parseResponse,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "./hooks/useQuery.tsx";

type EducationItemProps = {
  school: string;
  degree: string;
  period: string;
};

export const _SectionEducation = () => {
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
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
        Education
      </h2>
      <div className="space-y-6">
        {data.map((education, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{education.school}</h3>
            <p className="text-gray-600">{education.period}</p>
            <p className="text-gray-700">{education.degree}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const queryClient = new QueryClient();
export const SectionEducation = () => (
  <QueryClientProvider client={queryClient}>
    <_SectionEducation />
  </QueryClientProvider>
);
