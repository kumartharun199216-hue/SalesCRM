# Screen-by-Screen Functional Specification
## Career Apex CRM — Student Placement & Career Counseling Sales CRM

---

### Document Control
- **Document Identifier:** SCREEN-APEX-04
- **Version:** 2.0
- **Status:** Approved
- **Audience:** Frontend Developers, QA Engineers, UI/UX Designers, Product Owners

---

## Screen Directory Overview

| # | Screen Name | File Path | Route / URL | Target Roles |
|---|:---|:---|:---|:---|
| **01** | **Login & Role Selector** | `index.html` | `/index.html` | Public / All |
| **02** | **Executive Admin Dashboard** | `pages/admin-dashboard.html` | `/pages/admin-dashboard.html` | Admin |
| **03** | **Sales Manager Command Center** | `pages/manager-dashboard.html` | `/pages/manager-dashboard.html` | Manager, Admin |
| **04** | **Counselor Daily Workspace** | `pages/salesperson-dashboard.html` | `/pages/salesperson-dashboard.html` | Counselor (Sales), Manager, Admin |
| **05** | **Student Job Seekers Directory**| `pages/customers.html` | `/pages/customers.html` | All (Scoped) |
| **06** | **Student Profile Dossier** | `pages/customer-details.html` | `/pages/customer-details.html?id=CRM-STU-XXX` | All (Scoped) |
| **07** | **Excel Spreadsheet Pipeline** | `pages/pipeline.html` | `/pages/pipeline.html?stage=...` | All (Scoped) |
| **08** | **Bulk Lead Import Engine** | `pages/import-leads.html` | `/pages/import-leads.html` | Admin, Manager |
| **09** | **Follow-up & Task Agenda** | `pages/followups.html` | `/pages/followups.html` | All (Scoped) |
| **10** | **Communication Center** | `pages/communication.html` | `/pages/communication.html` | All (Scoped) |
| **11** | **Audit Trail & Activity Log** | `pages/activities.html` | `/pages/activities.html` | All |
| **12** | **Sales Team & Counselor Roster**| `pages/team.html` | `/pages/team.html` | Admin, Manager |
| **13** | **Placement Intelligence Reports**| `pages/reports.html` | `/pages/reports.html` | Admin, Manager |
| **14** | **Settings & Demo Configuration**| `pages/settings.html` | `/pages/settings.html` | Admin |

---

## Screen 01: Login & Role Selector (`index.html`)

### 1.1 Screen Purpose & Objective
Serves as the primary security gate for user authentication, and provides a 1-click demo persona switcher for testing different organizational perspectives (Admin, Manager, Counselor) without manually typing credentials.

### 1.2 Layout & Component Breakdown
```
+-------------------------------------------------------------+
|                     CAREER APEX CRM LOGO                    |
|             Student Placement & Counseling Platform         |
+-------------------------------------------------------------+
|  [Email Input Field]                                        |
|  [Password Input Field]                                     |
|  [ ] Remember Me                      [Forgot Password?]    |
|  [         SIGN IN TO CRM DASHBOARD (Button)             ]  |
+-------------------------------------------------------------+
|  --- OR INSTANT DEMO LOGIN (1-Click Persona Switcher) ---   |
|  [ Rajesh Sharma - Admin ]                                  |
|  [ Priya Patel - Sales Manager ]                            |
|  [ Amit Verma - Career Counselor ]                          |
+-------------------------------------------------------------+
```

### 1.3 UI Controls & Inputs
- **Email Field (`login-email`):** Required text input, validated for email syntax.
- **Password Field (`login-password`):** Password masked input.
- **Demo Switcher Buttons:**
  - `btn-demo-admin`: Logs in Rajesh Sharma (`USR-001`), redirects to `admin-dashboard.html`.
  - `btn-demo-manager`: Logs in Priya Patel (`USR-002`), redirects to `manager-dashboard.html`.
  - `btn-demo-sales`: Logs in Amit Verma (`USR-004`), redirects to `salesperson-dashboard.html`.

