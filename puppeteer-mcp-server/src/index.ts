#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface PuppeteerConfig {
  outputDir: string;
  defaultUrl: string;
  projectRoot: string;
}

class ResumePDFServer {
  private server: Server;
  private config: PuppeteerConfig;

  constructor() {
    this.server = new Server(
      {
        name: "resume-pdf-mcp-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Load config from environment variables or defaults
    this.config = {
      outputDir: process.env.OUTPUT_DIR || path.join(process.cwd(), "output"),
      defaultUrl: process.env.RESUME_URL || "http://localhost:8000",
      projectRoot: process.env.PROJECT_ROOT || process.cwd(),
    };

    this.setupHandlers();
  }

  private async ensureOutputDir() {
    try {
      await fs.access(this.config.outputDir);
    } catch {
      await fs.mkdir(this.config.outputDir, { recursive: true });
    }
  }

  private async isServerRunning(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async exportPDF(options: {
    url?: string;
    filename?: string;
    format?: "Letter" | "A4";
    scale?: number;
    waitForSelector?: string;
  }) {
    const {
      url = this.config.defaultUrl,
      filename = `Marc_Lundgren_Resume_${Date.now()}.pdf`,
      format = "Letter",
      scale = 1,
      waitForSelector,
    } = options;

    await this.ensureOutputDir();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      // Navigate to the page
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Wait for specific selector if provided
      if (waitForSelector) {
        await page.waitForSelector(waitForSelector, { timeout: 10000 });
      }

      // Give it a bit more time for fonts and rendering
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate PDF
      const outputPath = path.join(this.config.outputDir, filename);
      await page.pdf({
        path: outputPath,
        format,
        scale,
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: "0.5in",
          right: "0.5in",
          bottom: "0.5in",
          left: "0.5in",
        },
      });

      return outputPath;
    } finally {
      await browser.close();
    }
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools: Tool[] = [
        {
          name: "export-resume-pdf",
          description:
            "Export the resume as a high-quality PDF using headless Chrome. Supports custom URLs, formats, and scaling.",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: `URL to export (default: ${this.config.defaultUrl})`,
              },
              filename: {
                type: "string",
                description:
                  "Output filename (default: Marc_Lundgren_Resume_[timestamp].pdf)",
              },
              format: {
                type: "string",
                enum: ["Letter", "A4"],
                description: "Paper format (default: Letter)",
              },
              scale: {
                type: "number",
                description: "Scale of the webpage rendering (0.1 - 2, default: 1)",
                minimum: 0.1,
                maximum: 2,
              },
              waitForSelector: {
                type: "string",
                description:
                  "CSS selector to wait for before generating PDF (optional)",
              },
            },
          },
        },
        {
          name: "check-server",
          description: "Check if the resume dev server is running",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "URL to check (default: http://localhost:8000)",
              },
            },
          },
        },
        {
          name: "start-dev-server",
          description:
            "Start the Fresh dev server in the background (if not already running)",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
      ];

      return { tools };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "check-server": {
            const url = (args as any)?.url || this.config.defaultUrl;
            const isRunning = await this.isServerRunning(url);

            return {
              content: [
                {
                  type: "text",
                  text: isRunning
                    ? `✅ Server is running at ${url}`
                    : `❌ Server is not running at ${url}\n\nRun "deno task start" in ${this.config.projectRoot} or use the start-dev-server tool.`,
                },
              ],
            };
          }

          case "start-dev-server": {
            const isRunning = await this.isServerRunning(this.config.defaultUrl);

            if (isRunning) {
              return {
                content: [
                  {
                    type: "text",
                    text: `Server is already running at ${this.config.defaultUrl}`,
                  },
                ],
              };
            }

            return {
              content: [
                {
                  type: "text",
                  text: `To start the dev server, run this command in a separate terminal:\n\ncd ${this.config.projectRoot}\ndeno task start\n\nOr if you prefer to run it in the background, I can help you with that.`,
                },
              ],
            };
          }

          case "export-resume-pdf": {
            const url = (args as any)?.url;
            const filename = (args as any)?.filename;
            const format = (args as any)?.format;
            const scale = (args as any)?.scale;
            const waitForSelector = (args as any)?.waitForSelector;

            // Check if server is running
            const targetUrl = url || this.config.defaultUrl;
            const isRunning = await this.isServerRunning(targetUrl);

            if (!isRunning) {
              return {
                content: [
                  {
                    type: "text",
                    text: `❌ Server is not running at ${targetUrl}\n\nPlease start the dev server first:\n\ncd ${this.config.projectRoot}\ndeno task start\n\nOr use the check-server tool to verify.`,
                  },
                ],
                isError: true,
              };
            }

            const outputPath = await this.exportPDF({
              url,
              filename,
              format,
              scale,
              waitForSelector,
            });

            // Get file size
            const stats = await fs.stat(outputPath);
            const fileSizeKB = (stats.size / 1024).toFixed(2);

            return {
              content: [
                {
                  type: "text",
                  text: `✅ PDF exported successfully!\n\n📄 File: ${outputPath}\n📦 Size: ${fileSizeKB} KB\n🔗 URL: ${targetUrl}\n\nYou can now open this file in any PDF viewer.`,
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Tool error:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Resume PDF MCP server running on stdio");
  }
}

const server = new ResumePDFServer();
server.run().catch(console.error);
