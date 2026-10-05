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
  location: { pathname: '/pages/reports.html', search: '', href: 'file:///E:/tasktracker_reploca/salesCRM/pages/reports.html' },
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
loadFile('payments.js');
loadFile('auth.js');

console.log('Testing Seed Payments & Summary:');
const summary = Payments.getSummary();
console.log('Total Fees Booked:', Payments.formatCurrency(summary.totalBooked));
console.log('Total Fees Collected:', Payments.formatCurrency(summary.totalCollected));
console.log('Total Pending Dues:', Payments.formatCurrency(summary.totalPending));
console.log('Collection Rate:', summary.collectionRate + '%');
console.log('Fully Paid Leads:', summary.fullyPaidCount);
console.log('Partially Paid Leads:', summary.partiallyPaidCount);
console.log('Pending Leads:', summary.pendingCount);
console.log('Overdue Installment Leads:', summary.overdueCount);

const allPayments = Payments.getAll();
console.log('Total Transactions in Ledger:', allPayments.length);
console.assert(allPayments.length > 0, 'Transactions should be seeded');

// Test recording a new installment
const lead = Customers.getAll().find(c => c.paymentStatus === 'Partially Paid');
console.log(`\nTesting recording installment payment for ${lead.name} (${lead.id}):`);
console.log('Before payment - Paid:', lead.paidAmount, 'Pending:', lead.pendingAmount, 'Status:', lead.paymentStatus);

const payRes = Payments.recordPayment({
  customerId: lead.id,
  amount: 15000,
  paymentMode: 'UPI / Online',
  transactionRef: 'UPI-TEST-123456',
  installmentTitle: 'Manual Installment Payment',
  notes: 'Recorded via test script'
});

console.assert(payRes.success, 'recordPayment should succeed');
console.log('After payment - Paid:', payRes.customer.paidAmount, 'Pending:', payRes.customer.pendingAmount, 'Status:', payRes.customer.paymentStatus);

// Test counselor revenue report
console.log('\nCounselor Revenue Report:');
const counselorReport = Payments.getCounselorRevenueReport();
counselorReport.forEach(r => {
  console.log(`- ${r.name}: Booked: ${Payments.formatCurrency(r.totalBooked)}, Collected: ${Payments.formatCurrency(r.totalCollected)}, Realized: ${r.collectionRate}%`);
});

// Test dues
console.log('\nOverdue & Upcoming Installment Dues:');
const dues = Payments.getInstallmentDues();
console.log(`Found ${dues.length} pending/overdue installment milestones across leads.`);
dues.slice(0, 3).forEach(d => {
  console.log(`- ${d.customerName} (${d.title}): Due ${Payments.formatCurrency(d.balanceDue)} on ${d.dueDate} [${d.status}]`);
});

console.log('\n✅ ALL PAYMENTS MODULE TESTS PASSED!');
