const { chromium } = require('playwright');

// All 10 URLs we need to visit
const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=35',
  'https://sanand0.github.io/tdsdata/js_table/?seed=36',
  'https://sanand0.github.io/tdsdata/js_table/?seed=37',
  'https://sanand0.github.io/tdsdata/js_table/?seed=38',
  'https://sanand0.github.io/tdsdata/js_table/?seed=39',
  'https://sanand0.github.io/tdsdata/js_table/?seed=40',
  'https://sanand0.github.io/tdsdata/js_table/?seed=41',
  'https://sanand0.github.io/tdsdata/js_table/?seed=42',
  'https://sanand0.github.io/tdsdata/js_table/?seed=43',
  'https://sanand0.github.io/tdsdata/js_table/?seed=44',
];

async function scrapeAll() {
  // Launch a headless browser (no visible window)
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);

    // Go to the page
    await page.goto(url);

    // Wait until the table appears (it's dynamically generated!)
    await page.waitForSelector('table');

    // Grab all the text inside table cells (<td> tags)
    const numbers = await page.$$eval('td', cells => {
      return cells
        .map(cell => cell.innerText.trim())       // Get text from each cell
        .map(text => parseFloat(text))            // Try to convert to number
        .filter(num => !isNaN(num));              // Keep only actual numbers
    });

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`  Sum for this page: ${pageSum}`);
    grandTotal += pageSum;
  }

  await browser.close();

  // This is the important line - prints the final answer!
  console.log(`\nTotal sum across all pages: ${grandTotal}`);
}

scrapeAll().catch(err => {
  console.error(err);
  process.exit(1);
});
```

4. Click **"Commit changes"**

---

## Step 5: Trigger and Watch the Action Run

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow running (yellow circle = in progress, green = done)
3. Click on the workflow run → click on the `scrape` job → expand the **"Run Playwright scraper"** step
4. You'll see the output including the final total!

If it doesn't run automatically, click **"Run workflow"** button on the Actions page.

---

## Step 6: Get a Personal Access Token (PAT)

The assignment asks for your repo URL + a token. Here's how to get the token:

1. Go to GitHub → click your **profile picture** (top right) → **"Settings"**
2. Scroll down the left sidebar → click **"Developer settings"**
3. Click **"Personal access tokens"** → **"Tokens (classic)"**
4. Click **"Generate new token (classic)"**
5. Give it a name like `playwright-assignment`
6. Set expiration (e.g., 7 days)
7. Check the **`repo`** scope (checkmark the whole `repo` section)
8. Click **"Generate token"**
9. **Copy the token immediately** — you won't see it again!

---

## Step 7: Submit Your Answer

Your answer should look like:
```
https://github.com/YOUR_USERNAME/playwright-scraper ghp_xxxxxxxxxxxxxxxxxxxx
