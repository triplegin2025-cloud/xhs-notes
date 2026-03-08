#!/usr/bin/env node
/**
 * XHS Notes Card Exporter
 * Usage: node export-cards.js <relative-html-path>
 * Example: node export-cards.js "posts/2026-03-09-topic/2026-03-09-topic.html"
 *
 * PNGs are saved to the same folder as the HTML file.
 * Output resolution: 2160×2880px (2x retina, 1080×1440 @ deviceScaleFactor:2)
 *
 * Requires: puppeteer-core (npm install)
 * Requires: Chrome or Chromium installed on system
 *   - macOS: Google Chrome / Chromium.app in /Applications
 *   - Linux: google-chrome / chromium-browser in /usr/bin
 *   - Windows: Chrome in Program Files
 *   - Custom: set CHROME_PATH env variable
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

// ─── Config ────────────────────────────────────────────────────────────────

const TARGET_FILE = process.argv[2] || null;

if (!TARGET_FILE) {
    console.error('Usage: node export-cards.js "posts/YYYY-MM-DD-topic/file.html"');
    process.exit(1);
}

const FILE_PATH  = path.resolve(__dirname, TARGET_FILE);
const OUTPUT_DIR = path.dirname(FILE_PATH);
const CARD_W     = 1080;
const CARD_H     = 1440;

// ─── Chrome auto-detect ────────────────────────────────────────────────────

function findChrome() {
    if (process.env.CHROME_PATH) {
        if (fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
        console.warn(`⚠️  CHROME_PATH 设置的路径不存在：${process.env.CHROME_PATH}`);
    }

    const candidates = [
        // macOS
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        // Linux
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/snap/bin/chromium',
        // Windows
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        process.env.LOCALAPPDATA
            ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe')
            : '',
    ].filter(Boolean);

    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }

    throw new Error(
        '找不到 Chrome / Chromium。\n' +
        '请安装 Chrome，或设置环境变量：export CHROME_PATH="/path/to/chrome"'
    );
}

// ─── Main ──────────────────────────────────────────────────────────────────

if (!fs.existsSync(FILE_PATH)) {
    console.error(`❌ 找不到文件：${FILE_PATH}`);
    process.exit(1);
}

(async () => {
    let chromePath;
    try {
        chromePath = findChrome();
    } catch (e) {
        console.error(`❌ ${e.message}`);
        process.exit(1);
    }

    console.log(`\n📄 载入：${TARGET_FILE}`);
    console.log(`🌐 Chrome：${chromePath}`);
    console.log(`📁 输出目录：${OUTPUT_DIR}\n`);

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: chromePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: CARD_W, height: CARD_H, deviceScaleFactor: 2 });
    await page.goto(`file://${FILE_PATH}`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts + initial animation frame
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 800));

    const cardCount = await page.evaluate(
        () => document.querySelectorAll('.card-wrapper').length
    );
    console.log(`✅ 找到 ${cardCount} 张卡片\n`);

    for (let i = 0; i < cardCount; i++) {
        // Isolate this card in the viewport (hide others)
        // This ensures vh/dvh units and GPU compositing render correctly
        await page.evaluate((idx) => {
            document.querySelectorAll('.card-wrapper').forEach((w, j) => {
                w.style.display = j === idx ? 'flex' : 'none';
            });
            window.scrollTo(0, 0);
        }, i);

        await new Promise(r => setTimeout(r, 400));

        const card = await page.$('.card-wrapper:not([style*="none"]) .xhs-card');
        if (!card) {
            console.warn(`⚠️  第 ${i + 1} 张未找到 .xhs-card，跳过`);
            continue;
        }

        const filename = `card-${String(i + 1).padStart(2, '0')}.png`;
        await card.screenshot({ path: path.join(OUTPUT_DIR, filename), type: 'png' });
        console.log(`  ✓ ${filename}`);
    }

    // Restore all cards
    await page.evaluate(() => {
        document.querySelectorAll('.card-wrapper').forEach(w => { w.style.display = ''; });
    });

    await browser.close();

    console.log(`\n🎉 完成！分辨率：${CARD_W * 2} × ${CARD_H * 2} px`);
    console.log(`📂 ${OUTPUT_DIR}\n`);

    // macOS: open in Finder
    if (process.platform === 'darwin') {
        require('child_process').exec(`open "${OUTPUT_DIR}"`);
    }
})();
