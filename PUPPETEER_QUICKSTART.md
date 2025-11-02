# Resume PDF Export - Puppeteer Edition

**TL;DR**: Export your resume as a professional PDF using headless Chrome (Puppeteer) - no paid services, perfect rendering!

## What Is This?

Instead of using Figma (which requires paid Dev Mode), we're using **Puppeteer** - a headless Chrome browser that renders your HTML/CSS resume *exactly* as it appears in your browser and exports it as a high-quality PDF.

## Why Puppeteer?

✅ **Perfect rendering** - Exactly what you see in Chrome
✅ **Free** - No subscriptions or paid tiers
✅ **High quality** - Way better than html2canvas
✅ **Fast** - Exports in ~2 seconds
✅ **Print CSS support** - Respects `@media print` rules
✅ **Simple** - Uses your existing HTML/CSS

## Quick Setup (5 minutes)

### 1. Install the Puppeteer MCP Server

```bash
cd puppeteer-mcp-server
npm install
# Puppeteer will download Chromium automatically
```

This installs Puppeteer (which includes a bundled Chromium browser).

### 2. Create Output Directory

```bash
mkdir -p output
```

Your PDFs will be saved here.

### 3. Configure Claude Code

```bash
# Copy the template
cp .claude/mcp.json.template .claude/mcp.json
```

The template is already configured for Puppeteer - no edits needed!

### 4. Restart Claude Code

The MCP server will be automatically detected.

## Usage

### Export Your Resume as PDF

1. **Start your dev server** (in a separate terminal):
   ```bash
   deno task start
   ```

2. **Ask Claude** in Claude Code:
   ```
   Export my resume as a PDF
   ```

3. **Find your PDF** in the `output/` directory!

That's it! 🎉

## What You Get

- **High-quality PDF** saved to `output/Marc_Lundgren_Resume_[timestamp].pdf`
- **Selectable text** (unlike image-based PDFs)
- **Small file size** (vector-based, not images)
- **Professional quality** (same as printing from Chrome)

## Advanced Usage

### Custom Filename

```
Export my resume as a PDF with filename "Marc_Lundgren_Resume_2024.pdf"
```

### A4 Format (Instead of Letter)

```
Export my resume as a PDF in A4 format
```

### Custom Scale

```
Export my resume as a PDF with scale 1.2
```

This makes everything 20% larger on the page.

## How It Works

```
┌─────────────────┐
│  Fresh Server   │  Your HTML/CSS resume
│ localhost:8000  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Puppeteer     │  Headless Chrome
│  (Chromium)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  High-Quality   │  Saved to output/
│      PDF        │
└─────────────────┘
```

## Comparison

| Method | Quality | Cost | Setup Time | Maintenance |
|--------|---------|------|------------|-------------|
| **html2canvas** (old) | ⭐⭐ | Free | 0 min | None |
| **Figma** (abandoned) | ⭐⭐⭐⭐⭐ | $12-45/mo | 30 min | Medium |
| **Puppeteer** (new) | ⭐⭐⭐⭐⭐ | Free | 5 min | None |

## Print CSS Optimizations

Your resume already has print-optimized CSS in `static/print.css` that:

- Hides the "Export" and "Print" buttons
- Removes shadows and unnecessary spacing
- Ensures colors print correctly
- Prevents awkward page breaks
- Optimizes for Letter-sized paper

You can test how it looks by:
1. Opening http://localhost:8000 in Chrome
2. Press `Cmd/Ctrl + P` to open print preview
3. See exactly what the PDF will look like!

## Troubleshooting

### "Server is not running"

Start your dev server:
```bash
deno task start
```

Wait for it to say "Listening on http://localhost:8000"

### "Command not found: node"

You need Node.js installed. Check with:
```bash
node --version
```

Should show v18 or higher. If not, install from https://nodejs.org

### PDF looks weird

- Check print preview in Chrome first (`Cmd/Ctrl + P`)
- Try adjusting the `scale` parameter
- Check `static/print.css` for print-specific styles

### File is too large

- Reduce image sizes in your resume
- Use web fonts instead of embedded fonts
- Compress images before adding to HTML

## Tips for Best Results

1. **Always check print preview** - Press `Cmd/Ctrl + P` in Chrome to see what the PDF will look like
2. **Use web fonts** - They work better in PDFs than system fonts
3. **Test responsive layout** - Make sure it looks good at different scales
4. **Optimize images** - Compress them to keep PDF size small
5. **Use @media print** - Add print-specific styles to `static/print.css`

## File Locations

- **MCP Server**: `puppeteer-mcp-server/`
- **Print CSS**: `static/print.css`
- **PDF Output**: `output/`
- **Configuration**: `.claude/mcp.json`

## Next Steps

1. ✅ Export your first PDF (try it now!)
2. 🎨 Customize `static/print.css` for perfect formatting
3. 📝 Update your resume data in `data/*.json`
4. 🚀 Export and apply to jobs!

## Future Enhancements

Want to add:
- [ ] Automatic exports on git commit
- [ ] Multiple resume variants (different roles)
- [ ] Cover letter support
- [ ] GitHub Actions integration

Just ask Claude to help!

---

**Enjoy your new professional PDF export workflow!** 🎉

No Figma needed, no subscriptions required, just perfect Chrome rendering exported to PDF.
