import { NextRequest } from "next/server";

export const runtime = "edge";

// https://vercel.com/docs/edge-network/regions#region-list
export const preferredRegion = [
  "hnd1",
  "arn1",
  "bom1",
  "cdg1",
  "cle1",
  "cpt1",
  "dub1",
  "fra1",
  "gru1",
  // 'hkg1', ip blocked by openai
  "iad1",
  "icn1",
  "kix1",
  "lhr1",
  "pdx1",
  "sfo1",
  "sin1",
  "syd1",
];

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const proxyUrl = new URL(req.url);
  proxyUrl.host = "api.openai.com";
  proxyUrl.pathname = params.path.join("/");
  proxyUrl.search = "";
  proxyUrl.port = "443";
  proxyUrl.protocol = "https";

  return fetch(proxyUrl.href, {
    method: "POST",
    headers: req.headers,
    body: req.body,
    // @ts-expect-error ignore type error
    duplex: "half",
  }).catch((err) => {
    console.error("Proxy Error:", err);

    return new Response(err?.message || "something went wrong", { status: 500 });
  });
}
