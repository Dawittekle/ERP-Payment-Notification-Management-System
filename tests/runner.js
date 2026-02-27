/**
 * QINDE ERP — Automated & Smoke Test Runner
 * Validates project structure, design system tokens, layout compliance, component suite, and Auth/Role Cockpits integrity.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('\n======================================================');
console.log('       QINDE ERP — Automated Smoke Test Suite         ');
console.log('======================================================\n');

// 1. Repository & Ops Environment Tests
console.log('🔍 Group 1: Repository Structure & Docker Configuration');
assert(fs.existsSync(path.join(ROOT_DIR, 'docker-compose.yml')), 'docker-compose.yml exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'run.sh')), 'Executable run.sh launcher exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'README.md')), 'Master README.md exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'docker/Dockerfile.frontend')), 'Dockerfile.frontend exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'docker/Dockerfile.backend')), 'Dockerfile.backend exists');

// 2. Documentation & Phases Tests
console.log('\n🔍 Group 2: Master Documentation & Phase Guidelines');
assert(fs.existsSync(path.join(ROOT_DIR, 'docs/QINDE_ERP_Brand_Name.md')), 'QINDE Brand Name document exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'docs/frontend/FRONTEND_IMPLEMENTATION_PHASES.md')), 'Frontend implementation phases guide exists');
assert(fs.existsSync(path.join(ROOT_DIR, 'docs/frontend/QINDE/QINDE_DESIGN.md')), 'QINDE UX/UI Design system contract exists');

// 3. Frontend Architecture & Design Tokens Tests
console.log('\n🔍 Group 3: Frontend Architecture & Token Specification');
const tokensPath = path.join(ROOT_DIR, 'frontend/src/styles/tokens.css');
if (fs.existsSync(tokensPath)) {
  const tokenContent = fs.readFileSync(tokensPath, 'utf8');
  assert(tokenContent.includes('--color-brand-navy: #102A43'), 'Token --color-brand-navy (#102A43) present');
  assert(tokenContent.includes('--color-brand-green: #198754'), 'Token --color-brand-green (#198754) present');
  assert(tokenContent.includes('--color-brand-gold: #D9A441'), 'Token --color-brand-gold (#D9A441) present');
  assert(tokenContent.includes('--color-surface-canvas: #F7F9FC'), 'Token --color-surface-canvas (#F7F9FC) present');
  assert(tokenContent.includes('Inter'), 'Primary typography specifies Inter font');
} else {
  assert(false, 'frontend/src/styles/tokens.css exists');
}

// 4. Component Structure Tests
console.log('\n🔍 Group 4: Phase 1 Shell Components Verification');
const componentsDir = path.join(ROOT_DIR, 'frontend/src/components');
assert(fs.existsSync(path.join(componentsDir, 'layout/ERPShell.tsx')), 'ERPShell component exists');
assert(fs.existsSync(path.join(componentsDir, 'layout/ERPSidebar.tsx')), 'ERPSidebar component exists');
assert(fs.existsSync(path.join(componentsDir, 'layout/ERPTopBar.tsx')), 'ERPTopBar component exists');
assert(fs.existsSync(path.join(componentsDir, 'overlay/ERPCommandCenter.tsx')), 'ERPCommandCenter component exists');
assert(fs.existsSync(path.join(componentsDir, 'brand/QindeLogo.tsx')), 'QindeLogo brand SVG component exists');

// 5. Phase 2 Shared Component Suite Verification
console.log('\n🔍 Group 5: Phase 2 Shared Component Suite Verification');
assert(fs.existsSync(path.join(componentsDir, 'ui/Button.tsx')), 'Button primitive component exists');
assert(fs.existsSync(path.join(componentsDir, 'ui/Input.tsx')), 'Input primitive component exists');
assert(fs.existsSync(path.join(componentsDir, 'ui/Badge.tsx')), 'Badge primitive component exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPMetric.tsx')), 'ERPMetric KPI stat component exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPStatus.tsx')), 'ERPStatus icon+label+color badge component exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPMoney.tsx')), 'ERPMoney financial currency formatter exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPTable.tsx')), 'ERPTable high-density data table exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPFilterBar.tsx')), 'ERPFilterBar filter toolbar exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPObjectHeader.tsx')), 'ERPObjectHeader master-detail header exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPTimeline.tsx')), 'ERPTimeline transaction signal rail exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPEmptyState.tsx')), 'ERPEmptyState placeholder component exists');
assert(fs.existsSync(path.join(componentsDir, 'erp/ERPSkeleton.tsx')), 'ERPSkeleton loading placeholder component exists');

// 6. Phase 3 Auth & Role Cockpits Verification
console.log('\n🔍 Group 6: Phase 3 Auth & Role Cockpits Verification');
assert(fs.existsSync(path.join(componentsDir, 'auth/LoginPage.tsx')), 'QINDE LoginPage component exists');
assert(fs.existsSync(path.join(componentsDir, 'dashboards/FinanceManagerCockpit.tsx')), 'FinanceManagerCockpit component exists');
assert(fs.existsSync(path.join(componentsDir, 'dashboards/AccountantCockpit.tsx')), 'AccountantCockpit component exists');
assert(fs.existsSync(path.join(componentsDir, 'dashboards/AdminCockpit.tsx')), 'AdminCockpit component exists');
assert(fs.existsSync(path.join(componentsDir, 'dashboards/CustomerCockpit.tsx')), 'CustomerCockpit component exists');

console.log('\n======================================================');
console.log(` Test Summary: ${passedTests}/${totalTests} Passed`);
console.log('======================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('✨ All smoke tests passed successfully!\n');
}
