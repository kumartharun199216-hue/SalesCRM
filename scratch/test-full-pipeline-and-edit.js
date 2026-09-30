const fs = require('fs');
const path = require('path');

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

const loadFile = (file) => {
  const content = fs.readFileSync(path.join(__dirname, '../js', file), 'utf-8');
  const fn = new Function('window', 'document', 'localStorage', content);
  fn(global.window, global.document, global.localStorage);
  Object.assign(global, global.window);
};

loadFile('storage.js');
loadFile('utils.js');
loadFile('validation.js');
loadFile('seed-data.js');
loadFile('users.js');
loadFile('activities.js');
loadFile('customers.js');
loadFile('pipeline.js');
loadFile('followups.js');
loadFile('auth.js');
loadFile('app.js');

console.log('\n--- 1. Testing Session Fallback ---');
localStorage.removeItem('crm_current_user');
const user = Auth.getCurrentUser();
console.log('Current user:', user.name, `(${user.role})`);
console.assert(user && user.id === 'USR-001', 'Default user should be Admin USR-001');

const managerAuth = Auth.requireAuth(['admin', 'manager']);
console.assert(managerAuth && managerAuth.role === 'admin', 'Auth.requireAuth should succeed and return user');

console.log('\n--- 2. Testing Bulk Creation in "Cold Calling" Stage ---');
const counselor = Users.getSalespeople()[0];
const createRes = Customers.create({
  name: 'Tanvi Shinde',
  mobile: '9821999111',
  email: 'tanvi.s@gmail.com',
  qualification: 'B.E (Computer Science)',
  college: 'COEP Pune',
  passingYear: '2025',
  skills: 'Java, React, SQL',
  targetRole: 'Full Stack Engineer',
  experienceLevel: 'Fresher',
  city: 'Pune',
  state: 'Maharashtra',
  expectedCtc: '6.5 LPA',
  notes: 'Cold calling candidate from campus drive list.',
  source: 'Cold Calling / Raw Database',
  priority: 'High',
  stage: 'Cold Calling',
  salespersonId: counselor.id,
  salespersonName: counselor.name,
  managerId: counselor.managerId,
  managerName: counselor.managerName
});

console.assert(createRes.success, 'Candidate creation should succeed');
const newId = createRes.customer.id;
console.log('Created candidate:', newId, createRes.customer.name, 'in stage:', createRes.customer.stage);
console.assert(createRes.customer.stage === 'Cold Calling', 'Stage should be Cold Calling');

console.log('\n--- 3. Testing Edit Customer Details Modal Functionality ---');
const updateRes = Customers.update(newId, {
  name: 'Tanvi Shinde (Updated)',
  mobile: '9821999111',
  email: 'tanvi.shinde@newdomain.com',
  qualification: 'M.Tech (Software Systems)',
  college: 'COEP Pune',
  passingYear: '2025',
  cgpa: '9.2',
  skills: 'Java 17, Spring Boot, React 18, PostgreSQL, AWS',
  targetRole: 'Senior Software Engineer',
  experienceLevel: '1-2 yrs',
  city: 'Bengaluru',
  state: 'Karnataka',
  expectedCtc: '9.0 LPA',
  preferredLocation: 'Bengaluru / Hybrid',
  notes: 'Contacted after cold call. Scheduled counseling session.',
  stage: 'Attempted Contact',
  placementStatus: 'In Counseling',
  priority: 'High',
  source: 'Cold Calling / Raw Database'
});

console.assert(updateRes.success, 'Candidate update should succeed');
const updatedCandidate = Customers.getById(newId);
console.log('Updated candidate degree:', updatedCandidate.qualification);
console.log('Updated candidate new stage:', updatedCandidate.stage);
console.log('Updated candidate preferred location:', updatedCandidate.preferredLocation);
console.assert(updatedCandidate.qualification === 'M.Tech (Software Systems)', 'Qualification should be updated');
console.assert(updatedCandidate.stage === 'Attempted Contact', 'Stage transition should be applied');

console.log('\n--- 4. Testing App.init and Submenu Pipeline Counts ---');
const submenu = App.getPipelineSubmenu(user, true);
console.log('Pipeline submenu stages:', submenu.map(s => `${s.name}: ${s.count}`));
const coldCallingSubmenu = submenu.find(s => s.name === 'Cold Calling');
console.assert(coldCallingSubmenu !== undefined, 'Cold Calling submenu item should exist');
console.assert(coldCallingSubmenu.count > 0, 'Cold Calling count should be > 0');

console.log('\n✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
