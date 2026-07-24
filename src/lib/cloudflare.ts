const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID!;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN!;
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME!;
const R2_PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL!;

const D1_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
const R2_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${R2_BUCKET}/objects`;

const headers = () => ({
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json",
});

export interface D1Result<T = Record<string, unknown>> {
  results: T[];
  meta: { last_row_id?: number; changes?: number };
}

export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<D1Result<T>> {
  const res = await fetch(D1_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ sql, params }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`D1 error ${res.status}: ${text}`);
  }

  const json = await res.json() as { success: boolean; result: D1Result<T>[] };
  if (!json.success) throw new Error("D1 query failed");
  return json.result[0];
}

export async function d1First<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const data = await d1Query<T>(sql, params);
  return data.results[0] ?? null;
}

export async function r2Put(
  key: string,
  body: ArrayBuffer,
  contentType: string
): Promise<string> {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  const res = await fetch(`${R2_URL}/${encodedKey}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": contentType,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`R2 upload error ${res.status}: ${text}`);
  }

  return `${R2_PUBLIC_URL}/${key}`;
}
