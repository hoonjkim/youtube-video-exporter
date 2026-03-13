import { NextResponse } from "next/server";
import { ytFetch, parseInput } from "@/lib/youtube";

const previewCache = globalThis.__previewCache || (globalThis.__previewCache = new Map());
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getThumbnail(ch) {
  return (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url;
}

async function resolveChannel(query) {
  const parsed = parseInput(query);

  // Channel ID — direct lookup (1 quota unit)
  if (parsed.type === "channelId") {
    const data = await ytFetch("channels", { id: parsed.value, part: "snippet" });
    if (data.items?.[0]) return getThumbnail(data.items[0]);
  }

  // Handle — direct lookup (1 quota unit)
  if (parsed.type === "handle") {
    const data = await ytFetch("channels", {
      forHandle: parsed.value.replace(/^@/, ""),
      part: "snippet",
    });
    if (data.items?.[0]) return getThumbnail(data.items[0]);
  }

  // Fallback — search (100 quota units, but cached 24h)
  const data = await ytFetch("search", {
    q: parsed.value,
    type: "channel",
    part: "snippet",
    maxResults: "1",
  });
  if (data.items?.[0]) {
    return data.items[0].snippet.thumbnails?.medium?.url
      || data.items[0].snippet.thumbnails?.default?.url || "";
  }
  return "";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const queries = (searchParams.get("queries") || "").split("|||").filter(Boolean);
  if (!queries.length) return NextResponse.json([]);
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json([]);

  const results = [];

  await Promise.all(
    queries.map(async (query) => {
      const cached = previewCache.get(query);
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        results.push(cached.data);
        return;
      }

      try {
        const thumbnail = await resolveChannel(query);
        const info = { query, thumbnail };
        previewCache.set(query, { data: info, ts: Date.now() });
        results.push(info);
      } catch {
        results.push({ query, thumbnail: "" });
      }
    })
  );

  return NextResponse.json(results);
}
