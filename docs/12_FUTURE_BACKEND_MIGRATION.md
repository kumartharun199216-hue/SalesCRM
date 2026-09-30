# 12. Future Backend Migration Blueprint

## Strategic Architecture for Backend Readiness
Apex Sales CRM was intentionally designed so that migrating from client-side `localStorage` to a real production backend requires **zero frontend redesign** and minimal code modification.

---

### Migration Flow Comparison

#### Current Prototype Flow
```
UI Layer (Forms / Tables / Excel Grid)
       ↓
Business Functions (Customers.create(), Pipeline.changeStage())
       ↓
Data Layer (StorageService.getData(), StorageService.saveData())
       ↓
Browser localStorage
```

#### Target Production Backend Flow
```
UI Layer (Identical HTML, CSS & Modals)
       ↓
Business Functions (Customers.create(), Pipeline.changeStage())
       ↓
API Service Layer (ApiService.post('/api/customers'), ApiService.patch('/api/pipeline/stage'))
       ↓
REST / GraphQL Backend (Node.js / Express / NestJS / Django / FastAPI)
       ↓
Database Engine (PostgreSQL / MongoDB / MySQL)
```

---

### Step-by-Step Migration Steps

#### Step 1: Implement API Service Abstraction
Create `js/api.js` to mirror the signature of `StorageService`:
```javascript
const ApiService = {
  baseUrl: 'https://api.crm.example.com/v1',

  async get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${this.baseUrl}${endpoint}?${query}`, { credentials: 'include' });
    return res.json();
  },

  async post(endpoint, body) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    return res.json();
  }
};
```

#### Step 2: Swap Domain Modules from Synchronous to Async
Update domain methods in `js/customers.js`, `js/pipeline.js`, and `js/followups.js` to use `async/await` and call `ApiService`:
```javascript
// Example in js/customers.js
async create(data) {
  const response = await ApiService.post('/customers', data);
  if (!response.success) return response;
  return { success: true, customer: response.data };
}
```

#### Step 3: Implement Database Schema in PostgreSQL or MongoDB
The data contracts documented in `docs/05_DATA_MODEL.md` translate directly to relational tables or document collections:
- `users` table with password hashing (bcrypt) and JWT session tokens.
- `customers` table with unique constraint on `mobile` column (`CREATE UNIQUE INDEX idx_cust_mobile ON customers(mobile);`).
- `stage_history` table with foreign key `customer_id` and indexing on `created_at`.
- `followups`, `calls`, `activities`, and `notes` tables.

#### Step 4: Secure Authentication & RBAC Middleware
Replace client-side role checks in `js/auth.js` with server-side HTTP-only cookies and RBAC middleware:
```javascript
// Express.js middleware example:
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied.' });
    }
    next();
  };
}
```

#### Step 5: Replace Communication Placeholders with Real Gateways
- **Phone Calls**: Connect with WebRTC or telephony APIs (Twilio, Exotel, Plivo).
- **WhatsApp**: Connect with Meta WhatsApp Business Cloud API.
- **Email**: Connect with SendGrid, Amazon SES, or Mailgun.
