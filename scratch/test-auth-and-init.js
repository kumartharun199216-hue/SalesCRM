// Test Auth auto-fallback, App initialization, and import-leads logic
const fs = require('fs');
const path = require('path');

// Mock browser window and DOM globals
const localStorageData = {};
global.localStorage = {
  getItem: (k) => localStorageData[k] || null,
  setItem: (k, v) => { localStorageData[k] = String(v); },
  removeItem: (k) => { delete localStorageData[k]; },
  clear: () => { Object.keys(localStorageData).forEach(k => delete localStorageData[k]); }
};

global.window = {
  location: { pathname: '/pages/import-leads.html', search: '', href: 'file:///E:/tasktracker_reploca/salesCRM/pages/import-leads.html' },
  history: { replaceState: () => {} },
  addEventListener: () => {},
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  }
};
global.document = global.window.document;

// Load files with global assignment
const loadFile = (file) => {
  const content = fs.readFileSync(path.join(__dirname, '../js', file), 'utf-8');
  const fn = new Function('window', 'document', 'localStorage', content);
  fn(global.window, global.document, global.localStorage);
  Object.assign(global, global.window);
};

loadFile('storage.js');
loadFile('utils.js');
loadFile('seed-data.js');
loadFile('users.js');
loadFile('activities.js');
loadFile('customers.js');
loadFile('followups.js');
loadFile('auth.js');
loadFile('app.js');

console.log('Testing fresh session fallback:');
// Ensure localStorage has no CURRENT_USER
localStorage.removeItem('crm_current_user');

const currentUser = Auth.getCurrentUser();
console.log('getCurrentUser returned:', currentUser ? `${currentUser.name} (${currentUser.role})` : 'null');
if (!currentUser) throw new Error('currentUser should not be null');

const reqAuthUser = Auth.requireAuth(['admin', 'manager']);
console.log('requireAuth(["admin", "manager"]) returned:', reqAuthUser ? `${reqAuthUser.name} (${reqAuthUser.role})` : 'null');
if (!reqAuthUser || !reqAuthUser.id) throw new Error('requireAuth should return user object');

// Test App.initCommon
console.log('Testing App.initCommon:');
App.initCommon(reqAuthUser, 'import');
console.log('App.initCommon executed successfully!');

// Test with undefined/null user
App.initCommon(null, 'customers');
console.log('App.initCommon(null) executed successfully!');

console.log('ALL TESTS PASSED!');
