import { NextResponse } from "next/server";
import { ytFetch } from "@/lib/youtube";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get("id");
  if (!channelId) return NextResponse.json({ error: "channelId required." }, { status: 400 });
  if (!process.env.YOUTUBE_API_KEY) return NextResponse.json({ error: "YouTube API key not set." }, { status: 500 });

  try {
    const data = await ytFetch("channels", {
      id: channelId,
      part: "contentDetails,snippet,statistics",
    });
    if (!data.items?.length) throw new Error("Channel not found.");

    const ch = data.items[0];
    const uploadsPlaylistId = ch.contentDetails.relatedPlaylists.uploads;
    const videoCount = parseInt(ch.statistics.videoCount, 10);

    const playlists = [];
    let pageToken = undefined;
    while (true) {
      const params = { channelId, part: "snippet,contentDetails", maxResults: "50" };
      if (pageToken) params.pageToken = pageToken;
      const plData = await ytFetch("playlists", params);
      for (const item of plData.items) {
        playlists.push({
          id: item.id,
          title: item.snippet.title,
          count: item.contentDetails.itemCount,
        });
      }
      if (plData.nextPageToken) {
        pageToken = plData.nextPageToken;
      } else {
        break;
      }
    }

    return NextResponse.json({
      channelId,
      channelTitle: ch.snippet.title,
      thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
      videoCount,
      uploadsPlaylistId,
      playlists,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
