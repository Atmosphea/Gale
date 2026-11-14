/* Textual Reverie — library store (PRODUCTION).
   No bundled sample books. The library fills from the user's own pasted texts,
   which persist in localStorage under 'rv_books'. EPUB / PDF import arrives in a
   later version; chapter / page-number / running-header detection already runs on
   pasted text via REVERIE_STRUCTURE below. */
window.REVERIE_BOOKS = [];

/* Tone colours assigned round-robin to new books so columns stay distinct. */
window.REVERIE_COLORS = ['#6c5a86', '#2e5a6b', '#4a6b3f', '#7a4a4a', '#8a6b3a', '#55607a', '#3f6b5a', '#5a6b48'];

/* ============================================================================
   STRUCTURE DETECTION  (chapters · page numbers · running headers)
   Heuristic, format-agnostic. Works on plain text today; the same entry points
   will be fed EPUB spine text and PDF page text in the next version.
   ========================================================================== */
window.REVERIE_STRUCTURE = (function () {
  const NUMWORDS = { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,
    eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,
    nineteen:19,twenty:20,thirty:30,forty:40,fifty:50 };

  function roman(s) {
    const m = { i:1, v:5, x:10, l:50, c:100, d:500, m:1000 }; s = s.toLowerCase();
    if (!/^[ivxlcdm]+$/.test(s)) return null;
    let n = 0; for (let i = 0; i < s.length; i++) { const a = m[s[i]], b = m[s[i+1]]; n += (b && a < b) ? -a : a; }
    return n || null;
  }
  function chapterNum(line) {
    let mm = line.match(/^\s*(?:chapter|chap\.?|book|part|section|canto)\s+([0-9]+|[ivxlcdm]+|[a-z]+)\b/i);
    if (mm) { const t = mm[1].toLowerCase(); return /^[0-9]+$/.test(t) ? parseInt(t, 10) : (NUMWORDS[t] || roman(t)); }
    mm = line.match(/^\s*([0-9]{1,3})\s*[.\u2014\-:]\s+\S/);       // "12.  Title"  /  "3 — Title"
    if (mm) return parseInt(mm[1], 10);
    mm = line.match(/^\s*([0-9]{1,3})\s*$/);                        // a lone number line
    if (mm) return parseInt(mm[1], 10);
    return null;
  }
  // Title Case / ALL CAPS short standalone line that reads like a heading.
  function looksLikeHeading(line) {
    const words = line.trim().split(/\s+/);
    if (!words.length || words.length > 9) return false;
    if (/[.!?,;:]$/.test(line.trim())) return false;
    const alpha = words.filter(w => /[a-z]/i.test(w));
    if (!alpha.length) return false;
    const allCaps = alpha.every(w => w === w.toUpperCase());
    const titleCase = alpha.filter(w => /^[A-Z]/.test(w)).length / alpha.length >= 0.7;
    return allCaps || titleCase;
  }

  /* #6 FRONT / BACK MATTER classifier. A heading whose title names a structural non-story
     section is tagged so the compass + index don't count it toward reading chapters. */
  const KW_RE = /^\s*(chapter|chap\.?|book|part|section|canto|volume|prologue|epilogue|interlude|preface|foreword|introduction|afterword|appendix|acknowledg(e?)ments?|conclusion|epigraph|dedication|glossary|notes|bibliography|index)\b/i;
  const FRONT_RE = /^(?:title\s*page|half[\s-]?title|copyright|colophon|dedication|epigraph|table of contents|contents|frontispiece|list of (?:illustrations|figures|tables|plates)|note on the text|(?:translator|author|editor)'?s? note|foreword|preface|prologue|introduction|also by|by the same author|praise for)\b/i;
  const BACK_RE = /^(?:epilogue|afterword|postscript|appendix(?:es|ices)?|addendum|glossary|end ?notes|foot ?notes|notes|bibliography|works cited|references|further reading|index|acknowledge?ments?|about the author|about the type|a note (?:about|on) the (?:author|type)|credits|permissions|copyright|colophon|discussion questions|reading group guide|questions for discussion)\b/i;
  function matterType(title) {
    const t = (title || '').trim();
    if (!t) return null;
    if (BACK_RE.test(t)) return 'back';
    if (FRONT_RE.test(t)) return 'front';
    return null;
  }

  /* #1 MULTI-SIGNAL heading score. Blocks are already blank-line-delimited (standalone), so
     we combine keyword, numbering, brevity, casing and punctuation into one score instead of
     relying on any single rule — far fewer false positives (mid-prose "chapter" mentions,
     long paragraphs) and false negatives (unlabeled title-case section heads). */
  function headingScore(firstLine, joined) {
    const line = (firstLine || '').trim();
    if (!line) return 0;
    const wc = line.split(/\s+/).length;
    let s = 0;
    if (KW_RE.test(line) && line.length < 60) s += 3;
    if (chapterNum(line) != null) s += 2;
    if (wc <= 6) s += 1;
    if (wc <= 9) s += 1;
    const alpha = line.split(/\s+/).filter(w => /[a-z]/i.test(w));
    if (alpha.length) {
      const allCaps = alpha.every(w => w === w.toUpperCase());
      const titleC = alpha.filter(w => /^[A-Z]/.test(w)).length / alpha.length >= 0.7;
      if (allCaps && line.length < 60) s += 2; else if (titleC) s += 1;
    }
    if (/[.!?,;:—]$/.test(line)) s -= 3;          // ends like a sentence → not a heading
    if ((joined || '').length > 120) s -= 2;         // a full body block, not a heading
    if (wc > 12) s -= 2;
    return s;
  }
  // Proper hierarchy + casing for display.
  function titleCase(s) {
    const small = new Set(['a','an','the','and','but','or','for','nor','of','to','in','on','at','by','with','from','as','is']);
    const words = s.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');
    return words.map((w, i) => (i > 0 && i < words.length - 1 && small.has(w)) ? w : (w.charAt(0).toUpperCase() + w.slice(1))).join(' ');
  }

  /* Detect lines repeated near the top of "pages" (every few paragraphs) -> running header. */
  function detectRunningHeader(paras) {
    const counts = {};
    paras.forEach(p => { const first = p.split('\n')[0].trim(); if (first.length > 3 && first.length < 60 && first.split(/\s+/).length <= 8) counts[first] = (counts[first] || 0) + 1; });
    let best = null, bestN = 0;
    for (const k in counts) if (counts[k] > bestN) { bestN = counts[k]; best = k; }
    return (bestN >= 3) ? best : null;
  }

  /* MAIN: returns { paras, chapters, header } and annotates page numbers inline. */
  function analyze(rawText) {
    const text = rawText.replace(/\r/g, '');
    let blocks = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
    const header = detectRunningHeader(blocks);
    const chapters = [];
    const paras = [];            // {text, pageNo|null, isHeading, headingTitle, headingNum}
    let lastNum = null, incrementing = 0;

    const soloPageParas = [];   // paragraphs that are JUST a bare number (own block) — pruned once we confirm real pagination

    blocks.forEach(block => {
      let lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      // strip a running header that leads the block
      if (header && lines[0] === header) lines.shift();
      // a block that is nothing but a single lone number (its own paragraph, not
      // attached to any text) is almost always an EPUB/PDF page marker — hold it
      // aside rather than letting the raw digits leak into the reading experience.
      if (lines.length === 1 && /^\s*[0-9]{1,4}\s*$/.test(lines[0])) {
        const n = parseInt(lines[0], 10);
        if (lastNum != null && n === lastNum + 1) incrementing++;
        lastNum = n;
        soloPageParas.push({ afterIndex: paras.length - 1, pageNo: n });
        return;
      }
      // pull a trailing/leading lone page number out to the edge
      let pageNo = null;
      if (lines.length) {
        const l0 = lines[0], lN = lines[lines.length - 1];
        const mTop = /^\s*[0-9]{1,4}\s*$/.test(l0), mBot = /^\s*[0-9]{1,4}\s*$/.test(lN);
        if (mBot && lines.length > 1) { pageNo = parseInt(lN, 10); lines.pop(); }
        else if (mTop && lines.length > 1) { pageNo = parseInt(l0, 10); lines.shift(); }
      }
      if (pageNo != null) { if (lastNum != null && pageNo === lastNum + 1) incrementing++; lastNum = pageNo; }
      let joined = lines.join(' ').trim();
      if (!joined) { if (pageNo != null) { if (paras.length) paras[paras.length - 1].pageNo = pageNo; } return; }

      // ---- heading / chapter detection, run against the FIRST LINE so a keyword like
      // "Introduction" is still caught even when the EPUB glued the heading and its body
      // paragraph into one block with no blank line between them. ----
      const firstLine = lines[0];
      const kwOnFirst = KW_RE.test(firstLine) && firstLine.length < 60;
      const num = chapterNum(joined.length < 70 ? joined : firstLine);
      // #1 multi-signal score decides borderline cases; keyword/number rules still force-accept.
      const hScore = headingScore(firstLine, joined);
      let isHead = (num != null && joined.length < 80) || (joined.length < 60 && looksLikeHeading(joined)) || kwOnFirst || hScore >= 3;
      const kwChapter = kwOnFirst || (KW_RE.test(joined) && joined.length < 90);
      const numTitled = /^\s*([0-9]{1,3}|[mdclxvi]+)\s*[.\u2014:\-]\s+\S/i.test(firstLine);   // "12. Title" / "IV — Title"
      const isChapter = kwChapter || (numTitled && joined.length < 90) || (isHead && hScore >= 4 && joined.length < 70);

      if (isHead && lines.length > 1 && (kwOnFirst || firstLine.length < 60) && joined.length >= 80) {
        // heading + body glued into one block with no blank line — split them so the
        // heading still renders (and indexes) as its own paragraph, body stays intact.
        const headingLine = firstLine;
        const bodyText = lines.slice(1).join(' ').trim();
        let title = headingLine.replace(KW_RE, '').replace(/^\s*([0-9]+|[ivxlcdm]+|[a-z]+)?\b[\s.:\u2014-]*/i, '').trim();
        if (!title) title = headingLine;
        const mt = matterType(headingLine) || matterType(title);
        const pIndex = paras.length;
        paras.push({ text: headingLine, pageNo, isHeading: true, headingNum: num, headingTitle: titleCase(title), matter: mt });
        if (isChapter) chapters.push({ paraIndex: pIndex, num: num, title: titleCase(title), matter: mt });
        if (bodyText) paras.push({ text: bodyText, pageNo: null, isHeading: false });
      } else if (isHead) {
        // a numbered line followed by a title on the next line -> combine
        let title = joined.replace(/^\s*(?:chapter|chap\.?|book|part|section|canto|volume|prologue|epilogue|interlude|preface|foreword|introduction|afterword|appendix|acknowledg(?:e?)ments?|conclusion)\s*([0-9]+|[ivxlcdm]+|[a-z]+)?\b[\s.:\u2014-]*/i, '').trim();
        // keyword-only front/back-matter headings keep the keyword itself as the title
        if (!title && kwChapter && num == null) title = joined;
        if (!title && lines.length > 1) title = lines.slice(1).join(' ');
        const finalTitle = title ? titleCase(title) : (num != null ? ('Chapter ' + num) : titleCase(joined));
        const mt = matterType(joined) || matterType(finalTitle);
        const pIndex = paras.length;
        paras.push({ text: joined, pageNo, isHeading: true, headingNum: num, headingTitle: finalTitle, matter: mt });
        if (isChapter) chapters.push({ paraIndex: pIndex, num: num, title: title ? titleCase(title) : null, matter: mt });
      } else {
        paras.push({ text: joined, pageNo, isHeading: false });
      }
    });

    // Only trust page numbers if they actually increment across the document.
    const hasPages = incrementing >= 2;
    if (!hasPages) {
      paras.forEach(p => p.pageNo = null);
      // no real pagination detected — these bare-number blocks were probably real content
      // (a numbered list etc.), so put them back rather than silently dropping text.
      soloPageParas.slice().reverse().forEach(sp => {
        paras.splice(sp.afterIndex + 1, 0, { text: String(sp.pageNo), pageNo: null, isHeading: false });
      });
    } else {
      // real pagination — attach each page number to the paragraph it followed, no stray digits shown.
      soloPageParas.forEach(sp => { if (sp.afterIndex >= 0 && paras[sp.afterIndex]) paras[sp.afterIndex].pageNo = sp.pageNo; });
    }

    return { paras, chapters, header: header, hasPages: hasPages };
  }

  return { analyze, titleCase, chapterNum, matterType };
})();
