export const SectionEducation = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
      Education
    </h2>
    <div>
      <h3 className="text-lg font-semibold">
        California State University of Fullerton
      </h3>
      {/* TODO move this into a hook with useQuery */}
      <p className="text-gray-600">Jun 2007 - Dec 2011</p>
      <p className="text-gray-700">Bachelor of Science - Computer Science</p>
    </div>
  </section>
);
