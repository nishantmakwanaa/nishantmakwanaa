import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeSection from "@/components/FadeSection";
import { toast } from "sonner";
import ContactSection from "@/components/ContactSection";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResumeInfo } from "@/hooks/usePortfolioData";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  const navigate = useNavigate();
  const { data: resumeInfo, isPending: loading } = useResumeInfo();
  const pdfUrl = resumeInfo?.url ?? "";
  const pdfFilename = resumeInfo?.filename ?? "resume.pdf";
  const [numPages, setNumPages] = useState<number>(0);
  const [pageWidth, setPageWidth] = useState<number>(650);

  useEffect(() => {
    const updateWidth = () => {
      const isSm = window.innerWidth >= 640;
      const padding = isSm ? 48 : 32;
      const maxWidth = Math.min(722, window.innerWidth) - padding;
      setPageWidth(maxWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleDownload = async () => {
    if (!pdfUrl) {
      toast.error("No resume to download");
      return;
    }
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      try {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = pdfFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Resume downloaded successfully!");
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      toast.error("Failed to download resume");
      console.error("Download error:", error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <main className="max-w-[722px] w-full mx-auto px-4 sm:px-6 pt-10 pb-4 flex-1 flex flex-col">
        <div className="pt-14 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            <FadeSection className="flex-1 flex flex-col">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Home
              </button>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="h-64 bg-muted rounded-xl" />
                </div>
              ) : !pdfUrl ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">Resume</h1>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground font-medium min-h-[40vh]">
                    No resume found
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground">Resume</h1>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>

                  <div className="w-full rounded-xl border border-border overflow-hidden">
                    <div className="w-full flex flex-col">
                      <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<p className="text-sm text-muted-foreground p-8 text-center">Loading PDF...</p>}
                        error={<p className="text-sm text-destructive p-8 text-center">Resume not found</p>}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={pageWidth}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        ))}
                      </Document>
                    </div>
                  </div>
                </>
              )}
            </FadeSection>
          </div>

          <div className="mt-12 sm:mt-16">
            <FadeSection>
              <ContactSection />
            </FadeSection>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
