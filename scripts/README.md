# Resume PDF Export Scripts

## Quick Start

Export your resume as a PDF using Puppeteer:

```bash
# Make sure your dev server is running first
deno task start

# In another terminal, export PDF
deno task export-pdf
```

Or run directly:

```bash
node scripts/export-pdf.js
```

## Custom Filename

```bash
node scripts/export-pdf.js "Marc_Lundgren_Senior_Engineer_2024.pdf"
```

## Output

PDFs are saved to the `output/` directory in the project root.

Default filename: `Marc_Lundgren_Resume_YYYY-MM-DD.pdf`

## Requirements

- Node.js v18+ (you have v25.1.0)
- Dev server running on http://localhost:8000
- Puppeteer (installed via puppeteer-mcp-server)

## How It Works

1. Launches a headless Chrome browser
2. Navigates to your local resume page
3. Generates a high-quality PDF with:
   - Letter format (8.5" x 11")
   - Print backgrounds enabled
   - No margins (full bleed)
   - Selectable text (not an image)

## Troubleshooting

**Error: Cannot connect to http://localhost:8000**
- Make sure your dev server is running: `deno task start`

**Error: Cannot find module 'puppeteer'**
- The script uses Puppeteer from `puppeteer-mcp-server/node_modules`
- Make sure you've run `npm install` in the `puppeteer-mcp-server` directory
