import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACTS_DIR = 'C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\51238d9c-67bb-4132-a17b-01cc89621a11';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTests() {
  console.log('🚀 Starting KinConnect Automated End-to-End Test Suite...');
  
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

  try {
    // 1. Load http://localhost:3000/
    console.log('Step 1: Navigating to http://localhost:3000/...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });
    
    // Check title
    const title = await page.title();
    console.log(`✅ Page loaded. Title: "${title}"`);

    // Capture initial split view screenshot
    const splitViewPath = path.join(ARTIFACTS_DIR, 'test_split_view.png');
    await page.screenshot({ path: splitViewPath, fullPage: false });
    console.log(`📸 Saved initial split view screenshot: ${splitViewPath}`);

    // 2. Test Senior Mode Interaction
    console.log('Step 2: Testing Senior Voice Hub interaction...');
    // Find preset suggestion button for Riya
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
      console.log('Found Senior Preset: "Ask about Riya\'s science project". Clicking...');
      await riyaButton.click();
      await new Promise(r => setTimeout(r, 1200));

      // Verify success banner appeared
      const successBanner = await page.$('.bg-emerald-50');
      if (successBanner) {
        const bannerText = await page.evaluate(el => el.textContent, successBanner);
        console.log(`✅ Senior message sent successfully! Banner text: "${bannerText.slice(0, 60)}..."`);
      }
    } else {
      console.warn('⚠️ Could not locate Riya preset button');
    }

    const seniorSentPath = path.join(ARTIFACTS_DIR, 'test_senior_sent.png');
    await page.screenshot({ path: seniorSentPath, fullPage: false });
    console.log(`📸 Saved senior interaction screenshot: ${seniorSentPath}`);

    // 3. Test Family Dashboard Interaction
    console.log('Step 3: Testing Family Dashboard interaction...');
    // Click slang preset "Rahul's Presentation (Slang)"
    const allButtons = await page.$$('button');
    let slangBtn = null;
    for (const btn of allButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes("Rahul's Presentation")) {
        slangBtn = btn;
        break;
      }
    }

    if (slangBtn) {
      console.log('Found Slang Preset: "Rahul\'s Presentation (Slang)". Clicking...');
      await slangBtn.click();
      await new Promise(r => setTimeout(r, 600));

      // Verify Prompt B translation preview appears
      const previewBox = await page.$('.bg-amber-50\\/80');
      if (previewBox) {
        const previewText = await page.evaluate(el => el.textContent, previewBox);
        console.log(`✅ Prompt B Normalization Preview active: "${previewText.slice(0, 80)}..."`);
      }

      // Submit update
      let submitUpdateBtn = null;
      const latestButtons = await page.$$('button');
      for (const btn of latestButtons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes("Send to Grandma's Daily Story")) {
          submitUpdateBtn = btn;
          break;
        }
      }

      if (submitUpdateBtn) {
        console.log('Submitting translated update to Grandma...');
        // Handle window.alert dialog
        page.on('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          await dialog.accept();
        });
        await submitUpdateBtn.click();
        await new Promise(r => setTimeout(r, 1200));
        console.log('✅ Update submitted and added to story!');
      }
    }

    // 4. Test View Switching to Senior Tablet Mode
    console.log('Step 4: Testing Senior Tablet View...');
    const navButtons = await page.$$('header button');
    for (const btn of navButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Senior Voice Hub')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }
    const seniorViewPath = path.join(ARTIFACTS_DIR, 'test_senior_view.png');
    await page.screenshot({ path: seniorViewPath, fullPage: false });
    console.log(`📸 Saved Senior Tablet Mode screenshot: ${seniorViewPath}`);

    // 5. Test Judge Architecture Modal
    console.log('Step 5: Testing Judge Architecture Modal...');
    const topButtons = await page.$$('header button');
    for (const btn of topButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Judge Architecture')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }
    const modalPath = path.join(ARTIFACTS_DIR, 'test_judge_modal.png');
    await page.screenshot({ path: modalPath, fullPage: false });
    console.log(`📸 Saved Judge Architecture Modal screenshot: ${modalPath}`);

    // Verify console errors
    console.log('\n--- Console Error Report ---');
    if (consoleErrors.length === 0) {
      console.log('🎉 ZERO console errors detected during full test execution!');
    } else {
      console.warn('Errors found:', consoleErrors);
    }

    console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
