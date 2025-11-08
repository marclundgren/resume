#!/usr/bin/env -S deno run -A

import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const RESUME_URL = "http://localhost:8000";
const OUTPUT_DIR = "./output";

// Get filename from args or use default with timestamp
const args = Deno.args;
const customFilename = args[0];
const timestamp = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
const filename = customFilename || `Marc_Lundgren_Resume_${timestamp}.pdf`;
const outputPath = `${OUTPUT_DIR}/${filename}`;

console.log("🚀 Starting PDF export...");
console.log(`📄 URL: ${RESUME_URL}`);
console.log(`💾 Output: ${outputPath}`);

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
  console.error("❌ Error generating PDF:", error);
  Deno.exit(1);
} finally {
  await browser.close();
}
