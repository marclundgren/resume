import { useCallback } from "preact/hooks";
import { SkeletonLoader } from "../../components/SkeletonLoader.tsx";
import { parseResponse, useQuery } from "./hooks/useQuery.tsx";

type CertificationItemProps = {
  name: string;
  issuer: string;
  period: string;
};

export const SectionCertifications = () => {
  const queryFn = useCallback(() =>
    fetch("/api/certifications")
      .then(parseResponse<CertificationItemProps[]>), []);
  const { isPending, error, data } = useQuery<CertificationItemProps[]>({
    queryKey: ["certificationsData"],
    queryFn,
  });

  if (isPending) return <SkeletonLoader />;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!data) return <div>No data found</div>;
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
        Certifications
      </h2>
      <ul className="list-disc pl-5 text-gray-700">
        {data.map((certification, index) => (
          <li key={index}>
            {certification.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
