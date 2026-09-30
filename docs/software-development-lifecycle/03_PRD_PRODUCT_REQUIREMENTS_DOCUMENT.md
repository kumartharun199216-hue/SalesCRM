# Product Requirements Document (PRD)
## Career Apex CRM — Student Placement & Career Counseling Sales CRM

---

### Document Control
- **Document Identifier:** PRD-APEX-03
- **Version:** 2.0
- **Status:** Approved
- **Audience:** Product Managers, Software Engineers, UI/UX Designers, QA Automation Engineers

---

## 1. Product Vision & Core Design Principles

### 1.1 Product Vision
Career Apex CRM is a high-speed, candidate-centric sales and placement management platform engineered specifically for career training academies, college placement consultancies, and vocational staffing firms. It combines the density and agility of an Excel spreadsheet with the governance, auditability, and financial tracking of an enterprise CRM.

### 1.2 Core Product Principles
1. **Spreadsheet Velocity Over Complex UI:** Counselors spend 8 hours a day making 50+ outreach touches. The system prioritizes dense, Excel-style spreadsheet tables with instant 1-click actions over multi-layer navigation.
2. **Zero Corporate Account Clutter:** Student job seekers are individual candidates; the CRM strips away all corporate B2B "Account" fields, focusing solely on qualifications, passing years, target roles, and placement fees.
3. **Financial Transparency & Discipline:** Every candidate's contracted placement fee is mapped to milestone schedules, transactions, and printable voucher receipts with automated balance recalculation.
4. **Mandatory Operational Auditability:** Stage changes, counselor reassignments, and payment modifications must capture reasons, timestamps, and author identities.

---

## 2. Detailed Functional Requirements (FR)

### FR-01: Candidate Profile & Educational Record Management
- **Description:** Centralized repository for all registered student job seekers.
- **Data Attributes:**
  - Candidate ID: Auto-generated unique string (`CRM-STU-XXX`).
  - Personal Information: Full Name, Primary Mobile (10 digits), Alternate Mobile/WhatsApp, Email, Permanent Address, City, State, Country.
  - Academic Background: Qualification/Degree, College/University, Passing Year (YOP: 2022–2026), CGPA or Percentage.
  - Career & Job Preferences: Target Job Role, Key Technical Skills, Experience Level (`Fresher`, `0-1 yr`, `1-2 yrs`, `2+ yrs`), Expected CTC, Preferred Work Location, Resume Link.
  - Pipeline & Assignment: Pipeline Stage, Placement Status, Priority (`High`, `Medium`, `Low`), Lead Source, Assigned Sales Manager, Assigned Career Counselor.
  - Counseling Notes: Free-text counselor observations and interview readiness notes.
- **Validation:** Primary mobile must be exactly 10 numeric digits. Duplicate checks verify both primary and alternate mobile numbers against existing CRM records.

---

### FR-02: Placement Fee & Payment Plan Generation
- **Description:** Commercial monetization engine managing agreed placement fees and scheduled installment milestones.
- **Fee Assignment:** Custom agreed total fee per student (default ₹45,000, customizable per candidate).
- **Payment Plans:**
  - `Full Payment Upfront`: 1 Milestone (100% due upon enrollment).
  - `2 Installments`: Milestone 1 (50% upfront), Milestone 2 (50% due in 30 days or on placement).
  - `3 Installments`: Milestone 1 (40% upfront), Milestone 2 (30% mid-training), Milestone 3 (30% on placement).
  - `4 Installments`: Milestone 1 (25%), Milestone 2 (25%), Milestone 3 (25%), Milestone 4 (25%).
- **Milestone Properties:** Installment Number, Label, Due Date, Due Amount, Paid Date, Status (`Pending`, `Paid`, `Overdue`), Transaction Reference.

---

### FR-03: Payment Transaction Ledger & Receipt Issuance
- **Description:** Financial recording of fees received and instant receipt generation.
- **Payment Attributes:** Unique Voucher Number (`REC-XXXXX`), Student ID, Student Name, Amount Paid (₹), Payment Mode (`UPI`, `Net Banking`, `Credit/Debit Card`, `Cash`, `Cheque`), Transaction / UTR Reference Number, Received by Counselor, Notes, Payment Timestamp.
- **Automatic Recalculation:**
  - $\text{paidAmount} = \sum \text{Payment Transactions}$
  - $\text{pendingAmount} = \max(0, \text{totalFee} - \text{paidAmount})$
  - Payment Status Transition:
    - If $\text{paidAmount} == \text{totalFee}$: Status = `Fully Paid`.
    - If $\text{paidAmount} > 0$ and $\text{paidAmount} < \text{totalFee}$: Status = `Partially Paid`.
    - If $\text{paidAmount} == 0$: Status = `Pending`.
    - If any unpaid installment due date $< \text{currentDate}$: Flag = `Overdue`.