### 1.4 State Mutations & Data Flow
- Sets active session into `crm_session` with user object `{ id, name, email, role, avatar }`.
- Sets `crm_session_timestamp` for timeout tracking.
- Redirects user based on `user.role`.

---

## Screen 02: Executive Admin Dashboard (`pages/admin-dashboard.html`)

### 2.1 Screen Purpose & Objective
Provides executive leadership with real-time visibility into overall candidate intake, placement revenue, cash collected, pipeline velocity, and counselor performance across all centers.

### 2.2 Layout & Component Breakdown
1. **Header Strip:** Welcome greeting, quick action buttons: "Detailed Reports" $\rightarrow$ `reports.html`, "Open Pipeline" $\rightarrow$ `pipeline.html`.
2. **Placement Fee & Revenue Realization Banner:**
   - Total Booked Fee (`dash-fee-booked`): Aggregate contracted fees.
   - Realized Cash Collected (`dash-fee-collected`): Cash received in accounts.
   - Pending Dues (`dash-fee-pending`): Outstanding balance + Overdue milestones badge.
   - Collection Realization Rate % with visual progress bar (`dash-fee-rate-bar`).
3. **Candidate Operational KPIs (8 Metric Cards):**
   - Total Students (`kpi-total-leads`)
   - New Leads (`kpi-new-leads`)
   - Contacted (`kpi-contacted`)
   - Interested (`kpi-interested`)
   - Prospects (`kpi-prospects`)
   - Converted Deals (`kpi-converted`) + Win Rate %
   - Lost / Dropped Candidates (`kpi-lost`)
   - Today's Follow-ups (`kpi-today-followups`) + Overdue count
4. **Analytics Charts Grid:**
   - Left: Pipeline Stage Breakdown (Chart.js Bar Chart).
   - Right: Pipeline Stage Share (Chart.js Doughnut Chart).
5. **Team Leaderboard & Live Audit Trail:**
   - Left: Counselor Performance Leaderboard table (Counselor, Manager, Leads, Calls, Converted, Win Rate %).
   - Right: Real-time System Audit Feed (`recent-activities-list`).

---

## Screen 03: Sales Manager Command Center (`pages/manager-dashboard.html`)

### 3.1 Screen Purpose & Objective
Enables regional and center sales managers to oversee their direct reporting counselors, monitor team revenue realization, reassign leads, and track daily scheduled follow-ups.

### 3.2 Layout & Component Breakdown
1. **Header Strip:** Greeting with dynamic `Manager: [Name]` badge, "Reassign Leads" and "Team Pipeline" buttons.
2. **Team Placement Revenue Banner:**
   - Team Booked Fee (`mgr-fee-booked`)
   - Team Cash Collected (`mgr-fee-collected`)
   - Team Pending Dues (`mgr-fee-pending`) + Overdue Milestones badge
   - Team Collection Rate % with progress bar (`mgr-fee-rate-bar`)
3. **Team Pipeline KPIs:** Direct Team Members, Total Team Students, Today's Follow-ups, Interested Leads, Active Prospects, Team Converted.
4. **Visuals & Team Reps Grid:**
   - Team Pipeline Distribution Chart.
   - Reporting Counselors Table (`mgr-team-reps-tbody`) with assigned counts, converted counts, and a direct "View Leads" action button.
5. **Actionable Feeds:**
   - Urgent Team Follow-ups queue (`mgr-today-followups-list`).
   - Team Activity Audit Feed (`mgr-team-activities-list`).

---

## Screen 04: Career Counselor Daily Workspace (`pages/salesperson-dashboard.html`)

### 4.1 Screen Purpose & Objective
The daily operational cockpit for individual counselors to execute cold calls, follow-up calls, WhatsApp messaging, and record student installment payments.

### 4.2 Layout & Component Breakdown
1. **Header Strip:** Counselor greeting with role badge, "My Pipeline" $\rightarrow$ `pipeline.html`, "My Follow-ups" $\rightarrow$ `followups.html`.
2. **Personal Target & Collection Banner:**
   - Personal Booked Fees (`rep-fee-booked`)
   - Personal Cash Collected (`rep-fee-collected`)
   - Personal Pending Dues (`rep-fee-pending`) + Overdue Milestones badge
   - Personal Realization Rate % (`rep-fee-rate`) with progress bar
