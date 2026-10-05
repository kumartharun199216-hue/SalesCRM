# Skill Move Sales CRM — Full-Stack From-Scratch Development Prompts Guide

This document contains the complete, step-by-step master prompt sequence for building the **Skill Move Sales CRM** full-stack application from scratch in a fresh new folder.

Each prompt is self-contained and engineered to avoid AI token limits and partial code generation. Run the steps sequentially in your AI assistant (Cursor, Antigravity, Claude, ChatGPT, etc.).

---

## 🛠️ Step 0: Terminal Initialization (Run in New Empty Folder)

Open your terminal, navigate to where you want your new project, and run:

```bash
mkdir skillmove-crm
cd skillmove-crm
npm init -y
npm install typescript ts-node @types/node @types/express express dotenv cors cookie-parser prisma @prisma/client bcryptjs @types/bcryptjs jsonwebtoken @types/jsonwebtoken zod multer xlsx @types/multer node-cron
npx tsc --init
npx prisma init
```

---

## 🚀 PROMPT 1: Database Schema (Prisma + PostgreSQL) & Demo Seed Data

```markdown
We are building the Skill Move Sales CRM from scratch. This is Step 1: Database & Seed Data.

1. Configure `prisma/schema.prisma` with PostgreSQL:
   - `User`: id, customId (e.g. USR-001), name, email (unique), passwordHash, mobile, role (Enum: ADMIN, MANAGER, SALES), managerId (self-relation User?), status (Active/Inactive), avatar.
   - `Lead`: id, leadId (format: SM-LD-0001, unique, sequential), name, email, mobile (unique), altMobile, qualification, college, passingYear, cgpaOrPercentage, targetRole, skills, experienceLevel, city, state, preferredLocation, expectedCtc, source.
     - stage (Enum: COLD_CALLING, NOT_CONNECTED, NEW_LEAD, CONTACTED, INTERESTED, PROSPECT, FOLLOW_UP, NEGOTIATION, PENDING_CLOSURE, ENROLLED, NOT_INTERESTED, LOST).
     - priority (HIGH, MEDIUM, LOW), status.
     - totalFee (Decimal, default 45000), paidAmount (Decimal, default 0), estimatedRevenue (Decimal, nullable - required when stage is PENDING_CLOSURE).
     - paymentPlan, nextFollowUp (DateTime?), salespersonId (FK User?), managerId (FK User?).
   - `CommunicationTemplate`: id, templateId (TMPL-EM-xxxx or TMPL-WA-xxxx), name, type (EMAIL, WHATSAPP), category, subject (string?), body (text with {{lead_name}} tags), hasAttachment (Boolean), attachmentName (string?), createdById (FK User).
   - `CommunicationDispatch`: id, leadId, templateId, channel (EMAIL, WHATSAPP), recipient, subject, bodySent, hasAttachment, attachmentName, status (SENT, DELIVERED, READ, FAILED), sentById, createdAt.
   - `RevenueTarget`: id, userId (FK User), month (YYYY-MM), monthlyQuota, week1Quota, week2Quota, week3Quota, week4Quota (all Decimal). Unique [userId, month].
   - `WeeklyPerformanceSnapshot`: id, userId (FK User), month, weekNumber (1,2,3,4), startDate, endDate, quotaRevenue, achievedRevenue, pacingPercentage, callsCompleted, leadsContacted, pendingClosureCount, enrolledCount. Unique [userId, month, weekNumber].
   - `DailyReportLog`: id, reportType (HALF_DAY, FULL_DAY), reportDate, leadsAdded, callsMade, connectedRate, pendingClosureVal, revenueCollected, enrollmentsCount, payloadJson (JSON), emailSentStatus, whatsappSentStatus, createdAt.
   - `Activity`, `CallLog`, `CounselingNote`, `Payment` (receiptNumber: RCP-2026-xxxx), `StageHistory`.

2. Create `prisma/seed.ts`:
   - Seed 3 Users:
     - Alexander Wright (`admin@skillmove.org`, Admin, password: `admin123`)
     - Rajesh Sharma (`manager@skillmove.org`, Manager, password: `manager123`)
     - Arun Kumar (`counselor@skillmove.org`, Sales Counselor, password: `sales123`, manager: Rajesh Sharma)
   - Seed 8 initial templates (4 Email, 4 WhatsApp with brochure/agreement attachment defaults).
   - Seed 10 realistic leads with IDs `SM-LD-0001` to `SM-LD-0010` across stages.
   - Seed monthly targets with 4-week quotas for counselors.

3. Update `package.json` with scripts: `"prisma:migrate": "prisma migrate dev", "prisma:seed": "ts-node prisma/seed.ts"`.
Generate all files completely with no placeholder comments.
```

