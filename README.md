<h1 align="center">Velcora AI — Knowledge Base, Chatbot & Conversation Hub</h1>

<div align="center">
  Autonomous customer intelligence: a unified knowledge base, AI chatbot, and omnichannel conversation manager with a 3D motion interface.
</div>

---

## What it is

Velcora AI is a customer-intelligence platform that turns your documents into a live knowledge base, powers an AI chatbot, and orchestrates conversations across webchat, Slack, WhatsApp, and email — all from one workspace.

## Who it's for

- Support & success teams drowning in tickets
- Founders who want an AI agent answering customers 24/7
- Ops leads needing conversation triage, sentiment, and routing

## What it does

- **AI Playground** — chat with the Velcora engine live (Gemini-powered).
- **Knowledge Base** — ingest documents and get sourced answers with confidence scores.
- **Conversation Hub** — triage, sentiment, intent, and urgency tagging across channels.
- **Architecture view** — the 4-tier ingestion → embedding → retrieval → generation pipeline.
- **ROI Calculator** — model deflection savings vs. headcount.
- **Security matrix** — zero-retention, encryption, and compliance posture.
- **Contact** — get in touch and we'll get you live, 100% free.

## Tech

- Vite + React 19 + TypeScript + Tailwind CSS v4
- Express backend (`server.ts`) with `/api/chat`, `/api/knowledge-query`, `/api/conversation-triage`
- Google Gemini (`gemini-3.6-flash`, current GA) via `@google/genai`

## Quick start (local)

```bash
npm install
# add GEMINI_API_KEY to .env
npm run dev
```

Runs at http://localhost:3000.

## Deploy (Vercel)

This project is **Vercel-ready**. The frontend is a static Vite SPA, and the API is exposed as Vercel serverless functions under `api/` (`/api/chat`, `/api/knowledge-query`, `/api/conversation-triage`, `/api/health`) — so there is no long-lived Express server to host.

**Via the Vercel dashboard (recommended):**
1. Import the GitHub repo `VELCORA/velcora-ai-knowledge-chatbot-hub`.
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist` (set in `vercel.json`).
3. Add env var: `GEMINI_API_KEY`.
4. Deploy. The frontend and `/api/*` functions go live together.

**Via CLI:**
```bash
npm i -g vercel
vercel env add GEMINI_API_KEY
vercel --prod
```

Health check: `GET /api/health` → `{ "status": "ok", ... }`.

> Local dev still uses the full Express server: `npm run dev` (Vite middleware) or `npm run build && npm start` (serves `dist/`).

## Status

Functional prototype with real Gemini-backed chat, knowledge, and triage endpoints. Wire authentication, a real vector database, and live channel connectors before production use.

## Brand

Velcora is an AI automation brand. Logo and name are property of Velcora.

---

<p align="center">Built by Velcora — clarity in a noisy universe.</p>