- **Official Receipt Generator:** Formatted voucher modal with print trigger (`window.print()`), displaying candidate credentials, receipt voucher number, amount in words, counselor signature line, and official seal.

---

### FR-04: Multi-Stage Pipeline & Excel Sheet Interface
- **Description:** Tabular spreadsheet workspace organizing candidates into distinct placement pipeline stages.
- **Pipeline Stages (10 Stages):**
  1. `Cold Calling (Raw Data)`: Uncalled database imported from college drives.
  2. `New Lead`: Fresh inquiries from web, walk-ins, or social media.
  3. `Contacted`: Initial outreach completed; counseling in progress.
  4. `Interested`: Candidate expressed interest in career placement track.
  5. `Prospect`: Training track demonstrated; placement fee discussed.
  6. `Follow-up`: Scheduled call or counseling session pending.
  7. `Negotiation`: Finalizing agreed fee amount and installment plan.
  8. `Converted (Placed)`: Placed in corporate role; successful conversion.
  9. `Not Interested`: Candidate declined services.
  10. `Lost`: Unresponsive, dropped out, or disqualified.
- **Interface Structure:**
  - Sidebar Submenu: Collapsible accordion linking directly to filtered stage views.
  - Stage Pill Ribbon: Horizontal pill buttons with dynamic count badges for quick sheet switching.
  - Sticky Actions Column: Quick icons for Call, WhatsApp, Email, View Dossier, and Edit.

---

### FR-05: Stage Transition Audit & Mandatory Reason Capture
- **Description:** Prevents unverified stage movements by requiring an explicit business reason.
- **Functional Flow:**
  1. User triggers stage change via dropdown or inline table action.
  2. Stage Transition Modal opens displaying Student Name, Current Stage, and New Stage Selector.
  3. Transition Reason field is **mandatory**.
  4. Upon saving, system updates candidate stage, logs to `crm_stage_history`, and creates an entry in `crm_activities`.

---

### FR-06: Bulk Ingestion Engine (Excel / CSV) with Deduplication
- **Description:** Mass import of raw candidate databases.
- **Supported Formats:** `.xlsx`, `.xls`, `.csv` processed client-side via SheetJS.
- **3-Step Wizard:**
  - *Step 1: Upload & Configuration:* Select target pipeline stage (e.g. `Cold Calling`) and target counselor allocation (direct or auto round-robin).
  - *Step 2: Intelligent Header Mapping:* Auto-matches uploaded sheet headers to CRM attributes (Name, Mobile, Email, College, Degree, YOP, Skills, Role, Fee).
  - *Step 3: Deduplication & Validation:* Validates 10-digit mobile syntax; flags existing CRM phone numbers as `Duplicate Phone (Will Skip)`.
- **Commit:** Imports valid rows, assigns counselor, generates default fee plan, logs audit event, and redirects to pipeline sheet.

---

### FR-07: Telephony Logging & Call Outcome Capture
- **Description:** Telephony disposition logging for compliance and productivity tracking.
- **Functional Capabilities:**
  - Click-to-call initiates `tel:+91XXXXXXXXXX` protocol.
  - Call Outcome Modal captures: Duration (seconds/minutes), Disposition (`Connected - Interested`, `Ringing - No Answer`, `Busy`, `Invalid Number`, `Follow-up Requested`), and Discussion Notes.
  - Automatically updates `lastContacted` timestamp and appends to student call ledger.

---

### FR-08: WhatsApp Direct Connect & Message Templating
- **Description:** Frictionless messaging via official WhatsApp deep-linking.
- **Capabilities:**
  - Generates deep-link `https://wa.me/91XXXXXXXXXX?text=...`.
  - Template Library: Welcome Introduction, Course & Placement Pitch, Interview Schedule Confirmation, Fee Installment Reminder, Document Submission Alert.
  - Logs WhatsApp dispatch to student activity timeline.

---

### FR-09: Multi-Channel Communication Center
- **Description:** Dedicated hub managing communication touchpoints.
- **Features:** Call history ledger, WhatsApp dispatch logs, and email composer drawer with pre-configured counselor signatures.

---

### FR-10: Follow-up & Task Agenda Scheduler
- **Description:** Calendar and task reminder engine.
- **Features:**
  - Schedule follow-up with Date, Time, Priority (`High`, `Medium`, `Low`), Action Type (`Call`, `WhatsApp`, `Email`, `Counseling`), and Purpose.
  - Categorization into `Overdue` (red badge), `Today` (amber badge), and `Upcoming` (slate badge).
  - 1-click completion toggle with outcome notes capture.

---

### FR-11: Candidate Reassignment Engine
- **Description:** Bulk or individual candidate transfer between counselors.
- **Capabilities:**
  - Admin can reassign any candidate to any manager or counselor.
  - Sales Manager can reassign candidates among reporting team counselors.
  - Updates `managerId`, `managerName`, `salespersonId`, `salespersonName`, and logs reassignment audit trail.

