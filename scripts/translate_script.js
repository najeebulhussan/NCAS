const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse CLI Arguments
const args = process.argv.slice(2);
let scriptFile = '';
let targetLang = 'ur'; // default: Urdu

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--script' && args[i + 1]) {
    scriptFile = args[i + 1];
    i++;
  } else if (args[i] === '--lang' && args[i + 1]) {
    targetLang = args[i + 1].toLowerCase();
    i++;
  }
}

console.log(`\n=============================================================`);
console.log(` 🌐 NCAS BILINGUAL SCRIPT TRANSLATOR (Urdu + English Ready)`);
console.log(`=============================================================`);
console.log(`Target Translation: ENGLISH + ${targetLang.toUpperCase()} (URDU)\n`);

let scriptData = null;
const scriptsDir = path.join(__dirname, '../output/scripts');

if (scriptFile && fs.existsSync(scriptFile)) {
  scriptData = JSON.parse(fs.readFileSync(scriptFile, 'utf8'));
} else {
  if (fs.existsSync(scriptsDir)) {
    const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.json'));
    if (files.length > 0) {
      files.sort((a, b) => fs.statSync(path.join(scriptsDir, b)).mtimeMs - fs.statSync(path.join(scriptsDir, a)).mtimeMs);
      const latestFile = path.join(scriptsDir, files[0]);
      console.log(`-> Loaded latest script file: ${latestFile}`);
      scriptData = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
    }
  }
}

if (!scriptData || !scriptData.clips) {
  console.log(`❌ Error: No valid script found to translate.`);
  process.exit(1);
}

function translateText(text, sourceLang = 'en', targetLang = 'ur') {
  return new Promise((resolve) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed && parsed.responseData && parsed.responseData.translatedText) {
            resolve(parsed.responseData.translatedText);
          } else {
            resolve(text);
          }
        } catch(e) {
          resolve(text);
        }
      });
    }).on('error', () => resolve(text));
  });
}

async function runTranslation() {
  console.log(`[1/2] Generating Bilingual Urdu + English 6 × 10s Scene Package...`);

  const bilingualClips = [];
  for (let clip of scriptData.clips) {
    console.log(`-> Translating Clip ${clip.clipId}...`);
    const urduScript = await translateText(clip.script, 'en', 'ur');
    const urduLowerThird = await translateText(clip.lowerThird, 'en', 'ur');

    bilingualClips.push({
      clipId: clip.clipId,
      timestamp: clip.timestamp,
      label: clip.label,
      english: {
        script: clip.script,
        lowerThird: clip.lowerThird
      },
      urdu: {
        script: urduScript,
        lowerThird: urduLowerThird
      },
      bilingualTeleprompter: `[EN] "${clip.script}"\n[UR] "${urduScript}"`,
      flowPrompt: clip.flowPrompt,
      audioCue: clip.audioCue
    });
  }

  const bilingualPackage = {
    metadata: {
      ...scriptData.metadata,
      languages: ["ENGLISH", "URDU"],
      translatedAt: new Date().toISOString()
    },
    clips: bilingualClips
  };

  console.log(`[2/2] Saving Bilingual Urdu + English package...`);

  const topicSlug = (scriptData.metadata.topic || 'cyber_news').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const transDir = path.join(__dirname, '../output/translations');

  if (!fs.existsSync(transDir)) {
    fs.mkdirSync(transDir, { recursive: true });
  }

  const mdFile = path.join(transDir, `${topicSlug}_bilingual_urdu_english_${timestamp}.md`);
  const jsonFile = path.join(transDir, `${topicSlug}_bilingual_urdu_english_${timestamp}.json`);

  let mdText = `# 🇵🇰🇬🇧 NCAS Bilingual Broadcast Script (Urdu + English)\n\n`;
  mdText += `**Topic:** ${scriptData.metadata.topic}  \n`;
  mdText += `**Languages:** English & Urdu (اردو)  \n`;
  mdText += `**Brand Handle:** \`@NajeebCyber\`  \n`;
  mdText += `**Format:** 6 Clips × 10 Seconds Each (60s Total)  \n\n`;
  mdText += `---\n\n`;

  bilingualClips.forEach(c => {
    mdText += `## ${c.label} [${c.timestamp}]\n\n`;
    mdText += `### 🇬🇧 English Script:\n> "${c.english.script}"\n\n`;
    mdText += `### 🇵🇰 Urdu Script (اردو):\n> "${c.urdu.script}"\n\n`;
    mdText += `**Lower Third (EN):** \`${c.english.lowerThird}\`  \n`;
    mdText += `**Lower Third (UR):** \`${c.urdu.lowerThird}\`  \n`;
    mdText += `**Google Flow Scene Prompt:** \`${c.flowPrompt.slice(0, 100)}...\`  \n\n`;
    mdText += `---\n\n`;
  });

  fs.writeFileSync(mdFile, mdText);
  fs.writeFileSync(jsonFile, JSON.stringify(bilingualPackage, null, 2));

  console.log(`✓ Bilingual (Urdu + English) package generated successfully!`);
  console.log(`📄 Markdown File: ${mdFile}`);
  console.log(`📊 JSON Spec File: ${jsonFile}\n`);

  console.log(`-------------------------------------------------------------`);
  console.log(` 🇵🇰🇬🇧 BILINGUAL TELEPROMPTER PREVIEW (URDU + ENGLISH):`);
  console.log(`-------------------------------------------------------------`);
  bilingualClips.forEach(c => {
    console.log(`[${c.timestamp}] ${c.label}`);
    console.log(`   EN: "${c.english.script}"`);
    console.log(`   UR: "${c.urdu.script}"\n`);
  });
  console.log(`-------------------------------------------------------------\n`);
}

runTranslation();
