import { useCallback, useRef, useState } from "preact/hooks";
import { Header } from "./Header.tsx";
import { SectionCertifications } from "./SectionCertifications.tsx";
import { SectionEducation } from "./SectionEducation.tsx";
import { SectionExperience } from "./SectionExperience.tsx";
import { QueryClient, QueryClientProvider } from "./hooks/useQuery.tsx";
import { PDFExporter } from "../../utils/pdfExporter.ts";

const queryClient = new QueryClient();

const Resume = () => {
  const resumeRef = useRef<HTMLElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleExportToPDF = useCallback(async () => {
    if (!resumeRef.current) {
      console.error("Resume element not found");
      return;
    }

    setIsGeneratingPDF(true);
    try {
      await PDFExporter.exportToPDF({
        element: resumeRef.current,
        filename: "Marc_Lundgren_Resume.pdf",
        quality: 2,
        scale: 2,
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  }, []);

  const handlePrint = useCallback(() => {
    globalThis.print();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl print-container">
        <div className="mb-4 flex gap-2 no-print">
          <button
            type="button"
            onClick={handleExportToPDF}
            disabled={isGeneratingPDF}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors ${
              isGeneratingPDF ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isGeneratingPDF ? "Generating PDF..." : "Export to PDF"}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Print
          </button>
        </div>
        <div>
          <main
            ref={resumeRef}
            className="p-8 bg-white shadow-lg print-content"
          >
            <Header />
            <QueryClientProvider client={queryClient}>
              <SectionExperience />
              <SectionEducation />
              <SectionCertifications />
            </QueryClientProvider>
          </main>
        </div>
      </div>
      <footer className="pt-4 pb-4 text-center text-gray-500 text-sm no-print">
        Built with{" "}
        <a href="https://deno.land" className="text-blue-600 hover:underline">
          Deno
        </a>{" "}
        and{" "}
        <a
          href="https://fresh.deno.dev"
          className="text-blue-600 hover:underline"
        >
          Fresh
        </a>
      </footer>
    </div>
  );
};

export default Resume;
