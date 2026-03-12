import { NextResponse } from "next/server";
import { getAllVideos, fetchTranscript } from "@/lib/youtube";
import { toCsv } from "@/lib/csv";

async function processVideos(playlistId, cols, keywords, csvLang, name, videoUrls) {
  let videos = await getAllVideos(playlistId);

  if (videoUrls) {
    const urlSet = new Set(videoUrls);
    videos = videos.filter((v) => urlSet.has(v.url));
  } else if (keywords) {
    const kwList = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    videos = videos.filter((v) => {
      const title = v.title.toLowerCase();
      return kwList.some((kw) => title.includes(kw));
    });
  }

  if (cols.includes("transcript")) {
    for (let i = 0; i < videos.length; i++) {
      const videoId = videos[i].url.split("v=")[1];
      videos[i] = { ...videos[i], transcript: await fetchTranscript(videoId) };
    }
  }

  const csv = toCsv(videos, cols, csvLang);
  const filename = `${(name || "videos").replace(/[^a-zA-Z0-9가-힣]/g, "_")}_videos.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
      "X-Video-Count": String(videos.length),
    },
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("playlistId");
  if (!playlistId) return NextResponse.json({ error: "playlistId required." }, { status: 400 });
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json({ error: "YouTube API key not set." }, { status: 500 });

  try {
    const cols = (searchParams.get("cols") || "title,url,date").split(",");
    const keywords = searchParams.get("keywords");
    const csvLang = searchParams.get("lang") || "en";
    const name = searchParams.get("name") || "videos";
    return await processVideos(playlistId, cols, keywords, csvLang, name, null);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json({ error: "YouTube API key not set." }, { status: 500 });

  try {
    const body = await request.json();
    const { playlistId, cols: colsStr, name, lang: csvLang, videoUrls } = body;
    if (!playlistId || !videoUrls) return NextResponse.json({ error: "Missing parameters." }, { status: 400 });

    const cols = (colsStr || "title,url,date").split(",");
    return await processVideos(playlistId, cols, null, csvLang || "en", name, videoUrls);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
