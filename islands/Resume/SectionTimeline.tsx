import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import { parseResponse, useQuery } from "./hooks/useQuery.tsx";

type TimelineItemProps = {
  company: string;
  title: string;
  period: string;
};

export const SectionTimeline = () => {
  const queryFn = useCallback(() =>
    fetch("/api/timeline")
      .then(parseResponse<TimelineItemProps[]>), []);
  const { isPending, error, data } = useQuery<TimelineItemProps[]>({
    queryKey: ["timelineData"],
    queryFn,
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="text-right">
          <div className="font-semibold text-sm">{item.company}</div>
          <div className="text-xs text-gray-600 italic">{item.title}</div>
          <div className="text-xs text-gray-500">{item.period}</div>
        </div>
      ))}
    </div>
  );
};
