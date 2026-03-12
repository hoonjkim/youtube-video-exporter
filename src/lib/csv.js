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

export function toCsv(videos, cols, lang) {
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
