const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const CHAT_URL = 'https://chatgpt.com/share/6a67a1ff-b670-83e8-9dd8-4c6b12160db3';
const FULL_CHAT_PATH = path.join(__dirname, '../resources/chat_history/chat_history_full.md');
const SUMMARY_PATH = path.join(__dirname, '../resources/chat_history/chat_summary.md');

console.log(`[NCAS Sync Engine] Fetching latest chat updates from ${CHAT_URL}...`);

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function run() {
  try {
    const html = await fetchUrl(CHAT_URL);
    console.log(`[NCAS Sync Engine] Downloaded HTML. Byte length: ${html.length}`);

    // Extract stream block
    const b8Match = html.match(/window\.__reactRouterContext\.streamController\.enqueue\(([\s\S]*?)\);?\s*<\/script>/);
    let extractedText = '';

    if (b8Match) {
      try {
        let rawJsonStr = b8Match[1].replace(/\);?\s*$/, '');
        let rawStr = JSON.parse(rawJsonStr);
        let arr = JSON.parse(rawStr);
        
        console.log(`[NCAS Sync Engine] Stream array length: ${arr.length}`);

        const chatItems = [];
        arr.forEach((item, index) => {
          if (typeof item === 'string' && item.trim().length > 0) {
            if (
              !item.startsWith('http://') &&
              !item.startsWith('https://cdn') &&
              !item.includes('/cdn/assets/') &&
              !item.startsWith('_') &&
              !item.startsWith('routes/') &&
              item !== 'loaderData' &&
              item !== 'actionData' &&
              item !== 'errors' &&
              item !== 'root' &&
              item !== 'sharedConversationId' &&
              item !== '6a67a1ff-b670-83e8-9dd8-4c6b12160db3'
            ) {
              if (item.length > 20 || item.includes('NCAS') || item.includes('Cyber') || item.includes('Option') || item.includes('Project') || item.includes('Script') || item.includes('MASTER') || item.includes('Prompt') || item.includes('Najeeb')) {
                chatItems.push({ index, content: item });
              }
            }
          }
        });

        extractedText = `# CHAT RESOURCE: NajeebCyber AI Studio (NCAS)\n\nOriginal Shared Link: ${CHAT_URL}\nLast Synced: ${new Date().toISOString()}\n\n---\n\n`;
        chatItems.forEach((ci, i) => {
          extractedText += `### Section ${i+1} (Stream Index ${ci.index})\n\n${ci.content}\n\n---\n\n`;
        });

      } catch(e) {
        console.error(`[NCAS Sync Engine] Stream JSON parse error: ${e.message}`);
      }
    }

    if (!extractedText) {
      console.log(`[NCAS Sync Engine] Could not extract stream JSON directly, saving raw HTML snapshot.`);
      extractedText = `# RAW SNAPSHOT OF CHAT\n\nFetched at: ${new Date().toISOString()}\n\n${html}`;
    }

    // Check existing file content
    let existingText = '';
    if (fs.existsSync(FULL_CHAT_PATH)) {
      existingText = fs.readFileSync(FULL_CHAT_PATH, 'utf8');
    }

    if (existingText.length === extractedText.length) {
      console.log(`[NCAS Sync Engine] No new updates detected in ChatGPT link.`);
    } else {
      console.log(`[NCAS Sync Engine] New updates detected! Updating resources/chat_history/chat_history_full.md...`);
      fs.writeFileSync(FULL_CHAT_PATH, extractedText);

      // Auto-commit and push to Git
      try {
        console.log(`[NCAS Sync Engine] Auto-committing and pushing to GitHub...`);
        execSync('git add resources/chat_history/chat_history_full.md', { cwd: path.join(__dirname, '..') });
        execSync(`git commit -m "chore(sync): auto-update chat history from ChatGPT share link [${new Date().toLocaleDateString()}]"`, { cwd: path.join(__dirname, '..') });
        execSync('git push origin main', { cwd: path.join(__dirname, '..') });
        console.log(`[NCAS Sync Engine] Successfully pushed chat updates to GitHub!`);
      } catch (gitErr) {
        console.error(`[NCAS Sync Engine] Git commit/push note: ${gitErr.message}`);
      }
    }

  } catch (err) {
    console.error(`[NCAS Sync Engine] Fetch error: ${err.message}`);
  }
}

run();
