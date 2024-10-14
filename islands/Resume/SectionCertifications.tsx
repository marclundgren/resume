export const SectionCertifications = () => (
  <section>
    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
      Certifications
    </h2>
    {/* TODO move this into a hook with useQuery */}
    <ul className="list-disc pl-5 text-gray-700">
      <li>AWS Certified Developer Associate</li>
      <li>AWS Certified Cloud Practitioner</li>
    </ul>
  </section>
);
