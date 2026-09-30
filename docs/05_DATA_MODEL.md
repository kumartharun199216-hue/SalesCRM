# 05. Core Data Model

The application entities are structured consistently across all domain operations and persistent storage collections.

---

### 1. User Entity (`crm_users`)
```typescript
interface User {
  id: string;              // e.g. "USR-001", "USR-S01"
  name: string;            // Full personal name
  email: string;           // Unique email address
  password: string;        // Prototype password string
  mobile: string;          // 10-digit mobile number
  role: 'admin' | 'manager' | 'sales';
  managerId: string | null;// Foreign key to User.id (for sales reps)
  managerName: string | null;
  status: 'Active' | 'Inactive';
  avatar: string;          // URL or initials avatar
  createdAt: string;       // ISO 8601 string
  updatedAt?: string;      // ISO 8601 string
}
```

---

### 2. Customer / Lead Entity (`crm_customers`)
```typescript
interface Customer {
  id: string;              // Unique sequential ID, e.g. "CRM-CUST-000001"
  name: string;            // Account or Business Name
  contactPerson: string;   // Primary contact individual
  mobile: string;          // Unique 10-digit primary phone
  altMobile: string;       // Optional secondary phone
  email: string;           // Contact email
  company: string;         // Company legal entity name
  designation: string;     // Job title / department
  address: string;         // Street address
  city: string;            // City (e.g. Mumbai, Bengaluru)
  state: string;           // State (e.g. Maharashtra, Karnataka)
  country: string;         // Default: "India"
  source: string;          // e.g. "Website Inquiry", "LinkedIn", "Referral"
  stage: string;           // e.g. "New Lead", "Contacted", "Interested", ...
  status: 'Active' | 'Converted' | 'Lost' | 'Not Interested';
  priority: 'High' | 'Medium' | 'Low';
  managerId: string | null;// Assigned Sales Manager ID
  managerName: string | null;
  salespersonId: string | null; // Assigned Sales Rep ID
  salespersonName: string | null;
  createdAt: string;       // ISO 8601 timestamp
  updatedAt: string;       // ISO 8601 timestamp
  lastContacted: string | null; // ISO 8601 timestamp
  nextFollowUp: string | null;  // ISO 8601 timestamp
  notes: string;           // Initial requirements or summary
}
```

---

### 3. Stage History Entity (`crm_stage_history`)
```typescript
interface StageHistory {
  id: string;              // e.g. "CRM-STAGE-000001"
  customerId: string;      // Foreign key to Customer.id
  customerName: string;    // Snapshot of customer name
  fromStage: string;       // Previous pipeline stage
  toStage: string;         // New pipeline stage
  changedBy: string;       // User who executed transition
  changedAt: string;       // ISO 8601 timestamp
  reason: string;          // Business justification remarks
}
```

---

### 4. Follow-up Entity (`crm_followups`)
```typescript
interface Followup {
  id: string;              // e.g. "CRM-FLW-000001"
  customerId: string;      // Foreign key to Customer.id
  customerName: string;    // Denormalized customer name
  salespersonId: string;   // Assigned sales representative ID
  salespersonName: string; // Assigned sales representative name
  date: string;            // YYYY-MM-DD
  time: string;            // HH:MM (24-hour format)
  purpose: string;         // Goal / discussion objective
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'Cancelled';
  completedAt: string | null; // ISO 8601 timestamp
  completedBy: string | null; // User who marked completed
  notes: string;           // Remarks / outcome notes
}
```

---

### 5. Call Record Entity (`crm_calls`)
```typescript
interface CallRecord {
  id: string;              // e.g. "CRM-CALL-000001"
  customerId: string;      // Foreign key to Customer.id
  customerName: string;
  salespersonId: string;   // User ID who placed/received call
  salespersonName: string;
  outcome: string;         // "Connected" | "No Answer" | "Busy" | "Interested", etc.
  notes: string;           // Call summary
  nextAction: string;      // "Schedule Follow-up" | "Send Quote" | "None"
  nextFollowUpDate: string;// Date string or empty
  timestamp: string;       // ISO 8601 timestamp
}
```

---

### 6. Activity Entity (`crm_activities`)
```typescript
interface Activity {
  id: string;              // e.g. "CRM-ACT-000001"
  user: string;            // Acting user name
  role: string;            // Role of acting user
  action: string;          // Standard action type
  customerId: string | null; // Associated customer ID
  description: string;     // Human-readable narrative description
  timestamp: string;       // ISO 8601 timestamp
}
```

---

### 7. Note Entity (`crm_notes`)
```typescript
interface CustomerNote {
  id: string;              // e.g. "CRM-NOTE-000001"
  customerId: string;      // Foreign key to Customer.id
  text: string;            // Note text content
  createdBy: string;       // Author user name
  createdAt: string;       // ISO 8601 timestamp
}
```
