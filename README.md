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
- **Pricing & Contact** — plan picker that opens provisioning.

## Tech

- Vite + React 19 + TypeScript + Tailwind CSS v4
- Express backend (`server.ts`) with `/api/chat`, `/api/knowledge-query`, `/api/conversation-triage`
- Google Gemini (`gemini-3.7-flash`, current GA) via `@google/genai`

## Quick start (local)

```bash
npm install
# add GEMINI_API_KEY to .env
npm run dev
```

Runs at http://localhost:3000.

## Deploy (Railway / Render / Fly)

This is a persistent Node server (it calls `app.listen`), so it needs a long-lived host — **not** Vercel serverless.

```bash
npm run build
```

Set environment variables on the host:
- `GEMINI_API_KEY` — your Gemini key
- `NODE_ENV=production` — serves the built `dist/` (without this it loads dev middleware)
- `PORT` is injected automatically by the host

Start command: `node dist/server.cjs`. Health check: `GET /api/health`.

## Status

Functional prototype with real Gemini-backed chat, knowledge, and triage endpoints. Wire authentication, a real vector database, and live channel connectors before production use.

## Brand

Velcora is an AI automation brand. Logo and name are property of Velcora.

---

<p align="center">Built by Velcora — clarity in a noisy universe.</p>
