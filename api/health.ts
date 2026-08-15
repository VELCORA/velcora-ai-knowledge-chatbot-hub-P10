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

export default async function handler(req: any, res: any) {
  const n = await normalize(req);
  if (n.method !== "GET" && n.method !== "POST") {
    return respond(res, req, { error: "Method not allowed" }, 405);
  }
  try {
    return respond(res, req, { status: "ok", service: "Velcora AI Engine", time: new Date().toISOString() }, 200);
  } catch (e: any) {
    return respond(res, req, { error: e?.message || "Internal error" }, 500);
  }
}
