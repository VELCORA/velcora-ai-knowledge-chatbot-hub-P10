import { handleKnowledgeQuery } from "../src/server/handlers";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    await handleKnowledgeQuery(req, res);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Internal error" });
  }
}
