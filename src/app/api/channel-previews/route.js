import { NextResponse } from "next/server";
import { ytFetch } from "@/lib/youtube";

const previewCache = globalThis.__previewCache || (globalThis.__previewCache = new Map());
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const handles = (searchParams.get("handles") || "").split(",").filter(Boolean);
  if (!handles.length) return NextResponse.json([]);
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json([]);

  const results = [];

  await Promise.all(
    handles.map(async (handle) => {
      const cached = previewCache.get(handle);
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        results.push(cached.data);
        return;
      }

      try {
        const data = await ytFetch("channels", {
          forHandle: handle.replace(/^@/, ""),
          part: "snippet",
        });

        if (data.items?.[0]) {
          const ch = data.items[0];
          const info = {
            handle,
            thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
          };
          previewCache.set(handle, { data: info, ts: Date.now() });
          results.push(info);
        }
      } catch {
        // skip failed handles
      }
    })
  );

  return NextResponse.json(results);
}
