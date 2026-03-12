require("dotenv").config();
const express = require("express");
const https = require("https");
const path = require("path");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

function ytGet(endpoint, params) {
  return new Promise((resolve, reject) => {
    const qs = new URLSearchParams({ ...params, key: API_KEY }).toString();
    const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${qs}`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            resolve(parsed);
          }
        });
      })
      .on("error", reject);
  });
}

function parseInput(input) {
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

async function resolveChannelId(input) {
  const parsed = parseInput(input);
  if (parsed.type === "channelId") return parsed.value;

  if (parsed.type === "handle") {
    const data = await ytGet("channels", { forHandle: parsed.value.replace(/^@/, ""), part: "id" });
    if (data.items?.length > 0) return data.items[0].id;
  }
  if (parsed.type === "username") {
    const data = await ytGet("channels", { forUsername: parsed.value, part: "id" });
    if (data.items?.length > 0) return data.items[0].id;
  }
  if (parsed.type === "customUrl" || parsed.type === "handle") {
    const data = await ytGet("search", { q: parsed.value.replace(/^@/, ""), type: "channel", part: "snippet", maxResults: 1 });
    if (data.items?.length > 0) return data.items[0].snippet.channelId;
  }
  const data = await ytGet("search", { q: parsed.value, type: "channel", part: "snippet", maxResults: 1 });
  if (data.items?.length > 0) return data.items[0].snippet.channelId;
  throw new Error("채널을 찾을 수 없습니다.");
}

// Search channels by query, return multiple results
app.get("/api/search-channels", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "검색어를 입력해주세요." });
  if (!API_KEY) return res.status(500).json({ error: "YouTube API 키가 설정되지 않았습니다." });

  try {
    const parsed = parseInput(query);

    // If it's a direct channel ID or handle, try to resolve directly
    if (parsed.type === "channelId") {
      const data = await ytGet("channels", { id: parsed.value, part: "snippet,statistics" });
      if (data.items?.length) {
        const ch = data.items[0];
        return res.json([{
          channelId: ch.id,
          title: ch.snippet.title,
          thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
          subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
          videoCount: parseInt(ch.statistics.videoCount || "0", 10),
        }]);
      }
    }

    if (parsed.type === "handle") {
      const data = await ytGet("channels", { forHandle: parsed.value.replace(/^@/, ""), part: "snippet,statistics" });
      if (data.items?.length) {
        const ch = data.items[0];
        return res.json([{
          channelId: ch.id,
          title: ch.snippet.title,
          thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
          subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
          videoCount: parseInt(ch.statistics.videoCount || "0", 10),
        }]);
      }
    }

    // Search for channels
    const searchData = await ytGet("search", {
      q: parsed.value.replace(/^@/, ""),
      type: "channel",
      part: "snippet",
      maxResults: 5,
    });

    if (!searchData.items?.length) return res.json([]);

    // Get detailed info for all found channels
    const ids = searchData.items.map((i) => i.snippet.channelId).join(",");
    const details = await ytGet("channels", { id: ids, part: "snippet,statistics" });

    const results = details.items.map((ch) => ({
      channelId: ch.id,
      title: ch.snippet.title,
      thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
      subscriberCount: parseInt(ch.statistics.subscriberCount || "0", 10),
      videoCount: parseInt(ch.statistics.videoCount || "0", 10),
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get channel info by channelId
app.get("/api/channel", async (req, res) => {
  const channelId = req.query.id;
  if (!channelId) return res.status(400).json({ error: "channelId가 필요합니다." });
  if (!API_KEY) return res.status(500).json({ error: "YouTube API 키가 설정되지 않았습니다." });

  try {
    const data = await ytGet("channels", {
      id: channelId,
      part: "contentDetails,snippet,statistics",
    });
    if (!data.items?.length) throw new Error("채널 정보를 가져올 수 없습니다.");

    const ch = data.items[0];
    const uploadsPlaylistId = ch.contentDetails.relatedPlaylists.uploads;
    const videoCount = parseInt(ch.statistics.videoCount, 10);

    // Get channel playlists
    const playlists = [];
    let pageToken = undefined;
    while (true) {
      const params = { channelId, part: "snippet,contentDetails", maxResults: 50 };
      if (pageToken) params.pageToken = pageToken;
      const plData = await ytGet("playlists", params);
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

    res.json({
      channelId,
      channelTitle: ch.snippet.title,
      thumbnail: (ch.snippet.thumbnails.medium || ch.snippet.thumbnails.default).url,
      videoCount,
      uploadsPlaylistId,
      playlists,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// In-memory cache: playlistId -> { videos, timestamp }
const videoCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function getAllVideos(playlistId) {
  const cached = videoCache.get(playlistId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.videos;
  }

  const videos = [];
  let pageToken = undefined;
  while (true) {
    const params = { playlistId, part: "snippet", maxResults: 50 };
    if (pageToken) params.pageToken = pageToken;
    const data = await ytGet("playlistItems", params);
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

async function fetchTranscript(videoId) {
  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, { lang: "ko" });
    if (items.length > 0) return items.map((i) => i.text).join(" ");
    // fallback to any language
    const fallback = await YoutubeTranscript.fetchTranscript(videoId);
    return fallback.map((i) => i.text).join(" ");
  } catch {
    return "";
  }
}

const csvHeaders = {
  en: { title: "Title", url: "Link", date: "Upload Date", transcript: "Transcript" },
  zh: { title: "标题", url: "链接", date: "上传日期", transcript: "字幕" },
  hi: { title: "शीर्षक", url: "लिंक", date: "अपलोड तिथि", transcript: "उपशीर्षक" },
  es: { title: "Título", url: "Enlace", date: "Fecha", transcript: "Subtítulos" },
  fr: { title: "Titre", url: "Lien", date: "Date", transcript: "Sous-titres" },
  ar: { title: "العنوان", url: "الرابط", date: "التاريخ", transcript: "الترجمة" },
  bn: { title: "শিরোনাম", url: "লিংক", date: "তারিখ", transcript: "সাবটাইটেল" },
  pt: { title: "Título", url: "Link", date: "Data", transcript: "Legendas" },
  ru: { title: "Название", url: "Ссылка", date: "Дата", transcript: "Субтитры" },
  ja: { title: "タイトル", url: "リンク", date: "公開日", transcript: "字幕" },
  de: { title: "Titel", url: "Link", date: "Datum", transcript: "Untertitel" },
  ko: { title: "제목", url: "링크", date: "업로드일", transcript: "자막" },
  tr: { title: "Başlık", url: "Bağlantı", date: "Tarih", transcript: "Altyazı" },
  vi: { title: "Tiêu đề", url: "Liên kết", date: "Ngày", transcript: "Phụ đề" },
  it: { title: "Titolo", url: "Link", date: "Data", transcript: "Sottotitoli" },
  th: { title: "ชื่อ", url: "ลิงก์", date: "วันที่", transcript: "คำบรรยาย" },
  pl: { title: "Tytuł", url: "Link", date: "Data", transcript: "Napisy" },
  nl: { title: "Titel", url: "Link", date: "Datum", transcript: "Ondertitels" },
  id: { title: "Judul", url: "Tautan", date: "Tanggal", transcript: "Subtitle" },
  tl: { title: "Pamagat", url: "Link", date: "Petsa", transcript: "Subtitle" },
};

function toCsv(videos, cols, lang) {
  if (cols.length === 1 && cols[0] === "url") {
    return videos.map((v) => v.url).join("\n");
  }
  if (cols.length === 1 && cols[0] === "transcript") {
    return videos
      .filter((v) => v.transcript)
      .map((v) => `[${v.title}]\n${v.transcript}`)
      .join("\n\n---\n\n");
  }
  const h = csvHeaders[lang] || csvHeaders.en;
  const colMap = {
    title: { header: h.title, value: (v) => `"${v.title.replace(/"/g, '""')}"` },
    url: { header: h.url, value: (v) => `"${v.url}"` },
    date: { header: h.date, value: (v) => `"${v.publishedAt.slice(0, 10)}"` },
    transcript: { header: h.transcript, value: (v) => `"${(v.transcript || "").replace(/"/g, '""')}"` },
  };
  const selected = cols.filter((c) => colMap[c]);
  const header = selected.map((c) => colMap[c].header).join(",");
  const rows = videos.map((v) => selected.map((c) => colMap[c].value(v)).join(","));
  return "\uFEFF" + header + "\n" + rows.join("\n");
}

