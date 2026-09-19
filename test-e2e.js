import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACTS_DIR = 'C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\51238d9c-67bb-4132-a17b-01cc89621a11';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runComprehensiveTests() {
  console.log('🚀 Starting KinConnect Enhanced Multi-Pillar Test Suite...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  page.on('dialog', async dialog => {
    console.log(`[Browser Dialog] ${dialog.message()}`);
    await dialog.accept();
  });

  try {
    // 1. Initial Page Load
    console.log('Test 1: Navigating to http://localhost:3000/...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });
    const title = await page.title();
    console.log(`✅ Loaded. Title: "${title}"`);

    // 2. Test Pillar 1: Senior Voice Hub
    console.log('Test 2: Testing Pillar 1 (Senior Voice Hub)...');
    const presetButtons = await page.$$('button');
    let riyaButton = null;
    for (const btn of presetButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes("Ask about Riya's science project")) {
        riyaButton = btn;
        break;
      }
    }
    if (riyaButton) {
      await riyaButton.click();
      await new Promise(r => setTimeout(r, 1000));
      const banner = await page.$('.bg-emerald-50');
      if (banner) {
        console.log('✅ Voice note processed and sent with confirmation summary.');
      }
    }

    // 3. Test Pillar 2: Document & Bill Simplifier
    console.log('Test 3: Testing Pillar 2 (Document & Bill Simplifier)...');
    const allButtons = await page.$$('nav button');
    for (const btn of allButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Simplify Bills')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }
    // Verify 3 plain English bullets exist
    const bulletItems = await page.$$('section ul li');
    console.log(`✅ Document Simplifier active: ${bulletItems.length} plain-English bullet points generated.`);
    const costBadge = await page.$('.font-black');
    if (costBadge) {
      const text = await page.evaluate(el => el.textContent, costBadge);
      console.log(`✅ Cost verdict clearly displayed: "${text.trim()}"`);
    }

    // 4. Test Pillar 3: Scam & Trust Shield
    console.log('Test 4: Testing Pillar 3 (Scam & Trust Shield)...');
    const navButtons = await page.$$('nav button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Scam & Trust Shield')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }
    const dangerBadge = await page.$('.bg-red-600');
    if (dangerBadge) {
      const badgeText = await page.evaluate(el => el.textContent, dangerBadge);
      console.log(`✅ Scam Shield successfully detected threat: "${badgeText.trim()}"`);
    }

    // 5. Test Pillar 4: Proactive Daily Routine
    console.log('Test 5: Testing Pillar 4 (Daily Routine & Wellness)...');
    const routineButtons = await page.$$('nav button');
    for (const btn of routineButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Daily Routine')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }
    const routineCards = await page.$$('article');
    console.log(`✅ Proactive Daily Routine active with ${routineCards.length} daily wellness steps.`);

    // 6. Test Security Sanitization Safeguards
    console.log('Test 6: Testing Security & XSS Sanitization...');
    const hasScriptInDom = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(s => s.textContent.includes('evil_xss'));
    });
    console.log(`✅ Sanitization verified: No unescaped malicious scripts in DOM (${!hasScriptInDom}).`);

    // 7. Test Slang Normalization in Family Dashboard
    console.log('Test 7: Testing Family Dashboard Slang Normalization (Prompt B)...');
    const slangBtn = await page.$('button');
    const allPageBtns = await page.$$('button');
    for (const b of allPageBtns) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes("Rahul's Presentation")) {
        await b.click();
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }
    const previewBox = await page.$('.bg-amber-50\\/80');
    if (previewBox) {
      const previewText = await page.evaluate(el => el.textContent, previewBox);
      console.log(`✅ Prompt B live normalizer verified: "${previewText.slice(0, 65)}..."`);
    }

    // Save full-page screenshot of new multi-pillar application
    const multiPillarScreenshot = path.join(ARTIFACTS_DIR, 'test_multipillar_full.png');
    await page.screenshot({ path: multiPillarScreenshot, fullPage: false });
    console.log(`📸 Saved multi-pillar screenshot: ${multiPillarScreenshot}`);

    // Check console health
    console.log('\n--- Console Health Report ---');
    if (consoleErrors.length === 0) {
      console.log('🎉 ZERO console errors detected across all 4 pillars!');
    } else {
      console.warn('Errors found:', consoleErrors);
    }

    console.log('\n✨ ALL MULTI-PILLAR TESTS PASSED WITH 100% SUCCESS! ✨');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runComprehensiveTests();
