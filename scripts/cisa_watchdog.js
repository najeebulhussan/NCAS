const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

console.log(`\n=============================================================`);
console.log(` 🛡️ NCAS REAL-TIME CISA & NIST CVE WATCHDOG DAEMON`);
console.log(`=============================================================`);

const CISA_KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const cacheFile = path.join(__dirname, '../resources/cisa_kev_cache.json');
const alertsDir = path.join(__dirname, '../output/threat_alerts');

if (!fs.existsSync(alertsDir)) {
  fs.mkdirSync(alertsDir, { recursive: true });
}

function fetchCisaKev() {
  return new Promise((resolve, reject) => {
    https.get(CISA_KEV_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runWatchdog() {
  console.log(`[Watchdog] Polling CISA Known Exploited Vulnerabilities (KEV) Feed...`);

  try {
    const kevData = await fetchCisaKev();
    const vulnerabilities = kevData.vulnerabilities || [];
    console.log(`[Watchdog] Successfully fetched CISA KEV Catalog. Total Tracked CVEs: ${vulnerabilities.length}`);

    // Read previous cache
    let cachedCves = [];
    if (fs.existsSync(cacheFile)) {
      try {
        cachedCves = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      } catch (e) {}
    }

    // Sort by date added (newest first)
    vulnerabilities.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    const recentVulnerabilities = vulnerabilities.slice(0, 5);

    console.log(`\n-------------------------------------------------------------`);
    console.log(` 🚨 RECENTLY EXPLOITED CVEs (CISA KEV TOP 5):`);
    console.log(`-------------------------------------------------------------`);
    recentVulnerabilities.forEach((v, i) => {
      console.log(`[${i + 1}] ${v.cveID} | ${v.vendorProject} - ${v.product}`);
      console.log(`    Date Added: ${v.dateAdded} | Short Desc: ${v.vulnerabilityName.slice(0, 80)}`);
      console.log(`    Action: ${v.requiredAction.slice(0, 90)}`);
      console.log(`-------------------------------------------------------------`);
    });

    // Check for unseen CVEs
    const cachedSet = new Set(cachedCves.map(c => c.cveID));
    const newThreats = recentVulnerabilities.filter(v => !cachedSet.has(v.cveID));

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const alertMd = path.join(alertsDir, `cisa_threat_alert_${timestamp}.md`);
    const alertJson = path.join(alertsDir, `cisa_threat_alert_${timestamp}.json`);

    const alertPackage = {
      scanTime: new Date().toISOString(),
      cisaCatalogTitle: kevData.title,
      totalVulnerabilitiesCount: vulnerabilities.length,
      newThreatsDetectedCount: newThreats.length,
      topExploitedThreats: recentVulnerabilities
    };

    let mdText = `# 🛡️ CISA Real-Time Threat Watchdog Alert\n\n`;
    mdText += `**Scan Time:** ${new Date().toLocaleString()}  \n`;
    mdText += `**Total Catalog CVEs:** ${vulnerabilities.length}  \n`;
    mdText += `**New Threats Detected:** ${newThreats.length}  \n\n`;
    mdText += `## Top Exploited Zero-Days & Critical Vulnerabilities\n\n`;

    recentVulnerabilities.forEach(v => {
      mdText += `### 🚨 ${v.cveID}: ${v.vendorProject} ${v.product}\n`;
      mdText += `- **Vulnerability:** ${v.vulnerabilityName}\n`;
      mdText += `- **Date Added to KEV:** ${v.dateAdded}\n`;
      mdText += `- **Required Action:** ${v.requiredAction}\n`;
      mdText += `- **Ransomware Note:** ${v.knownRansomwareCampaignUse}\n\n`;
    });

    fs.writeFileSync(alertMd, mdText);
    fs.writeFileSync(alertJson, JSON.stringify(alertPackage, null, 2));

    // Update cache
    fs.writeFileSync(cacheFile, JSON.stringify(recentVulnerabilities, null, 2));

    console.log(`\n✓ Watchdog scan complete! Saved threat alerts to output/threat_alerts/`);
    console.log(`📄 Threat Alert Markdown: ${alertMd}`);
    console.log(`📊 Threat Alert JSON:     ${alertJson}`);

    if (newThreats.length > 0) {
      console.log(`\n🚨 CRITICAL ALERT: ${newThreats.length} NEW Zero-Day threat(s) detected!`);
      console.log(`   Triggering automated NCAS 60s broadcast script generator...`);
      try {
        const topic = `CISA Zero Day Alert ${newThreats[0].cveID} ${newThreats[0].vendorProject}`;
        execSync(`node scripts/generate_news_script.js --topic "${topic}"`, { stdio: 'inherit' });
      } catch (err) {
        console.error(`Warning: Automated script trigger failed: ${err.message}`);
      }
    } else {
      console.log(`\n✅ Status Normal: All recent CISA KEV entries already cataloged in baseline.`);
    }

  } catch (err) {
    console.error(`❌ Watchdog Error: Failed to fetch CISA feed: ${err.message}`);
  }
}

runWatchdog();
