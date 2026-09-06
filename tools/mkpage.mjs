import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const DIR = "D:/קלוד קוד my-workspace/תחיקת-הבניה-משחקים/10_blitot-game/";
const md = readFileSync(DIR + "tools/image-prompts.md", "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// שני בלוקי הסגנון
const styleScene = md.split("## בלוק סגנון א': סצנה")[1].split("```")[1].trim();
const styleSection = md.split("## בלוק סגנון ב': חתך")[1].split("```")[1].trim();

// המקרים
const cases = [];
for (const p of md.split(/^### /m).slice(1)) {
  const lines = p.split("\n");
  const head = lines[0].trim();
  const m = head.match(/^(\d+)\.\s*(.*)$/);
  if (!m) continue;
  const [, n, rest] = m;
  const bits = rest.split("·").map((s) => s.trim());
  const title = bits[0];
  const kind = /חתך/.test(rest) ? "section" : "scene";
  const status = /מאושרת/.test(rest) ? "ok" : /לשקול/.test(rest) ? "maybe" : "redo";
  const metaLine = (lines.find((l) => /התשובה:/.test(l)) || "").trim();
  const dim = metaLine.includes("·") ? metaLine.split("·")[0].replace(/^מידה שתסומן:|^מידה:/, "").trim() : "";
  const ans = metaLine.includes("התשובה:") ? metaLine.split("התשובה:")[1].trim() : "";
  const note = (p.match(/\n\n(התמונה הקיימת[^\n]*(?:\n[^\n`]+)*)/) || [])[1] || "";
  const prompt = p.includes("```") ? p.split("```")[1].trim() : "";
  cases.push({ n, title, kind, status, dim, ans, note: note.trim(), prompt });
}

// תמונות קיימות, מוטמעות
const imgs = {};
for (const c of cases) {
  const f = DIR + "images/blita" + String(c.n).padStart(2, "0") + ".jpg";
  try {
    const small = execSync(
      `node -e "const s=require('sharp');s('${f.replace(/\\/g, "/")}').resize({width:560}).jpeg({quality:70}).toBuffer().then(b=>process.stdout.write(b.toString('base64')))"`,
      { cwd: "D:/קלוד קוד my-workspace/erez-baruchi-site", encoding: "utf8", maxBuffer: 1 << 26 },
    );
    imgs[c.n] = small;
  } catch { /* אין תמונה עדיין */ }
}
const demo = readFileSync("overlay-small.jpg").toString("base64");

const STATUS = {
  ok: ["מאושרת", "ok"],
  redo: ["לייצור מחדש", "redo"],
  maybe: ["לשקול", "maybe"],
};

const cards = cases.map((c) => {
  const [label, cls] = STATUS[c.status];
  const good = /תקין/.test(c.ans);
  return `
  <article class="case ${cls}">
    <header>
      <span class="n">${c.n}</span>
      <h3>${esc(c.title)}</h3>
      <span class="status ${cls}">${label}</span>
      ${c.prompt ? `<button class="copy" data-case="${c.n}" data-kind="${c.kind}">העתקת הפרומפט</button>` : ""}
    </header>
    <div class="meta">
      <span class="chip kind ${c.kind}">${c.kind === "section" ? "חתך" : "סצנה"}</span>
      ${c.dim ? `<span class="chip dim">${esc(c.dim)}</span>` : ""}
      <span class="chip ${good ? "ok" : "bad"}">${esc(c.ans)}</span>
    </div>
    ${c.note ? `<p class="note">${esc(c.note)}</p>` : ""}
    <div class="body">
      ${imgs[c.n] ? `<img src="data:image/jpeg;base64,${imgs[c.n]}" alt="התמונה שנוצרה למקרה ${c.n}, ${esc(c.title)}">` : ""}
      ${c.prompt ? `<pre dir="ltr" id="p${c.n}">${esc(c.prompt)}</pre>` : ""}
    </div>
  </article>`;
}).join("");

const nOk = cases.filter((c) => c.status === "ok").length;
const nRedo = cases.filter((c) => c.status === "redo").length;

const html = `<title>פרומפטים לבליטות</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&family=Assistant:wght@400;600&display=swap">
<style>
:root{
  --bg:#f4f1ea; --surface:#fffdf8; --code:#2c211a; --code-ink:#efe4d3;
  --ink:#241c16; --dim:#6b5c4e; --line:#ddd3c4; --line-2:#c6b8a4;
  --accent:#a8521f;
  --ok:#3d6b45; --ok-bg:#dfeadf;
  --bad:#9c3a22; --bad-bg:#f5e0d8;
  --redo:#8a5a14; --redo-bg:#f3e7cd;
  --sect:#2f5f6b; --sect-bg:#dce9ec;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#191512; --surface:#221c17; --code:#100d0a; --code-ink:#e6d9c6;
  --ink:#efe6da; --dim:#a09183; --line:#362d25; --line-2:#4a3e33;
  --accent:#e0a35f;
  --ok:#8fc99c; --ok-bg:#1f2f22;
  --bad:#e0998a; --bad-bg:#33201a;
  --redo:#d9b465; --redo-bg:#332a17;
  --sect:#8fc0cc; --sect-bg:#1b2a2e;
}}
:root[data-theme="dark"]{
  --bg:#191512; --surface:#221c17; --code:#100d0a; --code-ink:#e6d9c6;
  --ink:#efe6da; --dim:#a09183; --line:#362d25; --line-2:#4a3e33;
  --accent:#e0a35f;
  --ok:#8fc99c; --ok-bg:#1f2f22;
  --bad:#e0998a; --bad-bg:#33201a;
  --redo:#d9b465; --redo-bg:#332a17;
  --sect:#8fc0cc; --sect-bg:#1b2a2e;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);direction:rtl;
  font:16px/1.6 Assistant,"Segoe UI",system-ui,sans-serif}
.wrap{max-width:980px;margin:0 auto;padding:34px 20px 80px}
h1,h2,h3{font-family:Heebo,sans-serif;margin:0;text-wrap:balance}
h1{font-size:2rem;font-weight:900;letter-spacing:-.02em}
h2{font-size:1.2rem;font-weight:700}
h3{font-size:1.02rem;font-weight:700;flex:1;min-width:150px}
p{margin:0}
.eyebrow{font-family:Heebo,sans-serif;font-size:.72rem;font-weight:700;letter-spacing:.14em;color:var(--accent)}
.sub{color:var(--dim);margin-top:10px;max-width:64ch}
header.top{border-bottom:2px solid var(--line-2);padding-bottom:24px;margin-bottom:24px}
.tally{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap}

.why{background:var(--surface);border:1px solid var(--line);border-right:4px solid var(--accent);
  border-radius:0 9px 9px 0;padding:18px 20px;margin-bottom:24px}
.why p{color:var(--dim);font-size:.95rem;max-width:74ch;margin-top:8px}
.why b{color:var(--ink)}

figure{margin:0 0 24px}
figure img{width:100%;border-radius:9px;border:1px solid var(--line);display:block}
figcaption{color:var(--dim);font-size:.86rem;margin-top:9px;max-width:72ch}

.stylebox{background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:18px 20px;margin-bottom:14px}
.stylehead{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:11px}
.stylehead p{color:var(--dim);font-size:.89rem;flex:1;min-width:200px}
details summary{cursor:pointer;color:var(--dim);font-size:.86rem;font-family:Heebo,sans-serif;font-weight:700}
details[open] summary{margin-bottom:10px}

pre{background:var(--code);color:var(--code-ink);border-radius:7px;padding:14px 16px;margin:0;
  font-family:ui-monospace,"Cascadia Mono",Consolas,monospace;font-size:.78rem;line-height:1.55;
  white-space:pre-wrap;overflow-x:auto;direction:ltr;text-align:left}

.case{background:var(--surface);border:1px solid var(--line);border-radius:9px;padding:17px 19px;margin-bottom:13px}
.case.redo{border-color:var(--redo)}
.case header{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:9px;border:0;padding:0}
.n{font-family:Heebo,sans-serif;font-weight:900;font-size:.8rem;background:var(--ink);color:var(--bg);
  border-radius:5px;padding:2px 9px;font-variant-numeric:tabular-nums}
.meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:11px}
.chip,.status{font-size:.77rem;font-weight:600;padding:3px 9px;border-radius:5px;white-space:nowrap}
.status{font-family:Heebo,sans-serif;font-weight:700}
.status.ok,.chip.ok{background:var(--ok-bg);color:var(--ok)}
.status.redo{background:var(--redo-bg);color:var(--redo)}
.status.maybe{background:var(--sect-bg);color:var(--sect)}
.chip.bad{background:var(--bad-bg);color:var(--bad)}
.chip.dim{background:var(--redo-bg);color:var(--redo)}
.chip.kind.section{background:var(--sect-bg);color:var(--sect)}
.chip.kind.scene{background:var(--line);color:var(--dim)}
.note{color:var(--dim);font-size:.88rem;margin-bottom:11px;max-width:74ch}
.body{display:grid;gap:12px}
.body:has(img):has(pre){grid-template-columns:280px 1fr}
@media(max-width:720px){.body:has(img):has(pre){grid-template-columns:1fr}}
.body img{width:100%;border-radius:7px;border:1px solid var(--line);display:block;align-self:start}

button{font:inherit;font-family:Heebo,sans-serif;font-weight:700;font-size:.84rem;cursor:pointer;
  background:var(--accent);color:var(--bg);border:none;border-radius:7px;padding:7px 15px;white-space:nowrap}
button:hover{opacity:.88}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
button.done{background:var(--ok);color:var(--bg)}

.check{margin-top:32px;padding-top:20px;border-top:2px solid var(--line-2)}
.check ol{margin:12px 0 0;padding-inline-start:20px;color:var(--dim);font-size:.93rem}
.check li{margin-bottom:6px}
.check b{color:var(--ink)}
</style>

<div class="wrap">
<header class="top">
  <p class="eyebrow">תחיקת הבנייה · שיעור 10 · מרווחים ובליטות</p>
  <h1>פרומפטים לבליטות</h1>
  <p class="sub">עשרה איורים למשחק "תפסו את החריגה". אחרי הסבב הראשון: ${nOk} מאושרות, ${nRedo} לייצור מחדש.</p>
  <div class="tally">
    <span class="status ok">${nOk} מאושרות</span>
    <span class="status redo">${nRedo} לייצור מחדש</span>
    <span class="status maybe">1 לשקול</span>
  </div>
</header>

<div class="why">
  <h2>למה ארבע נכשלו</h2>
  <p>הפרומפט הראשון ביקש גם <b>חזית ישרה בלי פרספקטיבה</b> וגם <b>בליטה קדימה</b>. אלה סותרים: בחזית ישרה אי אפשר לראות עומק, זו ההגדרה של חזית. גובה נראה, קוטר נראה, סוג נראה. עומק לא.</p>
  <p>לכן יש עכשיו שני בלוקי סגנון. שאלות של גובה וסוג נשארות <b>סצנה</b>. שאלות של עומק עוברות ל<b>חתך</b>, וזה גם מה שמטרת הלמידה הרביעית בשיעור דורשת: לשרטט פרט חתך תקני של בליטה בקו בניין.</p>
</div>

<figure>
  <img src="data:image/jpeg;base64,${demo}" alt="איור של מצללה מעל מרפסת, ומעליו שכבת סימון: קו בניין אנכי מקווקו באדום, וקו מידה אופקי עם חצים והכיתוב 3.50 מ'">
  <figcaption>המידות אינן חלק מהתמונה. המודל מצייר גיאומטריה נקייה בלי מספרים, וקו הבניין וקו המידה נוספים מעליה כשכבת SVG. בסבב הראשון המודל צייר קווי מידה בתמונה 10 למרות איסור מפורש, ולכן האיסור בבלוק החתך מנוסח חזק יותר.</figcaption>
</figure>

<div class="stylebox">
  <div class="stylehead">
    <h2>בלוק סגנון א': סצנה</h2>
    <p>למקרים 3, 4, 7, 8, 9. כלול אוטומטית בכפתורי ההעתקה שלהם.</p>
  </div>
  <details><summary>הצגת הבלוק</summary><pre dir="ltr" id="pscene">${esc(styleScene)}</pre></details>
</div>

<div class="stylebox" style="margin-bottom:30px">
  <div class="stylehead">
    <h2>בלוק סגנון ב': חתך</h2>
    <p>למקרים 1, 5, 6, 10. כלול אוטומטית בכפתורי ההעתקה שלהם.</p>
  </div>
  <details><summary>הצגת הבלוק</summary><pre dir="ltr" id="psection">${esc(styleSection)}</pre></details>
</div>

<h2 style="margin-bottom:13px">עשרת המקרים</h2>
${cards}

<div class="check">
  <h2>מה אני בודק בכל תמונה</h2>
  <ol>
    <li><b>האם היא סותרת את התשובה.</b> איור יפה שסותר גרוע משרטוט פשוט שנכון.</li>
    <li><b>האם העומק נראה</b> בחתכים, או <b>האם הגובה נראה</b> בסצנות.</li>
    <li><b>האם נכנס טקסט או קו מידה</b> למרות האיסור.</li>
    <li><b>האם נשאר רבע תחתון ריק</b> לקו המידה.</li>
    <li><b>האם יש שוליים ריקים בקצה.</b> בסבב הראשון היו בשש תמונות, עד 16% מהרוחב, וחתכתי אותן.</li>
  </ol>
</div>
</div>

<script>
const STYLES = {
  scene: ${JSON.stringify(styleScene)},
  section: ${JSON.stringify(styleSection)},
};
document.querySelectorAll("button.copy").forEach((b) => {
  b.addEventListener("click", async () => {
    const body = document.getElementById("p" + b.dataset.case).textContent;
    try {
      await navigator.clipboard.writeText(STYLES[b.dataset.kind] + "\\n\\n" + body);
      b.textContent = "הועתק";
      b.classList.add("done");
      setTimeout(() => { b.textContent = "העתקת הפרומפט"; b.classList.remove("done"); }, 1600);
    } catch (e) {
      b.textContent = "לא הצלחתי, סמנו ידנית";
      setTimeout(() => { b.textContent = "העתקת הפרומפט"; }, 2600);
    }
  });
});
</script>`;
writeFileSync("prompts-page.html", html);
console.log("מקרים:", cases.length, "| עם פרומפט:", cases.filter((c) => c.prompt).length,
  "| עם תמונה:", Object.keys(imgs).length, "|", Math.round(html.length / 1024) + "KB");
