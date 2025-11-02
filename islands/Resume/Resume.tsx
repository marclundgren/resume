import { Header } from "./Header.tsx";
import { SectionSummary } from "./SectionSummary.tsx";
import { SectionSkills } from "./SectionSkills.tsx";
import { SectionAccomplishments } from "./SectionAccomplishments.tsx";
import { SectionTechnologies } from "./SectionTechnologies.tsx";
import { SectionEducation } from "./SectionEducation.tsx";
import { SectionTimeline } from "./SectionTimeline.tsx";
import { QueryClient, QueryClientProvider } from "./hooks/useQuery.tsx";

const queryClient = new QueryClient();

const Resume = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-3xl print-container">
        <div>
          <main className="p-8 bg-white shadow-lg print-content">
            <Header />
            <QueryClientProvider client={queryClient}>
              <SectionSummary />
              <div className="grid grid-cols-[1fr_200px] gap-6">
                <div>
                  <SectionSkills />
                  <SectionAccomplishments />
                  <SectionTechnologies />
                  <SectionEducation />
                </div>
                <div>
                  <SectionTimeline />
                </div>
              </div>
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
