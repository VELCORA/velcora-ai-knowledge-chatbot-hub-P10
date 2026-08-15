// Vercel's serverless proxy returns 400 on POST requests whose body is sent
// with `Content-Type: application/json` (proxy-stage body parse failure on
// non-empty payloads). Sending the JSON payload as `text/plain` avoids that
// and the api/ handlers JSON.parse the raw string themselves.
export async function postJson<T = any>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`API ${url} responded ${res.status}`);
  }
  return (await res.json()) as T;
}
