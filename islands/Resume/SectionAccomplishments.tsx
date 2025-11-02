import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import { parseResponse, useQuery } from "./hooks/useQuery.tsx";

export const SectionAccomplishments = () => {
  const queryFn = useCallback(() =>
    fetch("/api/accomplishments")
      .then(parseResponse<string[]>), []);
  const { isPending, error, data } = useQuery<string[]>({
    queryKey: ["accomplishmentsData"],
    queryFn,
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
        Key Accomplishments
      </h2>
      <ul className="space-y-1.5">
        {data.map((accomplishment, index) => (
          <li key={index} className="text-sm text-gray-700">
            • {accomplishment}
          </li>
        ))}
      </ul>
    </section>
  );
};
