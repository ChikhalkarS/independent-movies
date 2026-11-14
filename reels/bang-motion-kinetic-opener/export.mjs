/* Vertical Shorts export for bang-motion kinetic opener */

import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';

const URL = 'file:///Applications/mish/independent-movies/reels/bang-motion-kinetic-opener/index.html?clean=1';
const FPS = 60;
const OUT = '/Applications/mish/independent-movies/reels/bang-motion-kinetic-opener/out/frames';
const WIDTH = 1080;
const HEIGHT = 1920;

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--enable-gpu', '--use-gl=angle', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'networkidle0' });

// Wait for module to load and timeline attached
await page.waitForFunction('window.OPENER && window.OPENER.ready && (!window.OPENER.clipsReady || window.OPENER.clipsReady())', { timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => { window.OPENER.tl.pause(0); });

const DURATION = await page.evaluate(() => window.OPENER.DURATION);
const total = Math.ceil(DURATION * FPS);
console.log(`${total} frames @ ${FPS} fps (${DURATION}s) -> ${OUT}/`);

for(let i = 0; i < total; i++){
  const t = i / FPS;

  await page.evaluate(async (time) => {
    if (window.OPENER.seekFrame) await window.OPENER.seekFrame(time);
    else (window.OPENER.seek||window.OPENER.tl.time.bind(window.OPENER.tl))(time);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, t);

  await page.screenshot({
    path: `${OUT}/f${String(i).padStart(5, '0')}.png`,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    optimizeForSpeed: true,
  });

  if(i % FPS === 0) process.stdout.write(`\r${i}/${total}  ${t.toFixed(1)}s`);
}

console.log(`\nDone — ${total} frames in ${OUT}/`);
await browser.close();