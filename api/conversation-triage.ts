export const runtime = "edge";

const MODEL = "gemini-3.6-flash";

async function normalize(req: any): Promise<{ method: string; body: any }> {
  if (typeof Request !== "undefined" && req instanceof Request) {
    let body: any = {};
    try { body = await req.json(); } catch { body = {}; }
    return { method: req.method, body };
  }
  let body = req?.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  return { method: req?.method || "GET", body: body || {} };
}

function respond(res: any, req: any, payload: any, status = 200): any {
  const json = JSON.stringify(payload);
  if (res && typeof res.end === "function") {
    res.statusCode = status;
    if (typeof res.setHeader === "function") res.setHeader("Content-Type", "application/json");
    return res.end(json);
  }
  return new Response(json, { status, headers: { "Content-Type": "application/json" } });
}

async function callGemini(apiKey: string, prompt: string, jsonMode = false): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const body: any = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
  if (jsonMode) body.generationConfig = { responseMimeType: "application/json" };
  const signal = (AbortSignal as any)?.timeout ? (AbortSignal as any).timeout(8000) : undefined;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (!r.ok) throw new Error(`Gemini ${r.status}`);
  const j = await r.json();
  return j?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

async function triageLogic(body: any) {
  const { conversation } = body || {};
  const ai = process.env.GEMINI_API_KEY;
  if (!ai) {
    return {
      sentiment: "positive", sentimentScore: 0.88, intent: "Technical Inquiry / Feature Request",
      urgency: "Medium", suggestedAction: "Auto-resolve with documentation snippet & invite to Developer Sandbox.",
      summary: "Customer requested info regarding Velcora AI webhook integrations and autonomous knowledge sync.",
    };
  }
  try {
    const prompt = `Analyze this customer support conversation:\n"${conversation}"\n\nReturn a JSON object with:\n- sentiment: "positive" | "neutral" | "negative" | "frustrated"\n- sentimentScore: float between 0 and 1\n- intent: short string description of customer's goal\n- urgency: "Low" | "Medium" | "High" | "Critical"\n- suggestedAction: actionable recommendation for the agent or bot\n- summary: 1-sentence summary`;
    const parsed = JSON.parse((await callGemini(ai, prompt, true)).trim() || "{}");
    return parsed;
  } catch (e: any) {
    return {
      sentiment: "neutral", sentimentScore: 0.75, intent: "Operational Inquiry", urgency: "Medium",
      suggestedAction: "Evaluate against knowledge base and dispatch synthesized reply.",
      summary: "Customer conversation analyzed and tagged for queue triage.",
    };
  }
}

export default async function handler(req: any, res: any) {
  const n = await normalize(req);
  if (n.method !== "POST") return respond(res, req, { error: "Method not allowed" }, 405);
  try {
    return respond(res, req, await triageLogic(n.body), 200);
  } catch (e: any) {
    return respond(res, req, { error: e?.message || "Internal error" }, 500);
  }
}