3. **Personal Pipeline KPIs:** My Leads, Today's Follow-ups, Overdue Follow-ups, Interested, Prospects, Closed Placements.
4. **Today's Action Tasks Queue (`rep-today-tasks-container`):**
   - High-priority task cards grouped by urgency (Overdue tasks highlighted in red).
   - 1-Click Action Buttons on each card:
     - `Call`: Opens telephony dialer.
     - `WhatsApp`: Opens WhatsApp Web with pre-filled message.
     - `Email`: Opens email drawer.
     - `Complete`: Marks task done with outcome notes.
5. **My Active Portfolio Table (`rep-recent-leads-tbody`):** Quick-reference list of assigned candidates and current stages.

---

## Screen 05: Student Job Seekers Directory (`pages/customers.html`)

### 5.1 Screen Purpose & Objective
Master searchable and filterable candidate directory providing comprehensive access to student profiles, qualifications, stages, placement fees, and counselor assignments.

### 5.2 Multi-Filter Ribbon Controls
- **Row 1:**
  - Search Keyword: Live search matching Student ID, Name, College, Qualification, Skills, Mobile.
  - Pipeline Stage: Filter by any of the 10 stages or `All Stages`.
  - Placement Status: `All`, `Active`, `In Discussion`, `Placed / Hired`, `Dropped / Inactive`.
  - Priority: `All`, `High`, `Medium`, `Low`.
- **Row 2:**
  - Career Counselor: Dropdown of all sales reps.
  - Passing Year (YOP): `2026`, `2025`, `2024`, `2023`, `2022`.
  - City: Dynamic list of candidate cities.
  - **Placement Fee Status:** `All`, `Fully Paid`, `Partially Paid`, `Pending`, `Overdue`.
  - Rows per page: `10`, `25`, `50`.
  - Clear Filters button: Resets all inputs and reloads table.

### 5.3 Directory Table Columns
1. `Student ID`: Clickable link $\rightarrow$ `customer-details.html?id=...`
2. `Candidate & Degree`: Student Name + Qualification/Degree.
3. `College / University`: College name + Passing Year (YOP) + City.
4. `Target Role & Skills`: Preferred job title + skills tags.
5. `Mobile Phone`: Formatted 10-digit number.
6. `Stage`: Stage badge (e.g. `Cold Calling`, `Interested`).
7. **`Placement Fee & Dues`:** Bold total fee, paid vs pending balance, and payment status badge (`Fully Paid`, `Partially Paid`, `Pending`, `Overdue`).
8. `Status`: Status badge (`Active`, `Converted`, `Lost`).
9. `Priority`: Priority badge.
10. `Counselor`: Assigned counselor name + reporting manager.
11. `Next Follow-up`: Date formatted (colored red if past current date).
12. `Quick Actions`: View Profile (Eye), Edit Profile (Pencil), Call (Phone), WhatsApp (Green icon), Email (Envelope), Delete (Trash - Admin only).

### 5.4 Modals
- **Edit Student Profile Modal (`edit-customer-modal`):**
  - Section 1: Candidate Details (Name, Email, Mobile, Alternate Mobile).
  - Section 2: Academic Background (Degree, College, YOP, Experience Level, CGPA/%).
  - Section 3: Job Preferences & Skills (Target Role, Skills, City, State, Location, CTC, Address).
  - Section 4: Pipeline & Assignment (Stage, Status, Priority, Source, Manager, Counselor).
  - **Section 5: Placement Fee & Payment Plan:** Agreed Placement Fee (₹), Payment Plan (`Full Upfront`, `2 Installments`, `3 Installments`, `4 Installments`), Payment Status (`Pending`, `Partially Paid`, `Fully Paid`).
  - Section 6: Counseling Notes.

---

## Screen 06: Student Profile Dossier (`pages/customer-details.html`)

