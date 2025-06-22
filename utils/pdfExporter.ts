// Dynamic imports to avoid server-side execution

export interface PDFExportOptions {
  element: HTMLElement;
  filename?: string;
  quality?: number;
  scale?: number;
}

export class PDFExporter {
  private static async captureElement(
    element: HTMLElement,
    options: { quality?: number; scale?: number } = {},
  ): Promise<HTMLCanvasElement> {
    const { quality = 2, scale = 2 } = options;
    
    // Dynamic import to avoid server-side execution
    console.log("Loading html2canvas...");
    const { default: html2canvas } = await import("https://esm.sh/html2canvas@1.4.1");
    console.log("html2canvas loaded successfully");
    
    return await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      height: element.scrollHeight,
      width: element.scrollWidth,
      // Ensure we capture the full content
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector(
          `.print-content`,
        ) as HTMLElement;
        if (clonedElement) {
          // Ensure all content is visible
          clonedElement.style.transform = "none";
          clonedElement.style.maxHeight = "none";
          clonedElement.style.overflow = "visible";
        }
      },
    });
  }

  private static async createPDFFromCanvas(
    canvas: HTMLCanvasElement,
    filename: string,
  ): Promise<void> {
    // Dynamic import to avoid server-side execution
    console.log("Loading jsPDF...");
    const jsPDFModule = await import("jspdf");
    const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;
    console.log("jsPDF loaded successfully");
    const imgData = canvas.toDataURL("image/png", 1.0);
    
    // Calculate dimensions for A4 page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 dimensions in points (72 DPI)
    const a4Width = 595.28;
    const a4Height = 841.89;
    
    // Calculate scale to fit content to A4 width
    const scale = a4Width / imgWidth;
    const scaledHeight = imgHeight * scale;
    
    // Create PDF with appropriate orientation
    const orientation = scaledHeight > a4Height ? "portrait" : "landscape";
    // @ts-ignore: jsPDF constructor
    const pdf = new jsPDF(orientation, "pt", "a4");
    
    // If content is taller than A4, we might need multiple pages
    if (scaledHeight > a4Height) {
      let position = 0;
      const pageHeight = a4Height;
      const margin = 40; // Margin to avoid cutting headers
      
      while (position < scaledHeight) {
        // Add page if not the first page
        if (position > 0) {
          pdf.addPage();
        }
        
        // Calculate the portion of the image to include
        const sourceY = position / scale;
        let currentPageHeight = Math.min(pageHeight / scale, imgHeight - sourceY);
        
        // If this isn't the last page and we're not at the very beginning,
        // reduce the page height slightly to avoid cutting headers
        if (position > 0 && (position + pageHeight) < scaledHeight) {
          currentPageHeight = Math.min((pageHeight - margin) / scale, imgHeight - sourceY);
        }
        
        // Create a temporary canvas for this page
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d")!;
        pageCanvas.width = imgWidth;
        pageCanvas.height = currentPageHeight;
        
        // Draw the portion of the original canvas
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          imgWidth,
          currentPageHeight,
          0,
          0,
          imgWidth,
          currentPageHeight,
        );
        
        const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
        pdf.addImage(
          pageImgData,
          "PNG",
          0,
          0,
          a4Width,
          currentPageHeight * scale,
        );
        
        position += (currentPageHeight * scale);
      }
    } else {
      // Single page - center the content
      const yPosition = (a4Height - scaledHeight) / 2;
      pdf.addImage(imgData, "PNG", 0, yPosition, a4Width, scaledHeight);
    }
    
    // Save the PDF
    pdf.save(filename);
  }

  public static async exportToPDF(options: PDFExportOptions): Promise<void> {
    const {
      element,
      filename = "resume.pdf",
      quality = 2,
      scale = 2,
    } = options;

    try {
      // Show loading state (you might want to add a loading indicator)
      console.log("Generating PDF...");
      console.log("Element dimensions:", element.scrollWidth, "x", element.scrollHeight);
      
      // Capture the element as a canvas
      console.log("Capturing element...");
      const canvas = await this.captureElement(element, { quality, scale });
      console.log("Canvas created:", canvas.width, "x", canvas.height);
      
      // Create and download the PDF
      console.log("Creating PDF...");
      await this.createPDFFromCanvas(canvas, filename);
      
      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Detailed error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }
}
