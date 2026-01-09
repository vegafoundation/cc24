#!/usr/bin/env node
/**
 * Automatische Konfigurations-Validierung und -Korrektur
 * Prüft next.config.js und korrigiert automatisch häufige Probleme
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../next.config.js');
const packagePath = path.join(__dirname, '../package.json');
const dynamicPagePath = path.join(__dirname, '../app/fahrzeuge/[id]/page.tsx');

console.log('🔍 Automatische Konfigurations-Validierung...\n');

// Lese next.config.js
let configContent = fs.readFileSync(configPath, 'utf8');
let needsFix = false;
const fixes = [];

// Prüfe NEXT_PUBLIC_BASE_PATH
const hasBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isGitHubPages = hasBasePath.includes('cc24.demo') || hasBasePath !== '';

// Fix 1: output: 'export' für GitHub Pages
if (isGitHubPages && !configContent.includes("output: process.env.NEXT_PUBLIC_BASE_PATH ? 'export' : undefined")) {
  if (!configContent.includes("output:")) {
    fixes.push("✅ output: 'export' wird hinzugefügt für GitHub Pages");
    // Finde reactStrictMode und füge output danach hinzu
    configContent = configContent.replace(
      /reactStrictMode: true,/,
      `reactStrictMode: true,\n  output: process.env.NEXT_PUBLIC_BASE_PATH ? 'export' : undefined,`
    );
    needsFix = true;
  }
}

// Fix 2: unoptimized für Images bei GitHub Pages
if (isGitHubPages && !configContent.includes("unoptimized: process.env.NEXT_PUBLIC_BASE_PATH ? true : false")) {
  if (configContent.includes("unoptimized: false")) {
    fixes.push("✅ unoptimized wird dynamisch gesetzt für GitHub Pages");
    configContent = configContent.replace(
      /unoptimized: false/,
      "unoptimized: process.env.NEXT_PUBLIC_BASE_PATH ? true : false"
    );
    needsFix = true;
  }
}

// Fix 3: optimizeCss deaktiviert (critters Problem)
if (configContent.includes("optimizeCss: true")) {
  fixes.push("✅ optimizeCss wird deaktiviert (critters Problem)");
  configContent = configContent.replace(
    /optimizeCss: true/,
    "// optimizeCss: true, // Deaktiviert - benötigt 'critters' Package"
  );
  needsFix = true;
}

// Prüfe package-lock.json
const lockPath = path.join(__dirname, '../package-lock.json');
const hasLockFile = fs.existsSync(lockPath);

if (!hasLockFile) {
  console.log('⚠️  package-lock.json nicht gefunden');
  console.log('💡 Tipp: npm install wird beim ersten Build package-lock.json generieren\n');
}

// Zeige Status
if (fixes.length > 0) {
  console.log('🔧 Gefundene Probleme:');
  fixes.forEach(fix => console.log(`  ${fix}`));
  console.log('');
}

if (needsFix) {
  console.log('💾 Speichere korrigierte Konfiguration...');
  fs.writeFileSync(configPath, configContent, 'utf8');
  console.log('✅ Konfiguration automatisch korrigiert!\n');
} else {
  console.log('✅ Konfiguration ist korrekt!\n');
}

// Validierung
console.log('📋 Konfigurations-Status:');
console.log(`  - NEXT_PUBLIC_BASE_PATH: ${hasBasePath || 'nicht gesetzt'}`);
console.log(`  - GitHub Pages Mode: ${isGitHubPages ? 'Ja' : 'Nein'}`);
console.log(`  - package-lock.json: ${hasLockFile ? 'Vorhanden' : 'Fehlt'}`);
console.log(`  - output: ${isGitHubPages ? "'export'" : 'Standard'}`);
console.log('');

// Fix 4: generateStaticParams() für dynamische Routen prüfen
if (isGitHubPages && fs.existsSync(dynamicPagePath)) {
  let pageContent = fs.readFileSync(dynamicPagePath, 'utf8');
  
  if (!pageContent.includes('generateStaticParams')) {
    fixes.push("✅ generateStaticParams() wird hinzugefügt für dynamische Route");
    // Füge generateStaticParams hinzu wenn fehlend
    if (pageContent.includes('export default')) {
      const generateStaticParamsCode = `// Generate static params for static export
export async function generateStaticParams() {
  // Return empty array - routes will be handled client-side
  return []
}

`;
      // Füge vor export default ein
      pageContent = pageContent.replace(
        /(export default|export async function generateMetadata)/,
        `${generateStaticParamsCode}$1`
      );
      fs.writeFileSync(dynamicPagePath, pageContent, 'utf8');
      needsFix = true;
    }
  } else if (!pageContent.includes('export async function generateStaticParams')) {
    // Prüfe ob es korrekt exportiert ist
    if (pageContent.includes('generateStaticParams') && !pageContent.includes('export')) {
      fixes.push("✅ generateStaticParams() wird korrekt exportiert");
      pageContent = pageContent.replace(
        /(async )?function generateStaticParams/,
        'export async function generateStaticParams'
      );
      fs.writeFileSync(dynamicPagePath, pageContent, 'utf8');
      needsFix = true;
    }
  }
  
  // Prüfe ob 'use client' in page.tsx ist (sollte nicht sein)
  if (pageContent.includes("'use client'") && pageContent.includes('generateStaticParams')) {
    fixes.push("⚠️  WARNUNG: 'use client' gefunden in page.tsx mit generateStaticParams - sollte entfernt werden");
    // Entferne 'use client' wenn generateStaticParams vorhanden
    pageContent = pageContent.replace(/^'use client'\n/gm, '');
    fs.writeFileSync(dynamicPagePath, pageContent, 'utf8');
    needsFix = true;
  }
}

if (isGitHubPages && !configContent.includes("output:")) {
  console.log('❌ WARNUNG: output: \'export\' fehlt für GitHub Pages!');
  process.exit(1);
}

// Prüfe generateStaticParams wenn GitHub Pages
if (isGitHubPages && fs.existsSync(dynamicPagePath)) {
  let pageContent = fs.readFileSync(dynamicPagePath, 'utf8');
  console.log('📄 Prüfe dynamische Route:');
  console.log(`  - Datei existiert: ✅`);
  console.log(`  - Enthält generateStaticParams: ${pageContent.includes('generateStaticParams') ? '✅' : '❌'}`);
  console.log(`  - Export vorhanden: ${pageContent.includes('export') && pageContent.includes('generateStaticParams') ? '✅' : '❌'}`);
  console.log(`  - async function: ${pageContent.includes('async function generateStaticParams') ? '✅' : '❌'}`);
  console.log(`  - Kein 'use client': ${!pageContent.includes("'use client'") ? '✅' : '❌'}`);
  console.log('');
  
  // FINAL FIX: Stelle sicher, dass generateStaticParams korrekt ist
  if (!pageContent.includes('export async function generateStaticParams')) {
    console.log('🔧 FINAL FIX: generateStaticParams() wird korrigiert...');
    
    // Entferne 'use client' wenn vorhanden
    pageContent = pageContent.replace(/^'use client'\s*\n/gm, '');
    
    // Stelle sicher, dass generateStaticParams am Anfang steht (nach imports)
    const imports = pageContent.match(/^import.*$/gm) || [];
    const restOfFile = pageContent.replace(/^import.*$/gm, '').trim();
    
    const generateStaticParamsCode = `export async function generateStaticParams() {
  return []
}

`;
    
    // Wenn generateStaticParams fehlt, füge es nach imports hinzu
    if (!restOfFile.includes('generateStaticParams')) {
      pageContent = imports.join('\n') + '\n\n' + generateStaticParamsCode + restOfFile;
      fs.writeFileSync(dynamicPagePath, pageContent, 'utf8');
      console.log('✅ generateStaticParams() wurde hinzugefügt!');
      needsFix = true;
    } else {
      // Korrigiere Export wenn falsch
      pageContent = pageContent.replace(
        /(export\s+)?(async\s+)?function\s+generateStaticParams/g,
        'export async function generateStaticParams'
      );
      fs.writeFileSync(dynamicPagePath, pageContent, 'utf8');
      console.log('✅ generateStaticParams() Export wurde korrigiert!');
      needsFix = true;
    }
    
    // Lese Datei nochmal für Validierung
    pageContent = fs.readFileSync(dynamicPagePath, 'utf8');
  }
  
  // Finale Validierung
  if (!pageContent.includes('export async function generateStaticParams')) {
    console.log('❌ KRITISCHER FEHLER: generateStaticParams() konnte nicht korrigiert werden!');
    console.log('📄 Datei-Inhalt:');
    console.log(pageContent);
    process.exit(1);
  }
  
  console.log('✅ generateStaticParams() ist korrekt!');
}

console.log('✅ Alle Checks bestanden!\n');