---

## 🚀 PROMPT 2: Authentication (RBAC) & Core Lead APIs

```markdown
This is Step 2: Authentication & Core Lead APIs.

Create an Express server in `src/server.ts` with TypeScript:
1. `src/middleware/auth.ts`:
   - JWT extraction from HTTP-only cookie or Authorization header.
   - `requireAuth`: Verifies token and attaches user to `req.user`.
   - `requireRole(...roles)`: Enforces RBAC (`ADMIN`, `MANAGER`, `SALES`).

2. Auth Routes (`/api/v1/auth`):
   - `POST /login`: Validates email and bcrypt password, issues JWT cookie.
   - `POST /logout`: Clears cookie.
   - `GET /me`: Returns current logged-in user profile and permissions.

3. Leads & Pipeline Routes (`/api/v1/leads`):
   - `GET /`: Scoped by role. Admin/Manager see all or team leads; Sales see only assigned leads. Filters: stage, priority, search (ID, name, college, phone), counselorId, managerId.
   - `GET /:id`: Full Candidate 360 profile with payments, stage history, notes, calls, activity timeline.
   - `POST /`: Creates single lead with auto-generated sequential ID `SM-LD-xxxx`. Duplicate phone check.
   - `PATCH /:id`: Updates profile.
   - `POST /:id/stage`: Changes stage with validation:
     - **Strict Rule**: If moving to `PENDING_CLOSURE`, `estimatedRevenue` must be provided.
     - Logs entry in `StageHistory` and `Activity`.
   - `POST /:id/payments`: Records installment, updates lead's `paidAmount`, auto-generates receipt number `RCP-YYYY-xxxx`.

Create controllers, services, and route files in `src/modules/leads/` and `src/modules/auth/`.
```

---

## 🚀 PROMPT 3: Excel/CSV Bulk Lead Import with Split Allocation

```markdown
This is Step 3: Excel/CSV Bulk Lead Import Engine with Multi-Counselor Split.

Create `src/modules/leads/import.controller.ts` and route `POST /api/v1/leads/import`:
1. Accept CSV or Excel file (`.xlsx`, `.xls`, `.csv`) or parsed JSON array.
2. Accept a distribution configuration parameter `splitMode`:
   - `ALL_COUNSELORS`: Automatically fetches all active users with role `SALES` and splits the rows equally among all of them in a round-robin loop.
   - `SELECTED_COUNSELORS`: Accepts an array of 2 to 3 `counselorIds` (e.g. `['usr-1', 'usr-2']`) and splits rows equally only among the selected counselors.
   - `SINGLE_COUNSELOR`: Accepts a single `counselorId` and assigns 100% of imported leads to that person.
3. Processing Rules:
   - For every lead, assign the sequential ID `SM-LD-xxxx`.
   - Look up the assigned counselor's `managerId` and automatically set `managerId` on the lead record.
   - Set stage to `COLD_CALLING` (or stage specified in the row).
   - Check for duplicate phone numbers: skip or flag existing numbers without crashing the import.
   - Log an activity entry: "Batch lead import: X leads imported, assigned to [Counselor Names]".
4. Return a detailed response:
   `{ success: true, totalRows: 50, importedCount: 48, duplicateCount: 2, distribution: { "Arun Kumar": 24, "Sneha Patil": 24 } }`.
```

---

## 🚀 PROMPT 4: Communication Templates & WhatsApp/Email Gateways

