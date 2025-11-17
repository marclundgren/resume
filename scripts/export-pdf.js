#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

// Use Puppeteer from the MCP server's node_modules
const puppeteer = require(path.join(__dirname, "..", "puppeteer-mcp-server", "node_modules", "puppeteer"));

const RESUME_URL = process.env.RESUME_URL || "http://localhost:8000";
const OUTPUT_DIR = path.join(__dirname, "..", "output");

// Get filename from args or use default with timestamp
const customFilename = process.argv[2];
const timestamp = new Date().toISOString().split("T")[0];
const filename = customFilename || `Marc_Lundgren_Resume_${timestamp}.pdf`;
const outputPath = path.join(OUTPUT_DIR, filename);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log("🚀 Starting PDF export...");
console.log(`📄 URL: ${RESUME_URL}`);
console.log(`💾 Output: ${outputPath}`);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    console.log("🌐 Loading resume page...");
    await page.goto(RESUME_URL, {
      waitUntil: "networkidle2",
    });

    console.log("📸 Generating PDF...");
    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    console.log("✅ PDF generated successfully!");
    console.log(`📁 Saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
