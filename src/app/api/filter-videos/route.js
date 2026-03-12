import { NextResponse } from "next/server";
import { getAllVideos } from "@/lib/youtube";

const stopWords = new Set([
  "의","가","이","은","는","을","를","에","와","과","도","로","으로","에서","까지","부터","만","보다","처럼",
  "것","수","등","중","때","더","안","못","잘","꼭","다","한","할","하는","된","한다","합니다","하기","있는",
  "the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did",
  "will","would","could","should","may","might","can","shall","to","of","in","for","on","with","at",
  "by","from","as","into","through","during","before","after","above","below","between","out","off",
  "up","down","and","but","or","nor","not","no","so","if","then","than","too","very","just","about",
  "how","what","when","where","who","which","why","all","each","every","both","few","more","most",
  "other","some","such","only","own","same","that","this","these","those","i","me","my","we","our",
  "you","your","he","him","his","she","her","it","its","they","them","their",
  "ep","part","vol","vs","ft","feat","official","video","mv","teaser","trailer",
  "|","—","-","#","!","?","~","/","(",")","[","]",
]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("playlistId");
  const keywords = searchParams.get("keywords");
  if (!playlistId || !keywords) return NextResponse.json({ error: "playlistId and keywords required." }, { status: 400 });

  try {
    const allVideos = await getAllVideos(playlistId);
    const kwList = keywords.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);

    const matched = allVideos.filter((v) => {
      const title = v.title.toLowerCase();
      return kwList.some((kw) => title.includes(kw));
    });

    const kwSet = new Set(kwList);
    const wordFreq = {};

    for (const v of matched) {
      const words = v.title
        .replace(/[|—\-#!?~\/\(\)\[\]「」『』【】《》]/g, " ")
        .split(/\s+/)
        .map((w) => w.toLowerCase().replace(/^['"]+|['",.!?]+$/g, ""))
        .filter((w) => w.length >= 2 && !stopWords.has(w) && !kwSet.has(w) && !/^\d+$/.test(w));

      for (const w of words) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    }

    const relatedKeywords = Object.entries(wordFreq)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);

    return NextResponse.json({
      matched: matched.map((v) => ({ title: v.title, url: v.url, publishedAt: v.publishedAt })),
      relatedKeywords,
      totalMatched: matched.length,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
