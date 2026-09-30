# 02. Features Specification

## 1. Authentication & Role Switcher
- **Demo Credential Authentication**:
  - Administrator: `admin@crm.local` / `admin123`
  - Sales Manager: `manager@crm.local` / `manager123`
  - Sales Representative: `sales@crm.local` / `sales123`
- **1-Click Persona Switcher**: Top header dropdown allows evaluating the CRM across different personas instantly without logging out.
- **Session Management**: Logged-in user context maintained in `crm_current_user`.
- **Route Protection**: Unauthorized access redirects to role-appropriate dashboards.

## 2. Customer & Lead Directory
- **Sequential CRM Identifiers**: Human-readable IDs generated sequentially (e.g. `CRM-CUST-000001`).
- **Duplicate Mobile Validation**: Blocks duplicate entry when mobile number already exists, displaying a direct link to the existing account.
- **Full Account Metadata**: Captures Account Name, Contact Person, Primary Mobile, Alternate Mobile, Email, Company, Designation, Address, City, State, Country, Source, Stage, Status, Priority, Assigned Manager, Assigned Rep, and Internal Notes.
- **Client-Side Search & Multi-Filtering**: Instant multi-condition filtering by text query, stage, status, priority, sales rep, source, city, and configurable rows-per-page pagination.
- **CSV Data Export**: One-click download of filtered accounts to standard CSV format.

## 3. Excel-Sheet Style Pipeline View
- **Spreadsheet Grid Layout**: High-density spreadsheet design featuring gridlines, row numbering (`#1, #2, ...`), and freeze-pane sticky column headers.
- **Top Stage Pill Tabs**: Quick-switch buttons for all 9 stages (`New Lead`, `Contacted`, `Interested`, `Prospect`, `Follow-up`, `Negotiation`, `Converted`, `Not Interested`, `Lost`) with real-time count badges.
- **Sidebar Sub-menu**: Stage-level submenu options with individual lead counters.
- **In-Cell Operations**:
  - Direct Phone Call trigger (`tel:`) and Call Outcome recording modal.
  - Direct WhatsApp chat link (`wa.me/91...`).
  - Direct Email draft link (`mailto:...`).
  - Stage change with mandatory justification.
  - Lead reassignment to Manager and Sales Representative.
  - Quick note posting.
  - Schedule follow-up task.

## 4. Stage Progression & History Audit
- Prevents silent overwriting of customer stages.
- Every stage change prompts a modal for new stage selection and mandatory remarks.
- Generates an immutable history record storing `fromStage`, `toStage`, `changedBy`, `changedAt`, and `reason`.
- Automatically aligns customer lifecycle status (`Active`, `Converted`, `Lost`, `Not Interested`).

## 5. Follow-up Operations
- **Categorization**: Segregated views for `Today's Follow-ups`, `Overdue Follow-ups`, `Upcoming Follow-ups`, and `Completed Follow-ups`.
- **Status Lifecycle**: `Pending` → `Completed` (with completion notes, timestamp, and agent attribution) or `Rescheduled` (with new date/time and reason).
- **Auto-Sync with Customer Profile**: Dynamically updates customer's `nextFollowUp` field.

## 6. Communication Tracking & Call Outcomes
- **Dialer Integration**: Initiates calls via `tel:+91...` and logs `Call Initiated` audit event.
- **Call Outcome Form**: Structured outcome options (`Connected`, `No Answer`, `Busy`, `Switched Off`, `Wrong Number`, `Call Back Requested`, `Interested`, `Not Interested`).
- Captures outcome notes, optional stage update, next action, and schedules next follow-up automatically.
- Logs `Call Recorded` audit trail and updates `lastContacted` timestamp.

## 7. Centralized Audit Trail & Activity Logging
- Global logging mechanism capturing 15 key operations: Login, Logout, Customer Created, Customer Edited, Customer Viewed, Lead Assigned, Lead Reassigned, Stage Changed, Call Initiated, Call Recorded, WhatsApp Opened, Email Initiated, Note Added, Follow-up Created, Follow-up Completed, and Customer Imported.
- Full text search, action filter, user filter, date filter, and CSV export.

## 8. Role-Tailored Dashboards & Dynamic Reports
- **Admin Dashboard**: Full company pipeline funnel, stage distribution doughnut, sales rep performance leaderboard, and real-time audit feed.
- **Manager Dashboard**: Filtered strictly to reporting team members, team pipeline volume, and team follow-up queue.
- **Sales Rep Workspace**: Filtered strictly to assigned portfolio, today's urgent follow-ups, and personal activity log.
- **Analytical Reports**:
  - Stage Movement Report (transition count between any two stages across customizable date ranges).
  - Sales Team Performance Report (leads assigned, calls made, closed deals, and win rate).
  - Lead Source Conversion Attribution.

## 9. CSV Lead Importer
- Client-side CSV file parser supporting drag-and-drop.
- Auto-validation against duplicate mobile numbers and missing required fields.
- Pre-import validation summary report (Ready, Duplicate, Invalid).
- Generates CRM IDs and logs batch import activity.

## 10. Data Governance & Backup
- Complete JSON database snapshot export for backup.
- JSON snapshot restore function.
- LocalStorage footprint diagnostics.
- Factory Demo Data reset button.
