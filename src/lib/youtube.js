import { YoutubeTranscript } from "youtube-transcript";

const API_KEY = process.env.YOUTUBE_API_KEY;

// Persistent cache across requests (works in long-running Node.js process)
const globalForCache = globalThis;
if (!globalForCache.videoCache) {
  globalForCache.videoCache = new Map();
}
const videoCache = globalForCache.videoCache;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function ytFetch(endpoint, params) {
  const qs = new URLSearchParams({ ...params, key: API_KEY }).toString();
  const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

export function parseInput(input) {
  input = input.trim();
  if (/^@[\w.-]+$/.test(input)) return { type: "handle", value: input };
  try {
    const url = new URL(input);
    if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) {
      return { type: "search", value: input };
    }
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "channel" && parts[1]) return { type: "channelId", value: parts[1] };
    if (parts[0] === "c" && parts[1]) return { type: "customUrl", value: parts[1] };
    if (parts[0] === "user" && parts[1]) return { type: "username", value: parts[1] };
    if (parts[0]?.startsWith("@")) return { type: "handle", value: parts[0] };
    return { type: "search", value: input };
  } catch {
    return { type: "search", value: input };
  }
}

export async function getAllVideos(playlistId) {
  const cached = videoCache.get(playlistId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.videos;
  }

  const videos = [];
  let pageToken = undefined;
  while (true) {
    const params = { playlistId, part: "snippet", maxResults: "50" };
    if (pageToken) params.pageToken = pageToken;
    const data = await ytFetch("playlistItems", params);
    for (const item of data.items) {
      const title = item.snippet.title;
      if (title === "Deleted video" || title === "Private video") continue;
      videos.push({
        title,
        url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
        publishedAt: item.snippet.publishedAt,
      });
    }
    if (data.nextPageToken) {
      pageToken = data.nextPageToken;
    } else {
      break;
    }
  }

  videoCache.set(playlistId, { videos, timestamp: Date.now() });
  return videos;
}

export async function fetchTranscript(videoId) {
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, { lang: "ko" });
    if (items.length > 0) return items.map((i) => i.text).join(" ");
    const fallback = await YoutubeTranscript.fetchTranscript(videoId);
    return fallback.map((i) => i.text).join(" ");
  } catch {
    return "";
  }
}