// Search videos within a channel by keywords, return matching videos + related keyword suggestions
app.get("/api/filter-videos", async (req, res) => {
  const playlistId = req.query.playlistId;
  const keywords = req.query.keywords;
  if (!playlistId || !keywords) return res.status(400).json({ error: "playlistId and keywords required." });

  try {
    const allVideos = await getAllVideos(playlistId);
    const kwList = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);

    const matched = allVideos.filter((v) => {
      const title = v.title.toLowerCase();
      return kwList.some((kw) => title.includes(kw));
    });

    // Extract related keywords from matched video titles
    const stopWords = new Set([
      // Korean common
      "의","가","이","은","는","을","를","에","와","과","도","로","으로","에서","까지","부터","만","보다","처럼",
      "것","수","등","중","때","더","안","못","잘","꼭","다","한","할","하는","된","한다","합니다","하기","있는",
      // English common
      "the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did",
      "will","would","could","should","may","might","can","shall","to","of","in","for","on","with","at",
      "by","from","as","into","through","during","before","after","above","below","between","out","off",
      "up","down","and","but","or","nor","not","no","so","if","then","than","too","very","just","about",
      "how","what","when","where","who","which","why","all","each","every","both","few","more","most",
      "other","some","such","only","own","same","that","this","these","those","i","me","my","we","our",
      "you","your","he","him","his","she","her","it","its","they","them","their",
      // common video title words
      "ep","part","vol","vs","ft","feat","official","video","mv","teaser","trailer",
      "|","—","-","#","!","?","~","/","(",")","[","]",
    ]);

    const wordFreq = {};
    const kwSet = new Set(kwList);

    for (const v of matched) {
      // Split on whitespace and common delimiters, keep meaningful words
      const words = v.title
        .replace(/[|—\-#!?~\/\(\)\[\]「」『』【】《》]/g, " ")
        .split(/\s+/)
        .map((w) => w.toLowerCase().replace(/^['"]+|['",.!?]+$/g, ""))
        .filter((w) => w.length >= 2 && !stopWords.has(w) && !kwSet.has(w) && !/^\d+$/.test(w));

      for (const w of words) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    }

    // Sort by frequency, take top 5
    const relatedKeywords = Object.entries(wordFreq)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);

    res.json({
      matched: matched.map((v) => ({ title: v.title, url: v.url, publishedAt: v.publishedAt })),
      relatedKeywords,
      totalMatched: matched.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/videos", async (req, res) => {
  const playlistId = req.query.playlistId;
  if (!playlistId) return res.status(400).json({ error: "playlistId가 필요합니다." });
  if (!API_KEY) return res.status(500).json({ error: "YouTube API 키가 설정되지 않았습니다." });

  try {
    let videos = await getAllVideos(playlistId);

    // Filter by keywords if provided
    const keywords = req.query.keywords;
    if (keywords) {
      const kwList = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
      videos = videos.filter((v) => {
        const title = v.title.toLowerCase();
        return kwList.some((kw) => title.includes(kw));
      });
    }

    const cols = (req.query.cols || "title,url,date").split(",");

    if (cols.includes("transcript")) {
      for (let i = 0; i < videos.length; i++) {
        const videoId = videos[i].url.split("v=")[1];
        videos[i].transcript = await fetchTranscript(videoId);
      }
    }

    const csvLang = req.query.lang || "en";
    const csv = toCsv(videos, cols, csvLang);

    const name = req.query.name || "videos";
    const filename = `${name.replace(/[^a-zA-Z0-9가-힣]/g, "_")}_videos.csv`;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
    res.setHeader("X-Video-Count", videos.length);
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST: download only selected videos by URL list
app.post("/api/videos", async (req, res) => {
  const { playlistId, cols: colsStr, name, lang: csvLang, videoUrls } = req.body;
  if (!playlistId || !videoUrls) return res.status(400).json({ error: "Missing parameters." });
  if (!API_KEY) return res.status(500).json({ error: "YouTube API key not set." });

  try {
    const allVideos = await getAllVideos(playlistId);
    const urlSet = new Set(videoUrls);
    let videos = allVideos.filter((v) => urlSet.has(v.url));

    const cols = (colsStr || "title,url,date").split(",");

    if (cols.includes("transcript")) {
      for (let i = 0; i < videos.length; i++) {
        const videoId = videos[i].url.split("v=")[1];
        videos[i].transcript = await fetchTranscript(videoId);
      }
    }

    const csv = toCsv(videos, cols, csvLang || "en");

    const filename = `${(name || "videos").replace(/[^a-zA-Z0-9가-힣]/g, "_")}_videos.csv`;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(filename)}"`);
    res.setHeader("X-Video-Count", videos.length);
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