---

### FR-12: Universal Multi-Filter Intelligence & Analytics
- **Description:** Cross-cutting report engine with multi-dimensional filtering.
- **Filter Parameters:** Date Preset (`Today`, `Yesterday`, `This Week`, `This Month`, `Last 30 Days`, `This Quarter`, `Custom Range`), Counselor, Manager, Pipeline Stage, Fee Status (`Fully Paid`, `Partially Paid`, `Pending`, `Overdue`), and Lead Source.
- **Reporting Tabs:**
  - *Tab 1: Placement Fees & Revenue:* Booked Fee, Cash Collected, Pending Dues, Collection Rate %, Counselor Realization Leaderboard, Payment Mode Split Doughnut, Revenue by Stage Bar, Overdue Milestones Alert Table with direct Collect action.
  - *Tab 2: Counselor Performance:* Leads vs Converted comparison chart, call counts, follow-up execution rate, win rates.
  - *Tab 3: Stage Velocity:* Transition volume breakdown (From Stage $\rightarrow$ To Stage).
  - *Tab 4: Lead Sources:* Inflow share doughnut chart and channel conversion efficiency.

---

### FR-13: Activity Logging & System Compliance Stream
- **Description:** Immutable system audit trail.
- **Tracked Events:** Student Registration, Profile Edit, Stage Transition, Fee Payment, Follow-up Scheduled/Completed, Call Logged, Lead Reassigned, Student Deleted.
- **Searchable Attributes:** Search by user, customer ID, action keyword, date range.

---

### FR-14: Team Roster & Productivity Leaderboards
- **Description:** Hierarchical counselor management and target comparison.
- **Features:** Team roster cards, reporting lines, counselor quotas, and monthly conversion leaderboard.

---

### FR-15: System Configuration & Demo Data Seeding
- **Description:** System parameter configuration and cache control.
- **Features:** Placement fee standard presets, localStorage byte usage counters, and 1-click demo data reset button re-seeding 20+ realistic student files.

---

## 3. Non-Functional Requirements (NFR)

| ID | Requirement Category | Target Specification |
| :--- | :--- | :--- |
| **NFR-01** | **Performance** | Table rendering for 1,000 candidate records shall execute in $< 150\text{ ms}$. Search filter debounce $< 250\text{ ms}$. |
| **NFR-02** | **Scalability** | Architecture must support migration to PostgreSQL capable of handling 500,000+ candidates and 5,000 concurrent counselors. |
| **NFR-03** | **Data Integrity** | Primary mobile numbers must remain unique. Financial balance invariant ($\text{totalFee} = \text{paid} + \text{pending}$) must strictly hold. |
| **NFR-04** | **Usability** | Dense, spreadsheet-style views must allow inline actions within a single click without full-page navigation. |
| **NFR-05** | **Security** | Role-based route guards and data scoping at the model layer. No unauthorized counselor access to peer student records. |
| **NFR-06** | **Auditability** | All financial transactions and stage changes must store user ID, timestamp, voucher numbers, and transition reasons. |
| **NFR-07** | **Browser Compatibility** | Fully functional across modern Chromium (Chrome, Edge, Brave), Firefox, and Safari (desktop & tablet viewports). |
| **NFR-08** | **Zero-Dependency Runtime** | Prototype must run standalone on any web server or file system without external database or node server dependencies. |

---

## 4. Edge Cases & Exception Handling

1. **Duplicate Phone on Import:** When an uploaded CSV row has a phone number matching an existing candidate or another row in the same file, the system marks the row as duplicate, skips ingestion, and logs the skipped record in the import summary.
2. **Overpayment Attempt:** When a user attempts to record a payment amount exceeding the pending balance, the modal displays an error: *"Payment amount cannot exceed the pending due balance of ₹X."*
3. **Invalid Due Dates:** Milestone due dates cannot be set to a date preceding the student registration date.
4. **Session Expiry / Direct Access:** If an unauthenticated user opens an internal page (`pages/customers.html`), the route guard intercepts the request and redirects to `index.html`.
5. **Deletion of Placed Student:** Super administrator receives a high-severity confirmation prompt warning that deleting a placed student permanently removes associated ledger vouchers.

---

## 5. Acceptance Criteria & Definition of Done (DoD)

- [x] All 10 pipeline stages are selectable via sidebar submenus and top pill tabs.
- [x] Student registration enforces 10-digit mobile number uniqueness.
- [x] Bulk upload parses `.xlsx` and `.csv` files and assigns leads to counselors.
- [x] Agreed placement fees generate upfront and installment milestone schedules.
- [x] Payment recording updates ledger, recalculates balances, and produces printable receipts.
- [x] Reports provide universal multi-dimensional filters that dynamically refresh charts and tables.
- [x] Role-based scoping correctly filters data for Admin, Manager, and Counselor.
