import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { handleHealth, handleChat, handleKnowledgeQuery, handleTriage } from "./src/server/handlers";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10mb" }));

// API Health
app.get("/api/health", handleHealth);

// Chat endpoint with Gemini & Intelligent Fallback
app.post("/api/chat", handleChat);

// Knowledge Base search and Q&A endpoint
app.post("/api/knowledge-query", handleKnowledgeQuery);

// Conversation triage endpoint
app.post("/api/conversation-triage", handleTriage);

// Start server with Vite middleware in dev or static files in production
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Velcora AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
