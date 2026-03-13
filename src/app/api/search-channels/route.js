import { NextResponse } from "next/server";
import { ytFetch, parseInput } from "@/lib/youtube";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  if (!query) return NextResponse.json({ error: "Query required." }, { status: 400 });
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json({ error: "YouTube API key not set." }, { status: 500 });

  try {
    const parsed = parseInput(query);

    if (parsed.type === "channelId") {
      const data = await ytFetch("channels", { id: parsed.value, part: "snippet,statistics" });
      if (data.items?.length) {
        const ch = data.items[0];
        return NextResponse.json([{
          channelId: ch.id,
          title: ch.snippet.title,
          thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
          subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
          videoCount: parseInt(ch.statistics.videoCount || "0", 10),
        }]);
      }
    }

    if (parsed.type === "handle") {
      const data = await ytFetch("channels", { forHandle: parsed.value.replace(/^@/, ""), part: "snippet,statistics" });
      if (data.items?.length) {
        const ch = data.items[0];
        return NextResponse.json([{
          channelId: ch.id,
          title: ch.snippet.title,
          thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
          subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
          videoCount: parseInt(ch.statistics.videoCount || "0", 10),
        }]);
      }
    }

    const searchParams2 = {
      q: parsed.value.replace(/^@/, ""),
      type: "channel",
      part: "snippet",
      maxResults: searchParams.get("limit") || "5",
    };
    const langParam = searchParams.get("lang");
    if (langParam) searchParams2.relevanceLanguage = langParam;
    const searchData = await ytFetch("search", searchParams2);

    if (!searchData.items?.length) return NextResponse.json([]);

    const ids = searchData.items.map((i) => i.snippet.channelId).join(",");
    const details = await ytFetch("channels", { id: ids, part: "snippet,statistics" });

    const results = details.items.map((ch) => ({
      channelId: ch.id,
      title: ch.snippet.title,
      thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
      subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
      videoCount: parseInt(ch.statistics.videoCount || "0", 10),
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