### 6.1 Screen Purpose & Objective
The central, complete record for an individual student candidate. Aggregates identity, academic history, counseling notes, call logs, follow-ups, stage transitions, and placement fee financial ledgers.

### 6.2 Hero Identity Banner
- Candidate Avatar with initials.
- Full Name, Student Code (`CRM-STU-XXX`), Primary Phone, WhatsApp Icon, Email, City, Expected CTC.
- **Stage Progression Dropdown:** Allows moving candidate to any of the 10 stages; prompts mandatory reason modal.
- **Hero Action Toolbar:** Call, WhatsApp, Email, Schedule Follow-up, Edit Profile.

### 6.3 Seven Tabbed Dossier Sections

#### Tab 1: Overview & Academic Profile (`tab-overview`)
- Academic Background Card: College, Degree, Passing Year, CGPA, Experience.
- Job Preferences Card: Target Role, Technical Skills, Preferred Location, Expected CTC.
- **Placement Fee Summary Card:** Total Agreed Fee, Cash Paid, Outstanding Balance, Payment Plan, Status badge, and quick link to "View Full Ledger".
- Recent Counseling Notes preview.

#### Tab 2: Activity Timeline (`tab-timeline`)
- Chronological list of all system interactions with timestamps, action badges, and author names.

#### Tab 3: Counseling Notes (`tab-notes`)
- Rich text notes input area + historical notes stream showing counselor remarks on candidate attitude, interview feedback, and skill readiness.

#### Tab 4: Call Logs (`tab-calls`)
- Log Phone Call button launching call outcome modal.
- Call history table: Timestamp, Counselor, Duration, Call Disposition, Outcome Notes.

#### Tab 5: Scheduled Follow-ups (`tab-followups`)
- Schedule Follow-up button.
- Follow-ups table with status badges (`Pending`, `Completed`), purpose, date, time, and 1-click completion toggle.

#### Tab 6: Stage History (`tab-stage-history`)
- Audit log tracking every pipeline progression: Old Stage $\rightarrow$ New Stage, Transition Reason, Counselor Name, Timestamp.

#### Tab 7: Placement Fee & Payments (`tab-payments`)
- **4 Financial KPI Cards:**
  1. Total Agreed Placement Fee (`fee-kpi-total`) in ₹.
  2. Total Collected to Date (`fee-kpi-paid`) in ₹.
  3. Outstanding Due Balance (`fee-kpi-pending`) in ₹.
  4. Payment Status Badge & Plan (`fee-kpi-status`).
- **Collection Progress Bar:** Visual progress representation of % fee realized.
- **Scheduled Installment Milestones Table:** Milestone #, Milestone Label, Due Date (flagged red if overdue), Amount, Milestone Status (`Pending`, `Paid`, `Overdue`), and a direct "Collect Payment" action button.
- **Payment Transaction Ledger Table:** Transaction Code (`REC-XXXXX`), Date, Amount Paid (₹), Payment Mode (`UPI`, `Net Banking`, `Card`, `Cash`, `Cheque`), Transaction / UTR Reference Number, Received by Counselor, and "View Receipt" button.

### 6.4 Modals Launched from Screen 06
1. **Record Placement Fee Payment Modal (`modal-record-payment`):**
   - Milestone Selector (Choose milestone or custom payment).
   - Payment Amount (pre-filled, validates against pending balance).
   - Payment Mode: `UPI`, `Net Banking`, `Credit/Debit Card`, `Cash`, `Cheque`.
   - Transaction / UTR Reference Number input.
   - Counselor receiver selector.
   - Payment Notes.
2. **Official Payment Receipt Modal (`modal-view-receipt`):**
   - Formatted printable voucher containing: Career Apex CRM Header, Voucher Number, Issue Date, Student Name, Student ID, Mobile, Course/Placement Track, Amount Paid in Numbers and Words, Payment Mode, UTR Reference Number, Remaining Balance, Counselor Signature Line, Official Stamp, and "Print Receipt" button triggering `window.print()`.
