"use client";

import { useState, useEffect, useCallback } from "react";
import { i18n, languages } from "@/lib/i18n";

function Avatar({ src, name }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return <div className="img-fallback">{(name || "?")[0]}</div>;
  }
  return <img src={src} alt="" referrerPolicy="no-referrer" onError={() => setErr(true)} />;
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [query, setQuery] = useState("");
  const [channels, setChannels] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState(new Set());
  const [columns, setColumns] = useState({ title: true, url: true, date: true, transcript: false });
  const [keyword, setKeyword] = useState("");
  const [matchedVideos, setMatchedVideos] = useState([]);
  const [checkedVideos, setCheckedVideos] = useState(new Set());
  const [activeKeywords, setActiveKeywords] = useState([]);
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [selectedRelatedKws, setSelectedRelatedKws] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("yt-exporter-lang");
    if (saved && i18n[saved]) setLang(saved);
  }, []);

  const t = useCallback((key, ...args) => {
    const val = i18n[lang]?.[key] || i18n.en[key];
    return typeof val === "function" ? val(...args) : val;
  }, [lang]);

  function changeLang(newLang) {
    setLang(newLang);
    localStorage.setItem("yt-exporter-lang", newLang);
  }

  function formatCount(n) {
    if (lang === "ko") {
      if (n >= 10000) return (n / 10000).toFixed(1) + "만";
      if (n >= 1000) return (n / 1000).toFixed(1) + "천";
    } else if (lang === "ja" || lang === "zh") {
      if (n >= 10000) return (n / 10000).toFixed(1) + "万";
    }
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  }

  function showStatus(type, message) {
    setStatus({ type, message });
  }

  function hideStatus() {
    setStatus(null);
  }

  async function searchChannel() {
    if (!query.trim()) { showStatus("error", t("enterQuery")); return; }
    setIsSearching(true);
    setChannelData(null);
    setChannels(null);
    showStatus("loading", t("searching"));

    try {
      const res = await fetch(`/api/search-channels?q=${encodeURIComponent(query.trim())}`);
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || t("unknownError")); }
      const results = await res.json();
      if (results.length === 0) { showStatus("error", t("noResults")); return; }
      if (results.length === 1) { await selectChannel(results[0].channelId); return; }
      setChannels(results);
      hideStatus();
    } catch (err) {
      showStatus("error", err.message);
    } finally {
      setIsSearching(false);
    }
  }

  async function selectChannel(channelId) {
    setChannels(null);
    doClearFilter();
    showStatus("loading", t("loadingChannel"));

    try {
      const res = await fetch(`/api/channel?id=${encodeURIComponent(channelId)}`);
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || t("unknownError")); }
      const data = await res.json();
      setChannelData(data);
      setSelectedPlaylists(new Set([data.uploadsPlaylistId]));
      hideStatus();
    } catch (err) {
      showStatus("error", err.message);
    }
  }

  function togglePlaylist(playlistId) {
    setSelectedPlaylists(prev => {
      const next = new Set(prev);
      if (next.has(playlistId)) next.delete(playlistId);
      else next.add(playlistId);
      return next;
    });
  }

  function toggleColumn(col) {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  }

  async function filterByKeyword() {
    if (!keyword.trim() || !channelData) return;
    setIsFiltering(true);
    setSelectedRelatedKws([]);
    const kw = keyword.trim();
    setActiveKeywords([kw]);
    showStatus("loading", t("filteringVideos"));

    try {
      const playlistId = [...selectedPlaylists][0] || channelData.uploadsPlaylistId;
      const res = await fetch(`/api/filter-videos?playlistId=${encodeURIComponent(playlistId)}&keywords=${encodeURIComponent(kw)}`);
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || t("unknownError")); }
      const data = await res.json();
      setMatchedVideos(data.matched);
      setCheckedVideos(new Set(data.matched.map(v => v.url)));
      setRelatedKeywords(data.relatedKeywords);
      setFilterStatus(t("filterResult", data.totalMatched, channelData.videoCount));
      hideStatus();
    } catch (err) {
      showStatus("error", err.message);
    } finally {
      setIsFiltering(false);
    }
  }

  async function toggleRelatedKw(kw) {
    const next = selectedRelatedKws.includes(kw)
      ? selectedRelatedKws.filter(k => k !== kw)
      : [...selectedRelatedKws, kw];
    setSelectedRelatedKws(next);

    const allKws = [keyword.trim(), ...next].filter(Boolean);
    setActiveKeywords(allKws);
    const playlistId = [...selectedPlaylists][0] || channelData.uploadsPlaylistId;

    try {
      const res = await fetch(`/api/filter-videos?playlistId=${encodeURIComponent(playlistId)}&keywords=${encodeURIComponent(allKws.join(","))}`);
      const data = await res.json();
      setMatchedVideos(data.matched);
      setCheckedVideos(new Set(data.matched.map(v => v.url)));
      setFilterStatus(t("filterResult", data.totalMatched, channelData.videoCount));
    } catch {}
  }

  function resetToHome() {
    setQuery("");
    setChannels(null);
    setChannelData(null);
    setSelectedPlaylists(new Set());
    setColumns({ title: true, url: true, date: true, transcript: false });
    setStatus(null);
    doClearFilter();
  }

  function doClearFilter() {
    setActiveKeywords([]);
    setMatchedVideos([]);
    setCheckedVideos(new Set());
    setKeyword("");
    setRelatedKeywords([]);
    setSelectedRelatedKws([]);
    setFilterStatus(null);
  }

  function toggleVideoCheck(url) {
    setCheckedVideos(prev => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  function toggleAllVideos(checked) {
    if (checked) {
      setCheckedVideos(new Set(matchedVideos.map(v => v.url)));
    } else {
      setCheckedVideos(new Set());
    }
  }

  async function downloadVideos() {
    if (selectedPlaylists.size === 0) { showStatus("error", t("selectColumn")); return; }
    const cols = Object.entries(columns).filter(([, v]) => v).map(([k]) => k);
    if (cols.length === 0) { showStatus("error", t("selectColumn")); return; }

    setIsDownloading(true);
    const hasTranscript = cols.includes("transcript");
    showStatus("loading", hasTranscript ? t("extractingTranscripts") : t("downloading"));

    try {
      let totalVideoCount = 0;
      const playlistEntries = getPlaylistEntries();

      for (const { id: playlistId, title: playlistTitle, isAll } of playlistEntries) {
        const name = isAll ? channelData.channelTitle : `${channelData.channelTitle}_${playlistTitle}`;
        const controller = new AbortController();
        const timeout = hasTranscript ? 600000 : 60000;
        const timer = setTimeout(() => controller.abort(), timeout);

        const useCheckedUrls = playlistEntries.length === 1 && matchedVideos.length > 0;
        let res;
        if (useCheckedUrls) {
          const videoUrls = [...checkedVideos];
          res = await fetch("/api/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ playlistId, cols: cols.join(","), name, lang, videoUrls }),
            signal: controller.signal,
          });
        } else {
          let url = `/api/videos?playlistId=${encodeURIComponent(playlistId)}&cols=${cols.join(",")}&name=${encodeURIComponent(name)}&lang=${lang}`;
          if (activeKeywords.length > 0) url += `&keywords=${encodeURIComponent(activeKeywords.join(","))}`;
          res = await fetch(url, { signal: controller.signal });
        }
        clearTimeout(timer);

        if (!res.ok) { const err = await res.json(); throw new Error(err.error || t("unknownError")); }

        const videoCount = parseInt(res.headers.get("X-Video-Count") || "0", 10);
        totalVideoCount += videoCount;
        const blob = await res.blob();

        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${name.replace(/[^a-zA-Z0-9가-힣]/g, "_")}_videos.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }

      showStatus("success", t("downloadComplete", totalVideoCount));
    } catch (err) {
      showStatus("error", err.message);
    } finally {
      setIsDownloading(false);
    }
  }

  function getPlaylistEntries() {
    if (!channelData) return [];
    return [...selectedPlaylists].map(id => {
      if (id === channelData.uploadsPlaylistId) {
        return { id, title: t("allVideos"), isAll: true };
      }
      const pl = channelData.playlists.find(p => p.id === id);
      return { id, title: pl?.title || "Playlist", isAll: false };
    });
  }

  return (
    <div className="container">
      <div className="top-bar">
        <select className="lang-select" value={lang} onChange={e => changeLang(e.target.value)}>
          {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </div>

      <h1 className="logo" onClick={resetToHome}>
        <span className="logo-icon">▶</span> YouTube Video Exporter
      </h1>
      <p className="subtitle">{t("subtitle")}</p>

      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && searchChannel()}
          placeholder={t("placeholder")}
        />
        <button onClick={searchChannel} disabled={isSearching}>
          {t("search")}
        </button>
      </div>

      <div className="examples" dangerouslySetInnerHTML={{ __html: t("examples") }} />

      {channels && (
        <div className="search-results-panel">
          <p style={{ color: "#aaa", fontSize: 13, marginBottom: 10 }}>{t("selectChannel")}</p>
          {channels.map(ch => (
            <div key={ch.channelId} className="channel-result" onClick={() => selectChannel(ch.channelId)}>
              <Avatar src={ch.thumbnail} name={ch.title} />
              <div className="ch-info">
                <div className="ch-name">{ch.title}</div>
                <div className="ch-stats">
                  {t("subscribers", formatCount(ch.subscriberCount))} · {t("videos", formatCount(ch.videoCount))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {channelData && (
        <div className="channel-panel">
          <a className="channel-header" href={`https://www.youtube.com/channel/${channelData.channelId}`} target="_blank" rel="noreferrer">
            <Avatar src={channelData.thumbnail} name={channelData.channelTitle} />
            <div className="info">
              <h2>{channelData.channelTitle}</h2>
              <span>{t("totalVideos", channelData.videoCount)}</span>
            </div>
          </a>

          <div className="playlist-list">
            <div className="playlist-item">
              <input
                type="checkbox"
                checked={selectedPlaylists.has(channelData.uploadsPlaylistId)}
                onChange={() => togglePlaylist(channelData.uploadsPlaylistId)}
              />
              <label onClick={() => togglePlaylist(channelData.uploadsPlaylistId)}>{t("allVideos")}</label>
              <span className="count">{channelData.videoCount}</span>
            </div>
            {channelData.playlists.map(pl => (
              <div key={pl.id} className="playlist-item">
                <input
                  type="checkbox"
                  checked={selectedPlaylists.has(pl.id)}
                  onChange={() => togglePlaylist(pl.id)}
                />
                <label onClick={() => togglePlaylist(pl.id)}>{pl.title}</label>
                <span className="count">{pl.count}</span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="search-box" style={{ marginBottom: 8 }}>
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && filterByKeyword()}
                placeholder={t("keywordPlaceholder")}
              />
              <button onClick={filterByKeyword} disabled={isFiltering} style={{ padding: "10px 16px", fontSize: 13 }}>
                {t("filter")}
              </button>
              {filterStatus && (
                <button onClick={doClearFilter} style={{ padding: "10px 16px", fontSize: 13, background: "#333" }}>
                  {t("clearFilter")}
                </button>
              )}
            </div>

            {relatedKeywords.length > 0 && (
              <div className="related-keywords">
                <span style={{ color: "#888", fontSize: 12 }}>{t("relatedLabel")}</span>
                {relatedKeywords.map(rk => (
                  <label
                    key={rk}
                    className={`kw-chip${selectedRelatedKws.includes(rk) ? " active" : ""}`}
                    onClick={() => toggleRelatedKw(rk)}
                  >
                    <input type="checkbox" checked={selectedRelatedKws.includes(rk)} readOnly />{rk}
                  </label>
                ))}
              </div>
            )}

            {filterStatus && (
              <div style={{ color: "#aaa", fontSize: 13, marginTop: 6 }}>{filterStatus}</div>
            )}

            {matchedVideos.length > 0 && (
              <div className="matched-videos">
                <div className="matched-header">
                  <span>{t("matchedCount", matchedVideos.length)}</span>
                  <span>
                    <a onClick={() => toggleAllVideos(true)}>{t("selectAll")}</a>
                    {" / "}
                    <a onClick={() => toggleAllVideos(false)}>{t("deselectAll")}</a>
                  </span>
                </div>
                {matchedVideos.map((v, i) => (
                  <div key={i} className="matched-item">
                    <input
                      type="checkbox"
                      checked={checkedVideos.has(v.url)}
                      onChange={() => toggleVideoCheck(v.url)}
                    />
                    <span className="v-title" title={v.title}>{v.title}</span>
                    <span className="v-date">{v.publishedAt.slice(0, 10)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="columns">
            <label>
              <input type="checkbox" checked={columns.title} onChange={() => toggleColumn("title")} />
              {t("colTitle")}
            </label>
            <label>
              <input type="checkbox" checked={columns.url} onChange={() => toggleColumn("url")} />
              {t("colUrl")}
            </label>
            <label>
              <input type="checkbox" checked={columns.date} onChange={() => toggleColumn("date")} />
              {t("colDate")}
            </label>
            <label>
              <input type="checkbox" checked={columns.transcript} onChange={() => toggleColumn("transcript")} />
              {t("colTranscript")}
            </label>
          </div>

          <button onClick={downloadVideos} disabled={isDownloading} style={{ width: "100%" }}>
            {t("download")}
          </button>
        </div>
      )}

      {status && (
        <div className={`status ${status.type}`}>
          {status.type === "loading" && <span className="spinner" />}
          {status.message}
        </div>
      )}
    </div>
  );
}
