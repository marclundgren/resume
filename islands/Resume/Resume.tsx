import { useCallback } from "preact/hooks";
import { Header } from "./Header.tsx";
import { SectionCertifications } from "./SectionCertifications.tsx";
import { SectionEducation } from "./SectionEducation.tsx";
import { SectionExperience } from "./SectionExperience.tsx";
import { QueryClient, QueryClientProvider } from "./hooks/useQuery.tsx";

const queryClient = new QueryClient();

const Resume = () => {
  const handlePrint = useCallback(() => {
    globalThis.print();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl print-container">
        <button
          onClick={handlePrint}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded no-print"
        >
          Export to PDF
        </button>
        <div>
          <main className="p-8 bg-white shadow-lg print-content">
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
