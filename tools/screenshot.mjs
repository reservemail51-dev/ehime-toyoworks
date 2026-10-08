/**
 * 制作実績用のスクリーンショットと、SNSシェア画像をつくる補助スクリプト（公開はされません）
 *
 * 使い方（パソコンに Node.js と Playwright が必要：npm i -D playwright）
 *   実績の画像:  node tools/screenshot.mjs <id> <URL または ローカルHTMLのパス>
 *     例) node tools/screenshot.mjs maruichi https://maruichi.pages.dev/
 *         → public/images/works/maruichi/ に thumb.jpg（一覧用）/ pc.jpg / sp.jpg ができます
 *   シェア画像:  node tools/screenshot.mjs --ogp
 *         → tools/ogp.html から public/images/ogp.png（1200×630）をつくります
 *
 * できたら public/data/works.js の thumb / images にパスを書いてください（パスは images/works/<id>/〇〇.jpg の形）。
 * ※このスクリプトはリポジトリのいちばん上のフォルダで実行してください。
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [, , arg1, arg2] = process.argv;
const toUrl = (s) => (/^https?:\/\//.test(s) ? s : pathToFileURL(resolve(s)).href);

const browser = await chromium.launch();
try {
  if (arg1 === "--ogp") {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto(toUrl("tools/ogp.html"));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: "public/images/ogp.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
    console.log("public/images/ogp.png をつくりました");
  } else if (arg1 && arg2) {
    const dir = `public/images/works/${arg1}`;
    await mkdir(dir, { recursive: true });
    const url = toUrl(arg2);

    // パソコン表示（ファーストビュー＋少し下まで）
    const pc = await browser.newPage({ viewport: { width: 1440, height: 1080 }, deviceScaleFactor: 1 });
    await pc.goto(url, { waitUntil: "networkidle" });
    await pc.screenshot({ path: `${dir}/pc.jpg`, type: "jpeg", quality: 82 });
    // 一覧用サムネイル（4:3）
    await pc.setViewportSize({ width: 1200, height: 900 });
    await pc.screenshot({ path: `${dir}/thumb.jpg`, type: "jpeg", quality: 78 });

    // スマホ表示
    const sp = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
    await sp.goto(url, { waitUntil: "networkidle" });
    await sp.screenshot({ path: `${dir}/sp.jpg`, type: "jpeg", quality: 82 });

    console.log(`${dir} に thumb.jpg / pc.jpg / sp.jpg をつくりました`);
  } else {
    console.log("使い方: node tools/screenshot.mjs <id> <URL>  または  node tools/screenshot.mjs --ogp");
  }
} finally {
  await browser.close();
}
