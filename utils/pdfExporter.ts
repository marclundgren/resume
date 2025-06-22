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
    const { default: html2canvas } = await import("https://esm.sh/html2canvas@1.4.1");
    
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
    const { default: jsPDF } = await import("https://esm.sh/jspdf@2.5.1");
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
    const orientation = scaledHeight > a4Height ? "portrait" : "portrait";
    const pdf = new jsPDF(orientation, "pt", "a4");
    
    // If content is taller than A4, we might need multiple pages
    if (scaledHeight > a4Height) {
      let position = 0;
      let pageHeight = a4Height;
      
      while (position < scaledHeight) {
        // Add page if not the first page
        if (position > 0) {
          pdf.addPage();
        }
        
        // Calculate the portion of the image to include
        const sourceY = position / scale;
        const sourceHeight = Math.min(pageHeight / scale, imgHeight - sourceY);
        
        // Create a temporary canvas for this page
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d")!;
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        
        // Draw the portion of the original canvas
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          imgWidth,
          sourceHeight,
          0,
          0,
          imgWidth,
          sourceHeight,
        );
        
        const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
        pdf.addImage(
          pageImgData,
          "PNG",
          0,
          0,
          a4Width,
          sourceHeight * scale,
        );
        
        position += pageHeight;
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
      
      // Capture the element as a canvas
      const canvas = await this.captureElement(element, { quality, scale });
      
      // Create and download the PDF
      await this.createPDFFromCanvas(canvas, filename);
      
      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF. Please try again.");
    }
  }
}
