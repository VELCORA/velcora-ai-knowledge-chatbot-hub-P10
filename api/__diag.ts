export default async function handler(req: any, res: any) {
  const info: any = {
    node: typeof process !== "undefined" ? process.version : "n/a",
    resType: typeof res,
    resCtor: res ? (Object.getPrototypeOf(res)?.constructor?.name || "unknown") : "undefined",
    resFns: res ? Object.getOwnPropertyNames(res).filter((k: string) => typeof (res as any)[k] === "function").slice(0, 50) : [],
    reqType: typeof req,
    reqMethod: req && typeof req.method === "string" ? req.method : typeof (req && req.method),
  };
  const body = JSON.stringify(info, null, 2);
  if (res && typeof res.end === "function") {
    res.statusCode = 200;
    if (typeof res.setHeader === "function") res.setHeader("Content-Type", "application/json");
    res.end(body);
    return;
  }
  return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
}
