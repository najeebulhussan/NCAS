const fs = require('fs');
const path = require('path');

console.log(`\n=============================================================`);
console.log(` 🔑 NCAS AUTOMATED ENVIRONMENT VARIABLE & SECRETS VALIDATOR`);
console.log(`=============================================================`);

const rootDir = path.join(__dirname, '..');
const envFile = path.join(rootDir, '.env');
const envExampleFile = path.join(rootDir, '.env.example');

// 1. Ensure .env file exists
if (!fs.existsSync(envFile)) {
  if (fs.existsSync(envExampleFile)) {
    console.log(`⚠️ .env file not found. Copying from .env.example template...`);
    fs.copyFileSync(envExampleFile, envFile);
    console.log(`✓ Created .env file from .env.example template.`);
  } else {
    console.log(`❌ Neither .env nor .env.example found.`);
  }
}

// 2. Parse .env file
function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const envObj = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envObj[key] = val;
    }
  });
  return envObj;
}

const env = parseEnv(envFile);

// 3. Define Required & Optional Variables
const SCHEMA = [
  { key: 'PORT', category: 'Core API Gateway', required: false, default: '8000' },
  { key: 'TARGET_HANDLE', category: 'Brand Identity', required: true, default: '@NajeebCyber' },
  { key: 'DATABASE_URL', category: 'Database (PostgreSQL)', required: true, default: 'postgresql://ncas_admin:ncas_secure_password_2026@localhost:5432/ncas_production' },
  { key: 'REDIS_URL', category: 'Event Queue (Redis)', required: true, default: 'redis://localhost:6379' },
  { key: 'MINIO_ENDPOINT', category: 'Object Storage (MinIO)', required: true, default: 'localhost:9000' },
  { key: 'MINIO_ACCESS_KEY', category: 'Object Storage (MinIO)', required: true, default: 'ncas_minio_admin' },
  { key: 'MINIO_SECRET_KEY', category: 'Object Storage (MinIO)', required: true, default: 'ncas_minio_password_2026' },
  { key: 'OPENAI_API_KEY', category: 'LLM Intelligence', required: false },
  { key: 'ELEVENLABS_API_KEY', category: 'Voice Synthesis', required: false },
  { key: 'MIDJOURNEY_API_KEY', category: 'Visual Director', required: false },
  { key: 'SLACK_WEBHOOK_URL', category: 'Slack Operations', required: false }
];

let validCount = 0;
let missingRequired = 0;
let missingOptional = 0;

console.log(`\n📋 Environment Secrets Diagnostic Report:\n`);

SCHEMA.forEach(item => {
  const val = process.env[item.key] || env[item.key];
  const isSet = val && val !== 'your-openai-api-key' && val !== 'your-elevenlabs-api-key' && val.length > 0;

  if (isSet) {
    validCount++;
    console.log(`  ✓ [OK]               ${item.key.padEnd(24)} (${item.category})`);
  } else if (item.required) {
    missingRequired++;
    const fallbackMsg = item.default ? ` [Fallback Active: ${item.default}]` : '';
    console.log(`  ⚠️ [REQUIRED DEFAULT] ${item.key.padEnd(24)} (${item.category})${fallbackMsg}`);
  } else {
    missingOptional++;
    console.log(`  ℹ️ [OPTIONAL MISSING] ${item.key.padEnd(24)} (${item.category})`);
  }
});

console.log(`\n=============================================================`);
console.log(` 📊 SUMMARY DIAGNOSTIC RESULT`);
console.log(`=============================================================`);
console.log(`  - Configured Variables:  ${validCount} / ${SCHEMA.length}`);
console.log(`  - Active Fallbacks:      ${missingRequired}`);
console.log(`  - Optional API Keys:     ${missingOptional}`);
console.log(`\n✓ Environment Validation Complete! Local Standalone Mode Active.\n`);