3. **Log Call Outcome Modal (`modal-log-call`).**
4. **Schedule Follow-up Modal (`modal-add-followup`).**
5. **Stage Transition Modal (`modal-change-stage`).**

---

## Screen 07: Excel Spreadsheet Pipeline View (`pages/pipeline.html`)

### 7.1 Screen Purpose & Objective
Replaces cumbersome Kanban boards with a dense, horizontal Excel-style spreadsheet. Optimized for counselors to work down a list of 100+ candidates with instant stage moves and communications.

### 7.2 Component Breakdown
1. **Top Stage Pill Ribbon:** Horizontal scrolling pill bar displaying `All Leads` and all 10 stages (`Cold Calling`, `New Lead`, `Contacted`, `Interested`, `Prospect`, `Follow-up`, `Negotiation`, `Converted`, `Not Interested`, `Lost`) with live candidate counts. Clicking a pill filters the sheet instantly and updates the browser URL (`?stage=Cold Calling`).
2. **Excel Ribbon Toolbar:**
   - Quick Search: Searches candidate name, college, degree, skills, role, phone.
   - Passing Year Filter: `2026`, `2025`, `2024`, `2023`, `2022`.
   - Priority Filter: `High`, `Medium`, `Low`.
   - Counselor Filter: Dropdown of sales reps.
   - **Fee Status Filter:** `All`, `Fully Paid`, `Partially Paid`, `Pending`, `Overdue`.
   - Reset Filters button.
3. **Excel Spreadsheet Table (`excel-pipeline-table`):**
   - Columns: `#` (Row Index), Student ID, Student Name, Degree, College, YOP, Key Skills, Target Role, Experience, Mobile, Quick Connect (Call/WhatsApp/Email), Pipeline Stage (Clickable to change), Priority, Status, **Placement Fee & Due Balance**, Career Counselor, City, Next Follow-up.
   - Sticky Actions Column: Profile, Edit, Quick Reassign, Quick Note.
4. **Excel Status Bar:** Shows system status (`READY`), visible row count, active stage name, total enrolled candidate count, and overall placement conversion win rate %.

---

## Screen 08: Bulk Lead Import Engine (`pages/import-leads.html`)

### 8.1 Screen Purpose & Objective
Mass ingestion of raw student records from university placement cells or job portal downloads.

### 8.2 Three-Step Wizard Architecture
- **Step 1: File Upload & Target Configuration:**
  - Drag-and-drop zone supporting `.xlsx`, `.xls`, and `.csv`.
  - **Target Pipeline Stage Selector:** Allows directing imported candidates specifically into `Cold Calling (Raw Data)` or `New Lead`.
  - **Target Counselor Allocation:** Choose "Auto Round-Robin Distribution" (spreads evenly across team) or select a specific counselor.
- **Step 2: Intelligent Header Mapping:**
  - Maps uploaded spreadsheet column headers to CRM candidate attributes: Student Name, Mobile, Alternate Mobile, Email, Degree/Qualification, College, Passing Year, Skills, Target Role, City, State, Placement Fee.
- **Step 3: Deduplication, Validation & Preview:**
  - Parses rows client-side via SheetJS.
  - Validates 10-digit mobile syntax.
  - Checks phone numbers against existing CRM records.
  - Displays validation status tags: `Valid (Ready to Import)`, `Duplicate Phone (Will Skip)`, `Invalid Mobile`.
- **Commit Import Button:** Writes valid candidate objects, sets up initial placement fee plans, records system audit event, and redirects to the pipeline view.

---

## Screen 09: Follow-up & Task Agenda (`pages/followups.html`)

### 9.1 Screen Purpose & Objective
Daily task execution hub organizing scheduled callbacks, counseling interviews, and fee reminder tasks.

### 9.2 Component Breakdown
- Top KPI Summary: Today's Tasks, Overdue Tasks, Upcoming Tasks, Completed to Date.
- Filter Bar: Date filters, Priority filters, Counselor filters.
- Task Lists categorized by urgency:
  - **Overdue Follow-ups (Red Border):** Tasks whose scheduled date/time is in the past.
  - **Today's Follow-ups (Amber Border):** Tasks scheduled for the current date.
  - **Upcoming Follow-ups (Slate Border):** Tasks scheduled for future dates.
