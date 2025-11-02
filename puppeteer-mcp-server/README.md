# Resume PDF MCP Server

MCP server that exports your resume as a high-quality PDF using Puppeteer (headless Chrome).

## Why Puppeteer?

- ✅ **Perfect rendering** - Exactly what you see in Chrome
- ✅ **Print CSS support** - Respects `@media print` rules
- ✅ **High quality** - Much better than html2canvas
- ✅ **Free** - No paid services required
- ✅ **Fast** - Exports in seconds
- ✅ **No template maintenance** - Uses your existing HTML/CSS

## Features

- Export resume as PDF with perfect Chrome rendering
- Support for both Letter and A4 formats
- Customizable scaling and margins
- Automatic server detection
- Print-optimized CSS support

## Setup

### 1. Install Dependencies

```bash
cd puppeteer-mcp-server
npm install
npm run build
```

This will install Puppeteer (which includes Chromium) and build the server.

### 2. Configure MCP Server

Add to `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "resume-pdf": {
      "command": "node",
      "args": ["/Users/marc/Dev/resume/puppeteer-mcp-server/build/index.js"],
      "env": {
        "OUTPUT_DIR": "/Users/marc/Dev/resume/output",
        "RESUME_URL": "http://localhost:8000",
        "PROJECT_ROOT": "/Users/marc/Dev/resume"
      }
    }
  }
}
```

### 3. Create Output Directory

```bash
mkdir -p /Users/marc/Dev/resume/output
```

## Usage

### Start Your Dev Server

First, make sure your Fresh dev server is running:

```bash
cd /Users/marc/Dev/resume
deno task start
```

### Export PDF via Claude Code

Ask Claude:

```
Export my resume as a PDF
```

Or with custom options:

```
Export my resume as a PDF in A4 format with scale 1.2
```

### Available Tools

#### `export-resume-pdf`

Export the resume as a high-quality PDF.

**Options:**
- `url` - URL to export (default: http://localhost:8000)
- `filename` - Output filename (default: Marc_Lundgren_Resume_[timestamp].pdf)
- `format` - Paper format: "Letter" or "A4" (default: Letter)
- `scale` - Page scale 0.1-2 (default: 1)
- `waitForSelector` - CSS selector to wait for before exporting (optional)

**Example:**
```json
{
  "format": "A4",
  "scale": 1.1,
  "filename": "Marc_Lundgren_Resume.pdf"
}
```

#### `check-server`

Check if the dev server is running.

**Options:**
- `url` - URL to check (default: http://localhost:8000)

#### `start-dev-server`

Get instructions for starting the dev server (doesn't actually start it, just provides commands).

## How It Works

```
Fresh Dev Server → Puppeteer (Headless Chrome) → High-Quality PDF
     ↑                         ↑
  Your HTML/CSS          Perfect Rendering
```

1. Your Fresh app serves the resume at localhost:8000
2. Puppeteer launches headless Chrome
3. Chrome renders your page with all CSS
4. Puppeteer exports as PDF with print CSS applied
5. PDF saved to output directory

## Output

PDFs are saved to the `output/` directory by default. You can customize this with the `OUTPUT_DIR` environment variable.

## Print CSS Optimization

The resume page includes print-specific CSS that:
- Hides interactive elements (buttons)
- Optimizes spacing for paper
- Ensures proper page breaks
- Uses print-friendly fonts and colors

See `routes/index.tsx` for the print CSS styles.

## Troubleshooting

### "Server is not running"

Start your dev server:
```bash
cd /Users/marc/Dev/resume
deno task start
```

### "Puppeteer fails to launch"

Make sure you have Chrome/Chromium installed. Puppeteer includes Chromium, but if you're on a restricted system:

```bash
# Check Puppeteer installation
npm list puppeteer
```

### PDF looks different than browser

- Check that print CSS is being applied
- Try adjusting the `scale` parameter
- Verify fonts are loading correctly

### File too large

- Reduce embedded images
- Use web fonts instead of local fonts
- Adjust the `scale` parameter

## Tips for Best Results

1. **Use print CSS** - Add `@media print` rules to optimize for PDF
2. **Test in browser** - Use Chrome's print preview to see how it'll look
3. **Optimize images** - Compress images to reduce PDF size
4. **Use web fonts** - Ensures fonts work in PDF
5. **Avoid fixed positioning** - Can cause issues in PDF layout

## Development

### Watch Mode

```bash
npm run watch
```

### Manual Testing

```bash
# Build
npm run build

# Test the server
node build/index.js
```

## Comparison to html2canvas

| Feature | html2canvas | Puppeteer |
|---------|-------------|-----------|
| Quality | Medium | Excellent |
| CSS Support | Limited | Full |
| Print CSS | No | Yes |
| Speed | Slow | Fast |
| File Size | Large (images) | Small (vector) |
| Text Selectable | No | Yes |
| Cost | Free | Free |

Puppeteer produces **much better** results because it uses an actual browser engine rather than trying to recreate rendering in JavaScript.
