# 04. Application Workflow & Architecture Flow

## High-Level Architectural Flow
```
User Interaction (UI)
       │
       ▼
Page Controller / App Layer (`app.js`, `pipeline.js`, etc.)
       │
       ▼
Domain Business Modules (`customers.js`, `leads.js`, `followups.js`, `communication.js`)
       │
       ▼
Data Layer (`storage.js`)
       │
       ▼
Browser `localStorage` Persistence
```

---

## Detailed Step-by-Step Business Flows

### 1. User Authentication & Initial Session Flow
1. User navigates to CRM entry point (`index.html` or direct page URL).
2. `Auth.isAuthenticated()` checks `crm_current_user` in `localStorage`.
   - If not authenticated, browser redirects to `pages/login.html`.
   - If authenticated, redirects to role-specific dashboard (`admin-dashboard.html`, `manager-dashboard.html`, or `salesperson-dashboard.html`).
3. User signs in manually or clicks a 1-Click Demo Persona button.
4. `Auth.login()` verifies credentials, checks active status, writes session to `crm_current_user`, and logs a `Login` activity record.

### 2. Lead Ingestion & Creation Flow
1. User clicks "+ Add Customer" (header button or page action).
2. Modal opens with mandatory and optional fields.
3. Form validation triggers:
   - Verifies customer name and 10-digit mobile number format.
   - Executes `Validation.checkDuplicateMobile(mobile)` against all existing customer records.
   - If duplicate is found: displays existing customer name, CRM ID, and a link to open their profile. Creation is halted.
4. If unique:
   - Invokes `StorageService.generateId('CRM-CUST')` to generate sequential ID (e.g. `CRM-CUST-000033`).
   - Writes new record to `crm_customers`.
   - Automatically logs initial stage in `crm_stage_history`.
   - Saves initial note to `crm_notes` if provided.
   - Logs `Customer Created` in `crm_activities`.
   - Displays success toast notification and redirects to `customer-details.html?id=...`.

### 3. Excel-Sheet Style Pipeline Navigation & Stage Transition Flow
1. User navigates to Pipeline (`pages/pipeline.html`) or selects a stage sub-menu item from the sidebar (e.g. `pipeline.html?stage=Interested`).
2. Page loads the high-density Excel spreadsheet grid.
3. Top pill tabs display count of accounts in each stage; active stage pill is highlighted.
4. Moving a Lead between Stages:
   - User clicks the stage badge or "Move" button on any row.
   - Modal displays Current Stage, dropdown for New Stage, and a mandatory Reason textarea.
   - On confirmation, `Pipeline.changeStage(customerId, newStage, reason)`:
     - Generates sequential history ID (`CRM-STAGE-XXXXXX`).
     - Inserts record into `crm_stage_history`.
     - Updates customer's `stage`, `status`, and `updatedAt` in `crm_customers`.
     - Logs `Stage Changed` activity with reason.
     - Updates live stage pill counts and refreshes the sheet view.

### 4. Communication & Call Outcome Recording Flow
1. User clicks "Call" on any table row or customer profile:
   - Browser invokes `tel:+91XXXXXXXXXX`.
   - System creates a `Call Initiated` audit log.
   - Prompt automatically opens Call Outcome Recording modal.
2. User selects Call Outcome (`Connected`, `Interested`, `Call Back Requested`, etc.) and adds discussion notes.
3. If next action is "Schedule Follow-up":
   - Creates a new record in `crm_followups`.
   - Updates customer's `nextFollowUp` field.
4. If stage update is selected:
   - Executes stage transition with audit history.
5. Updates customer's `lastContacted` timestamp and logs `Call Recorded` activity.

### 5. Follow-up Lifecycle Flow
1. Scheduled follow-up appears under `Today's Follow-ups` or `Upcoming Follow-ups`.
2. If date has elapsed and status is still `Pending`, item automatically moves to `Overdue Follow-ups`.
3. Completing Follow-up:
   - Agent clicks "Complete", enters summary notes.
   - Record status changes to `Completed`, recording `completedAt` and `completedBy`.
   - `crm_activities` logs `Follow-up Completed`.
4. Rescheduling:
   - Agent picks new date/time and justification.
   - Updates record and syncs with customer's `nextFollowUp`.
