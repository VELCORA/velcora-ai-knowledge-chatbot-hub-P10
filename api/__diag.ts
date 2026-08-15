export default async function handler(req: any, res: any) {
  const info: any = {
    node: typeof process !== "undefined" ? process.version : "n/a",
    resType: typeof res,
    resCtor: res ? (Object.getPrototypeOf(res)?.constructor?.name || "unknown") : "undefined",
    resFns: res ? Object.getOwnPropertyNames(res).filter((k: string) => typeof (res as any)[k] === "function").slice(0, 60) : [],
    reqType: typeof req,
    reqCtor: typeof Request !== "undefined" && req instanceof Request ? "Request" : (req ? Object.getPrototypeOf(req)?.constructor?.name : "undefined"),
  };
  const json = JSON.stringify(info, null, 2);
  if (res && typeof res.end === "function") {
    res.statusCode = 200;
    if (typeof res.setHeader === "function") res.setHeader("Content-Type", "application/json");
    res.end(json);
    return;
  }
  return new Response(json, { status: 200, headers: { "Content-Type": "application/json" } });
}
