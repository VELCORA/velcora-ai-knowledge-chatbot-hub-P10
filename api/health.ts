import { handleHealth, sendJson } from "./_lib";

export default async function handler(req: any, res: any) {
  try {
    await handleHealth(req, res);
  } catch (e: any) {
    sendJson(res, { error: e?.message || "Internal error" }, 500);
  }
}