```markdown
This is Step 4: Multi-Channel Communication Engine (WhatsApp & Email with Attachments).

1. Templates Governance (`/api/v1/templates`):
   - Restricted to `ADMIN` and `MANAGER` roles only.
   - `GET /`: Retrieve all or filtered by `?type=email|whatsapp`.
   - `POST /`: Create template (name, type, category, subject for email, body text with dynamic placeholder tags, hasAttachment flag, default attachment name).
   - `PUT /:id` & `DELETE /:id`: Update and delete template.

2. Dynamic Tag Interpolator Service (`src/services/interpolator.ts`):
   - Automatically replaces tags in template body and subject:
     `{{lead_name}}`, `{{target_role}}`, `{{qualification}}`, `{{college}}`, `{{city}}`, `{{counselor_name}}`, `{{counselor_phone}}`, `{{total_fee}}`, `{{paid_amount}}`, `{{pending_fee}}`, `{{lead_id}}`.

3. Standard Attachments Library (`src/services/attachment-library.ts`):
   - Pre-register standard downloadable PDF brochures & agreements:
     - `Skill_Move_Placement_Track_Brochure_2026.pdf`
     - `Skill_Move_Fee_Structure_and_Agreement.pdf`
     - `Technical_Assessment_and_Interview_Prep.pdf`
     - `Job_Description_FullStack_Backend.pdf`

4. Dispatch Endpoints (`/api/v1/communication`):
   - `POST /whatsapp`:
     - Accepts `{ leadId, templateId, customBody, withAttachment, attachmentName }`.
     - Validates candidate phone number.
     - Dispatches via Meta WhatsApp Cloud API (or Twilio WhatsApp API service).
     - If `withAttachment: true`, dispatches as a WhatsApp media document with the PDF URL.
     - Logs to `CommunicationDispatch` and creates an audit entry in `Activity`.
   - `POST /email`:
     - Accepts `{ leadId, templateId, subject, customBody, withAttachment, attachmentName }`.
     - Validates candidate email address.
     - Dispatches email via SendGrid/Nodemailer with subject, body, and attached PDF file.
     - Logs to `CommunicationDispatch` and `Activity`.

Generate the complete services, routes, and controllers with clean error handling.
```

---

## 🚀 PROMPT 5: Automated Half-Day (1:30 PM) & Full-Day (7:30 PM) Reports

```markdown
This is Step 5: Automated Half-Day (1:30 PM) & Full-Day (7:30 PM) Scheduled Reporting.

Create `src/services/scheduler.ts` and `src/services/reporting.service.ts`:
1. Report Aggregator Service:
   - Calculates real-time operational stats for the given time window:
     - Leads ingested & sources.
     - Outbound calls made, connected calls count, connect rate %.
     - Stage progressions: count moved to Interested, Prospect, Pending Closure (with total pipeline value in ₹), and Enrolled.
     - Revenue collected in cash vs target quota.
     - Counselor leaderboard breakdown (calls, conversions, cash collected).

2. Automated Cron 1: **Half-Day Operations Report**
   - Scheduled: Monday to Saturday at `13:30 IST` (`30 13 * * 1-6`).
   - Time window: 09:00 AM to 01:30 PM IST.
   - Formats a sleek WhatsApp message card with emojis, metrics, and second-half priorities.
   - Sends automatically via WhatsApp to Admin, Sales Managers, and Stakeholder WhatsApp Group/Phone list.
   - Generates an executive HTML email and sends to Admin & Stakeholder emails.
   - Saves record to `DailyReportLog` in the database.

3. Automated Cron 2: **Full-Day (EOD) Operations Report**
   - Scheduled: Monday to Saturday at `19:30 IST` (`30 19 * * 1-6`).
   - Complete day summary, daily target achievement %, month-to-date pacing, team rankings.
   - Dispatches via BOTH WhatsApp and Email to Admin, Managers, and Stakeholders.
   - Saves record to `DailyReportLog`.

4. Manual Trigger API:
   - `POST /api/v1/reports/dispatch-now`: Allows Admin to trigger and dispatch a half-day or full-day report on demand.
```

---

## 🚀 PROMPT 6: Weekly Target Refresh & Historical Archival Engine

```markdown
This is Step 6: Weekly Target Refresh & Historical Performance Archival Engine.

1. Revenue Targets API (`/api/v1/targets`):
   - Admin and Sales Manager can set monthly targets divided into 4 weeks: `monthlyQuota`, `week1Quota`, `week2Quota`, `week3Quota`, `week4Quota`.
   - `GET /?month=YYYY-MM`: Returns quota, achieved revenue, and week-by-week pacing.

2. Weekly Snapshot & Refresh Cron (`src/services/weekly-refresh.ts`):
   - Runs every Sunday at 23:59 IST (or Monday 00:01 IST).
   - For every counselor and manager:
     - Calculates achieved revenue for the active week.
     - Calculates pacing percentage (`achieved / quota * 100`).
     - Gathers total calls made, leads contacted, pending closure count, and enrollments closed.
     - Creates an immutable frozen record in `WeeklyPerformanceSnapshot`.
   - Advances active week pointer from Week 1 -> Week 2 -> Week 3 -> Week 4.
   - Resets active weekly dashboard counters to 0 for the fresh week, while preserving monthly accumulated totals.

3. Historical Performance Archive API:
   - `GET /api/v1/performance/history?month=YYYY-MM&week=1|2|3|4`:
     - Allows users, managers, and admin to fetch the exact frozen snapshot for any past week or past month.
   - `GET /api/v1/performance/trends`:
     - Compares performance across Week 1, Week 2, Week 3, and Week 4.
```

