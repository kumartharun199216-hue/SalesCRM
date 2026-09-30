# 06. Local Storage Schema & Architecture

All application persistence is centralized through the `StorageService` layer in `js/storage.js`. Direct invocations of `localStorage` are prohibited across component and page files to ensure clean decoupling.

---

### Storage Keys Constant (`CRM_STORAGE_KEYS`)

```javascript
const CRM_STORAGE_KEYS = {
  USERS: 'crm_users',
  CUSTOMERS: 'crm_customers',
  LEADS: 'crm_leads',
  FOLLOWUPS: 'crm_followups',
  ACTIVITIES: 'crm_activities',
  CALLS: 'crm_calls',
  NOTES: 'crm_notes',
  STAGE_HISTORY: 'crm_stage_history',
  SETTINGS: 'crm_settings',
  CURRENT_USER: 'crm_current_user',
  COUNTERS: 'crm_counters'
};
```

---

### Key-by-Key Storage Schema

#### 1. `crm_users`
- **Data Type**: Array of User objects (`User[]`)
- **Initial Size**: 11 accounts (2 Admins, 3 Managers, 6 Sales Reps)
- **Serialization**: JSON Stringified Array

#### 2. `crm_customers`
- **Data Type**: Array of Customer objects (`Customer[]`)
- **Initial Size**: 32 enterprise accounts
- **Serialization**: JSON Stringified Array

#### 3. `crm_stage_history`
- **Data Type**: Array of StageHistory objects (`StageHistory[]`)
- **Purpose**: Immutable audit log of all lead stage changes

#### 4. `crm_followups`
- **Data Type**: Array of Followup objects (`Followup[]`)
- **Purpose**: Stores scheduled, completed, and overdue follow-up tasks

#### 5. `crm_calls`
- **Data Type**: Array of CallRecord objects (`CallRecord[]`)
- **Purpose**: Stores call logs with outcome classifications and remarks

#### 6. `crm_activities`
- **Data Type**: Array of Activity objects (`Activity[]`)
- **Capacity**: Maintained up to the 1,000 most recent events (FIFO ring buffer)

#### 7. `crm_notes`
- **Data Type**: Array of CustomerNote objects (`CustomerNote[]`)
- **Purpose**: Threaded notes attached to customer accounts

#### 8. `crm_counters`
- **Data Type**: Object mapping entity prefix to integer (`{ [prefix: string]: number }`)
- **Example**:
  ```json
  {
    "CRM-CUST": 32,
    "CRM-ACT": 12,
    "CRM-FLW": 9,
    "CRM-CALL": 6,
    "CRM-STAGE": 8,
    "CRM-NOTE": 4,
    "USR": 12
  }
  ```

#### 9. `crm_settings`
- **Data Type**: System configuration object
- **Properties**: `crmName`, `currency`, `timezone`, `leadStages`, `leadSources`

#### 10. `crm_current_user`
- **Data Type**: Active User object or `null`
- **Purpose**: Client-side session container

---

### Core Storage Methods
- `StorageService.getData(key, defaultValue = [])`: Safe parse with fallback.
- `StorageService.saveData(key, data)`: Serializes object to JSON and writes to storage.
- `StorageService.updateData(key, updateFn)`: Atomic in-memory mutation.
- `StorageService.deleteData(key)`: Deletes individual key.
- `StorageService.clearData()`: Purges all CRM-specific keys.
- `StorageService.generateId(prefix)`: Increments sequential counter and formats 6-digit zero-padded ID (e.g. `CRM-CUST-000001`).
