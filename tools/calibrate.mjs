// מודד בכל תמונה את תיבת האלמנט הכתום ואת קו הקרקע, ומדפיס אחוזים.
// מכאן נגזרים קואורדינטות שכבת הסימון ב-gameData.js.
// הרצה מתוך erez-baruchi-site (שם מותקן sharp):
//   node ../תחיקת-הבניה-משחקים/10_blitot-game/tools/calibrate.mjs
import { createRequire } from "node:module";
const sharp = createRequire("D:/קלוד קוד my-workspace/erez-baruchi-site/package.json")("sharp");

const DIR = "D:/קלוד קוד my-workspace/תחיקת-הבניה-משחקים/10_blitot-game/images/";
const isAmber = (r, g, b) => r > 185 && r < 255 && g > 120 && g < 205 && b < 130 && r - b > 85;

for (let i = 1; i <= 10; i++) {
  const n = String(i).padStart(2, "0");
  const { data, info } = await sharp(DIR + "blita" + n + ".jpg").raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  let x0 = W, x1 = 0, y0 = H, y1 = 0, count = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = (y * W + x) * C;
      if (isAmber(data[p], data[p + 1], data[p + 2])) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
        count++;
      }
    }
  }

  // קו הקרקע: השורה בחצי התחתון עם הכי הרבה פיקסלים לא-רקע ברוחב המסך
  let gy = 0, best = 0;
  for (let y = Math.round(H * 0.45); y < H; y++) {
    let c = 0;
    for (let x = 0; x < W; x += 2) {
      const p = (y * W + x) * C;
      if (data[p] < 220 && Math.abs(data[p] - data[p + 2]) < 25) c++;
    }
    if (c > best) { best = c; gy = y; }
  }

  const pc = (v, t) => ((v / t) * 100).toFixed(1);
  console.log(
    `blita${n} ${W}x${H}  כתום x:${pc(x0, W)}→${pc(x1, W)}  y:${pc(y0, H)}→${pc(y1, H)}  קרקע:${pc(gy, H)}  שטח:${((count / (W * H)) * 100).toFixed(1)}%`,
  );
}
