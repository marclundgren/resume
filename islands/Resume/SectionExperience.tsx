import { ExperienceItem, ExperienceItemProps } from "./ExperienceItem.tsx";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import {
  parseResponse,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "./hooks/useQuery.tsx";

const _SectionExperience = () => {
  const { isPending, error, data } = useQuery<ExperienceItemProps[]>({
    queryKey: ["experienceData"],
    queryFn: () =>
      fetch("/api/experience")
        .then(parseResponse<ExperienceItemProps[]>),
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
        Experience
      </h2>
      <div className="space-y-6">
        {data.map((experience, index) => (
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
};

const queryClient = new QueryClient();
export const SectionExperience = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <_SectionExperience />
    </QueryClientProvider>
  );
};