---

## 🚀 PROMPT 7: Modern Responsive Frontend UI & Dashboards

```markdown
This is Step 7: Responsive Frontend Client and Dashboard UI.

Build a modern, high-aesthetic web application in `/public` or `/client` using our responsive CSS design system:
1. Navigation & Layout:
   - Sidebar with brand "Skill Move", navigation items based on role:
     - Admin: Dashboard, Leads, Pipeline, Follow-ups, Team, Message Templates, Reports, Settings.
     - Manager: Dashboard, Leads, Pipeline, Follow-ups, Team, Message Templates, Reports.
     - Sales: Dashboard, Leads, Pipeline, Follow-ups, Activities.
   - Header with quick search, "Add Lead" button, "Templates" button (Admin/Manager), and active user profile.

2. Dashboards (Admin, Manager, Counselor):
   - Live revenue pacing progress bar and 4-week target breakdown.
   - **Historical Archive Selector**: Add `[Select Month: YYYY-MM]` and `[Select Week: Week 1 | 2 | 3 | 4]`.
     - When current week is selected: displays live metrics.
     - When any past week is selected: displays the frozen historical snapshot with an "Archived Week View" badge.

3. Leads & Pipeline (Kanban / Excel View):
   - Table view with multi-filter (stage, priority, counselor).
   - 12 Stages: Cold Calling, Not Connected, New Lead, Contacted, Interested, Prospect, Follow-up, Negotiation, Pending Closure (with Estimated Revenue), Enrolled, Not Interested, Lost.
   - Quick action buttons on every row: Call, WhatsApp, Email.

4. Candidate 360 View:
   - Educational background, target role, counselor details.
   - Action buttons: Call, WhatsApp, Email, Stage Change.
   - Installments schedule & printable receipt generator modal.
   - Timeline, counseling notes, call outcome logger.

5. Interactive Send Modal (WhatsApp & Email):
   - Template selection dropdown (created by Admin/Manager).
   - Radio buttons: **[Send With Attachment]** vs **[Send Without Attachment]**.
   - Attachment dropdown (Brochure, Agreement, JD).
   - Auto-interpolated subject and body preview (editable).
   - 1-Click Send button connecting to backend.

6. Template Governance Modal (Admin & Manager):
   - List, create, edit, delete Email and WhatsApp templates with attachment options.

7. Import Leads Page:
   - CSV/Excel upload with radio button to split equally across all counselors, split across selected 2-3 counselors, or single counselor.

Connect all frontend pages to the Express backend APIs via `fetch` with credentials.
```

---

## 🎯 Verification Checklist for Each Prompt

- [ ] **Prompt 1 Done**: Run `npx prisma migrate dev && npx ts-node prisma/seed.ts`. Verify 3 users, 10 leads, 8 templates seeded in PostgreSQL.
- [ ] **Prompt 2 Done**: Test `/api/v1/auth/login` and verify JWT cookie. Test `POST /api/v1/leads` with `SM-LD-xxxx`.
- [ ] **Prompt 3 Done**: Test importing a sample CSV file with `ALL_COUNSELORS` and verify rows are evenly distributed across counselors.
- [ ] **Prompt 4 Done**: Test sending WhatsApp and Email with `withAttachment: true` vs `withAttachment: false`.
- [ ] **Prompt 5 Done**: Trigger `POST /api/v1/reports/dispatch-now` and verify WhatsApp card format and HTML email arrival.
- [ ] **Prompt 6 Done**: Fetch `/api/v1/performance/history` for a past week and verify archived metrics load accurately.
- [ ] **Prompt 7 Done**: Open web UI, log in as Admin/Manager/Sales, test Kanban drag-and-drop, 1-click template sending, and historical week dropdown.