- Interactive Controls: 1-click Call, WhatsApp, Email, and Complete checkbox.

---

## Screen 10: Communication Center (`pages/communication.html`)

### 10.1 Screen Purpose & Objective
Centralized multi-channel outreach workspace for phone calls, WhatsApp campaigns, and email dispatches.

### 10.2 Component Breakdown
- Telephony dialer widget with recent calls list.
- WhatsApp message builder with pre-configured counseling templates.
- Email dispatch history and template selector.

---

## Screen 11: Real-time Activity & Audit Trail (`pages/activities.html`)

### 11.1 Screen Purpose & Objective
Comprehensive, searchable audit log ensuring regulatory compliance and tracking all user actions.

### 11.2 Component Breakdown
- Search and filter bar (Filter by Counselor, Action Type, Student ID, Date).
- Chronological timeline feed rendering: User avatar, Action badge, Student name, Timestamp, and Detailed description.

---

## Screen 12: Sales Team & Counselor Hierarchy (`pages/team.html`)

### 12.1 Screen Purpose & Objective
Roster management, manager reporting lines, and counselor performance scorecards.

### 12.2 Component Breakdown
- Add Team Member modal (Name, Email, Role, Reporting Manager).
- Counselor profile cards showing avatar, reporting manager, active candidate load, conversion count, and win rate %.
- Monthly performance comparison leaderboard.

---

## Screen 13: Sales Intelligence & Placement Reports (`pages/reports.html`)

### 13.1 Screen Purpose & Objective
Multi-dimensional reporting suite providing analytics across financial fee realization, team benchmarks, stage transitions, and lead sources.

### 13.2 Universal Multi-Dimensional Filter Toolbar
- Date Preset: `All Time`, `Today`, `Yesterday`, `This Week`, `This Month`, `Last 30 Days`, `This Quarter`, `Custom Range`.
- Start Date & End Date pickers.
- Career Counselor dropdown.
- Sales Manager dropdown.
- Pipeline Stage dropdown.
- **Fee / Payment Status dropdown:** `All`, `Fully Paid`, `Partially Paid`, `Pending`, `Overdue`.
- Lead Source dropdown.
- Apply Filters & Reset Filters buttons.
- Export Active Report CSV button.

### 13.3 Four Reporting Tabs
- **Tab 1: Placement Fees & Revenue Analytics:**
  - 4 KPI Cards: Total Booked Fee, Cash Collected, Pending Dues, Collection Rate %.
  - Counselor Fee Realization Leaderboard Table (Counselor, Manager, Students, Booked, Collected, Balance, Realization %).
  - Payment Methods Doughnut Chart (UPI, Net Banking, Card, Cash).
  - Revenue Realization by Stage Bar Chart.
  - **Overdue & Pending Milestones Alert Table:** Displays candidates with upcoming or overdue installments, counselor name, due date, amount, and direct "Collect" action.
- **Tab 2: Counselor Performance:** Comparison Bar Chart (Assigned Leads vs Closed Placements) and detailed breakdown table.
- **Tab 3: Stage Movement & Velocity:** Transition breakdown table (From Stage $\rightarrow$ To Stage) and transition volume bar chart.
- **Tab 4: Lead Source Attribution:** Doughnut chart of lead inflow channels and conversion rate table.

---

## Screen 14: System Settings & Demo Configuration (`pages/settings.html`)

### 14.1 Screen Purpose & Objective
System administrative settings, storage quota management, and demo re-seeding controls.

### 14.2 Component Breakdown
- Organization profile and branding configuration.
- Placement fee defaults (Standard fee amount, default installment split).
- Storage statistics: Real-time calculation of browser localStorage bytes utilized and total object counts.
- **Reset Demo Data Action:** Clears cache and re-seeds 20+ realistic student candidate files, complete with academic credentials, payment ledgers, call logs, and activities.
