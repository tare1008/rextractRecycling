import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route: Corporate AI Waste Auditor & ESG Strategy Assistant
app.post("/api/audit", async (req, res) => {
  try {
    const { companyName, industryType, wasteData, mhLocation } = req.body;

    if (!wasteData) {
      return res.status(400).json({ error: "Waste profile details are required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please set your GEMINI_API_KEY in the Secrets panel."
      });
    }

    // Lazy initialization of the SDK client
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `You are the lead Environmental Auditor and Circular Economy consultant at Rextract Pvt. Ltd., operating in Pune & Maharashtra, India.
Generate a professional, actionable, and comprehensive Corporate Sustainability & Waste Management Optimization Strategy for a corporate client.

Client Profile:
- Company Name: ${companyName || "Valued Corporate Partner"}
- Industry: ${industryType || "General Corporate Office"}
- Location: ${mhLocation || "Pune, MH, India"}

Monthly Waste Inventory reported by client:
${JSON.stringify(wasteData, null, 2)}

Please provide a well-structured and detailed Markdown report including:
1. **Executive Summary**: Acknowledging their efforts and projecting their current carbon offset.
2. **Waste Category Analysis**: A breakdown of the environmental impact of their specific waste streams (e.g. plastic recyclability, organic composting, paper/cardboard circular loops, e-waste hazards).
3. **Circular Optimization Plan**: 3 key step-by-step recommendations on how they can reduce waste at source, improve separation, and work with Rextract's recycling networks (mentioning Rextract's advanced PET/HDPE recycling plants in Pune).
4. **Projected ESG Benefits**: Estimated annual diverted tonnage, Scope 3 greenhouse gas reduction, and corporate compliance benefits for Indian CSR rules (Section 135 of the Indian Companies Act) and EPR (Extended Producer Responsibility) norms where applicable.
5. **Rextract Action Partnership**: A tailored proposal on how Rextract can establish a specialized closed-loop system for their waste (e.g., custom collections, monthly ESG certificates).

Keep the tone professional, encouraging, analytical, and highly structured. Use clean markdown headings, tables, or bullet lists.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const textOutput = response.text;
    res.json({ auditReport: textOutput });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error in generating waste audit." });
  }
});

// Setup Vite server middleware in dev, static assets in production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file serving...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rextract server running at http://localhost:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
