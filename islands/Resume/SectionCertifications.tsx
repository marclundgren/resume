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
  if (!data || data.length === 0) return null;
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 pb-1 border-b border-gray-200">
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
