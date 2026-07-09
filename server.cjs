var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
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
    const ai = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
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
      contents: prompt
    });
    const textOutput = response.text;
    res.json({ auditReport: textOutput });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error in generating waste audit." });
  }
});
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file serving...");
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Rextract server running at http://localhost:${PORT}`);
  });
}
setupServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
//# sourceMappingURL=server.cjs.map
