import { handleChat, sendJson, readBody } from "../src/server/handlers";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    sendJson(res, { error: "Method not allowed" }, 405);
    return;
  }
  try {
    req.body = await readBody(req);
    await handleChat(req, res);
  } catch (e: any) {
    sendJson(res, { error: e?.message || "Internal error" }, 500);
  }
}
