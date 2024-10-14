import { useRef } from "preact/hooks";
import { Header } from "./Header.tsx";
import { SectionCertifications } from "./SectionCertifications.tsx";
import { SectionEducation } from "./SectionEducation.tsx";
import { SectionExperience } from "./SectionExperience.tsx";

const Resume = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    globalThis.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          onClick={handlePrint}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to PDF
        </button>
        <div ref={contentRef}>
          <main className="p-8 bg-white shadow-lg">
            <Header />
            <SectionExperience />
            <SectionEducation />
            <SectionCertifications />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resume;
