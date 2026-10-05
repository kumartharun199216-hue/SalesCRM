# Skill Move CRM — Enterprise Full-Stack Transformation Blueprint & Master Development Prompts

---

## 1. Executive Summary & Functional Architecture Analysis

### 1.1 Current Application State (Prototype Overview)
The current **Skill Move Sales CRM** is an advanced client-side web application built with decoupled Vanilla JavaScript modules, a tailored responsive CSS design system, and browser `localStorage` persistence. It simulates enterprise sales and educational placement workflows with high fidelity:

| Component | Current Implementation | Functional Scope |
|---|---|---|
| **Identity & Access** | `js/auth.js`, `js/users.js` | RBAC for **Admin**, **Sales Manager**, and **Sales Counselor**. Session management, demo role switcher. |
| **Lead / Candidate System** | `js/customers.js`, `js/leads.js` | Formatted IDs (`SM-LD-xxxx`), educational qualifications, college, target role, technical skills, fees, priority, counselor assignments. |
| **Pipeline Workflow** | `js/pipeline.js` | 12 custom stages: *Cold Calling*, *Not Connected*, *New Lead*, *Contacted*, *Interested*, *Prospect*, *Follow-up*, *Negotiation*, *Pending Closure* (with **Estimated Revenue** tracking), *Enrolled*, *Not Interested*, *Lost*. |
| **Import & Split Engine** | `pages/import-leads.html` | Excel/CSV ingestion with flexible multi-counselor split distribution: split equally among all counselors, split among selected 2–3 counselors, or route to a single counselor. |
| **Communication & Templates** | `js/templates.js`, `js/communication.js` | Email & WhatsApp template governance restricted to **Admin & Sales Managers**. Whole team sends personalized messages in 1 click with explicit **"Send with attachment"** or **"Send without attachment"** options (brochures, agreements, JDs). |
| **Revenue Targets** | `js/targets.js` | Monthly revenue target broken into 4 weekly targets. Counselor, Manager, and Admin progress bars with pacing indicators. |
| **Candidate 360 & Payments** | `pages/customer-details.html`, `js/payments.js` | Candidate profile, fee installments, balance tracking, printable payment receipts, counseling notes, call outcome logging, activity timeline. |

---

### 1.2 Target Full-Stack Requirements
To upgrade this system into a mission-critical, enterprise-grade full-stack platform, the following capabilities must be engineered:

1. **Production Backend & Database**:
   - Replace client-side `localStorage` with a persistent relational database (**PostgreSQL**) with ACID compliance for candidate records and financial transactions.
   - Robust RESTful / GraphQL API backend (**Node.js with TypeScript & Express/NestJS**).
2. **Native WhatsApp Business API Integration**:
   - Official integration with Meta Cloud API or Twilio/Gupshup for programmatic message dispatch.
   - Support for verified template messages, dynamic variables, and interactive media attachments (PDF syllabus, fee agreements, job descriptions).
   - Inbound webhook listeners for real-time delivery receipts (`sent`, `delivered`, `read`, `failed`).
3. **Transactional Email Service Integration**:
   - Official integration with SendGrid / Resend / AWS SES.
   - Programmatic email delivery with dynamic HTML templates, PDF attachments, and delivery tracking.
4. **Automated Half-Day & Full-Day Reporting Engine**:
   - **Half-Day Report (Dispatched at 1:30 PM)**: Summary of morning outreach, calls connected, leads contacted, pending closure additions, and midday revenue.
   - **Full-Day EOD Report (Dispatched at 7:30 PM)**: Complete day summary, enrollments closed, target pacing, counselor leaderboards, and conversion analytics.
   - Dispatched automatically through **BOTH WhatsApp and Email** to Admins, Sales Managers, and designated Stakeholders.
5. **Weekly Performance Refresh with Complete Historical Archival**:
   - Team dashboard refreshes every week (aligned with Week 1 to Week 4 target cycles).
   - Immutable **Weekly Performance Snapshots** stored in the database.
   - Counselors, Managers, and Admins can toggle between current metrics and **full historical archives** (previous weeks, past months, past quarters).
6. **Modular Extensibility Engine**:
   - Event-driven hook system (`CRM_EVENTS`) allowing new features to be added later (e.g., Razorpay payment links, LMS student onboarding, telephony click-to-call/CTI, AI lead scoring) without touching the core codebase.

---

## 2. Target Technology Stack & Infrastructure

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER (FRONTEND)                   │
│   Existing Vanilla JS / Vite Single-Page Application + CSS Design      │
│   WebSockets / SSE for live alerts • Chart.js • Responsive Dashboards   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ HTTPS / JWT Auth
┌────────────────────────────────────▼───────────────────────────────────┐
│                          API APPLICATION LAYER                         │
│   Node.js (TypeScript) + Express.js / NestJS                           │
│   ├── Authentication & RBAC (Admin, Manager, Counselor)                │
│   ├── Lead & Pipeline Management Module                                │
│   ├── Communication & Template Governance Module                       │
│   ├── Revenue Target & Weekly Pacing Module                            │
│   └── Event Bus (Internal Event Emitter / Webhooks)                    │
└──────────────┬─────────────────────┬────────────────────┬──────────────┘
               │                     │                    │
┌──────────────▼──────┐ ┌────────────▼──────────┐ ┌──────▼──────────────┐
│  DATABASE (STORAGE) │ │ BACKGROUND WORKERS    │ │ THIRD-PARTY GATEWAYS│
│  PostgreSQL (Prisma)│ │ Redis + BullMQ        │ │ • Meta WhatsApp API │
│  • Leads & Stages   │ │ • Half-Day Cron (1:30)│ │ • SendGrid / SES    │
│  • Users & Targets  │ │ • Full-Day Cron (7:30)│ │ • AWS S3 / Cloud    │
│  • Weekly Archives  │ │ • Weekly Archive Cron │ │   (Brochures & PDFs)│
│  • Audit Timeline   │ │ • Webhook Retries     │ │                     │
└─────────────────────┘ └───────────────────────┘ └─────────────────────┘
```

- **Backend Runtime**: Node.js (v20+ LTS) with TypeScript.
- **Web Framework**: Express.js (or NestJS for enterprise modularity).
- **ORM & Database**: Prisma ORM with **PostgreSQL 16**.
- **Job Queue & Scheduling**: **BullMQ** with **Redis 7** (for cron reports, async email/WhatsApp dispatch).
- **Document / Media Storage**: AWS S3 or Cloudinary / Supabase Storage (for downloadable brochures, agreements, receipts).
- **WhatsApp Provider**: Meta WhatsApp Business Cloud API (or Twilio Programmable Messaging).
- **Email Provider**: SendGrid or AWS Simple Email Service (SES) via Nodemailer.

---

## 3. Database Schema Blueprint (Prisma Data Model)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  MANAGER
  SALES
}

enum LeadStage {
  COLD_CALLING
  NOT_CONNECTED
  NEW_LEAD
  CONTACTED
  INTERESTED
  PROSPECT
  FOLLOW_UP
  NEGOTIATION
  PENDING_CLOSURE
  ENROLLED
  NOT_INTERESTED
  LOST
}

enum Priority {
  HIGH
  MEDIUM
  LOW
}

enum ChannelType {
  EMAIL
  WHATSAPP
}

enum ReportType {
  HALF_DAY
  FULL_DAY
}

model User {
  id               String          @id @default(uuid())
  customId         String          @unique // USR-001
  name             String
  email            String          @unique
  passwordHash     String
  mobile           String
  role             UserRole        @default(SALES)
  managerId        String?
  manager          User?           @relation("TeamHierarchy", fields: [managerId], references: [id])
  reporters        User[]          @relation("TeamHierarchy")
  status           String          @default("Active")
  avatar           String?
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  assignedLeads    Lead[]          @relation("AssignedCounselor")
  managedLeads     Lead[]          @relation("ManagedLeads")
  activities       Activity[]
  calls            CallLog[]
  notes            CounselingNote[]
  payments         Payment[]
  createdTemplates CommunicationTemplate[]
  revenueTargets   RevenueTarget[]
  weeklySnapshots  WeeklyPerformanceSnapshot[]
}

model Lead {
  id                 String          @id @default(uuid())
  leadId             String          @unique // SM-LD-0001
  name               String
  email              String?
  mobile             String          @unique
  altMobile          String?
  qualification      String?
  college            String?
  passingYear        String?
  cgpaOrPercentage   String?
  targetRole         String          @default("Software Professional")
  skills             String?
  experienceLevel    String          @default("Fresher")
  city               String?
  state              String?
  preferredLocation  String?
  expectedCtc        String?
  source             String          @default("Cold Calling / Raw Database")
  stage              LeadStage       @default(COLD_CALLING)
  priority           Priority        @default(MEDIUM)
  status             String          @default("Active")

  totalFee           Decimal         @default(45000.00) @db.Decimal(10, 2)
  paidAmount         Decimal         @default(0.00) @db.Decimal(10, 2)
  estimatedRevenue   Decimal?        @db.Decimal(10, 2) // Required for PENDING_CLOSURE
  paymentPlan        String?         @default("2 Installments")
  nextFollowUp       DateTime?

  salespersonId      String?
  salesperson        User?           @relation("AssignedCounselor", fields: [salespersonId], references: [id])
  managerId          String?
  manager            User?           @relation("ManagedLeads", fields: [managerId], references: [id])

  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  stageHistory       StageHistory[]
  activities         Activity[]
  calls              CallLog[]
  notes              CounselingNote[]
  payments           Payment[]
  dispatches         CommunicationDispatch[]
}

model CommunicationTemplate {
  id               String          @id @default(uuid())
  templateId       String          @unique // TMPL-EM-001 or TMPL-WA-001
  name             String
  type             ChannelType
  category         String          @default("General")
  subject          String?         // Required for Email
  body             String          @db.Text
  hasAttachment    Boolean         @default(false)
  attachmentName   String?
  attachmentUrl    String?
  attachmentSize   String?

  createdById      String
  createdBy        User            @relation(fields: [createdById], references: [id])
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  dispatches       CommunicationDispatch[]
}

model CommunicationDispatch {
  id               String          @id @default(uuid())
  leadId           String
  lead             Lead            @relation(fields: [leadId], references: [id])
  templateId       String?
  template         CommunicationTemplate? @relation(fields: [templateId], references: [id])
  channel          ChannelType
  recipientAddress String          // email or phone number
  subject          String?
  bodySent         String          @db.Text
  hasAttachment    Boolean         @default(false)
  attachmentUrl    String?
  providerMessageId String?
  status           String          @default("SENT") // SENT, DELIVERED, READ, FAILED
  errorMessage     String?
  sentById         String?
  createdAt        DateTime        @default(now())
}

model RevenueTarget {
  id               String          @id @default(uuid())
  userId           String
  user             User            @relation(fields: [userId], references: [id])
  month            String          // YYYY-MM
  monthlyQuota     Decimal         @db.Decimal(12, 2)
  week1Quota       Decimal         @db.Decimal(12, 2)
  week2Quota       Decimal         @db.Decimal(12, 2)
  week3Quota       Decimal         @db.Decimal(12, 2)
  week4Quota       Decimal         @db.Decimal(12, 2)
  notes            String?
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  @@unique([userId, month])
}

model WeeklyPerformanceSnapshot {
  id               String          @id @default(uuid())
  userId           String
  user             User            @relation(fields: [userId], references: [id])
  month            String          // YYYY-MM
  weekNumber       Int             // 1, 2, 3, 4
  startDate        DateTime
  endDate          DateTime

  quotaRevenue     Decimal         @db.Decimal(12, 2)
  achievedRevenue  Decimal         @db.Decimal(12, 2)
  pacingPercentage Decimal         @db.Decimal(5, 2)

  callsCompleted   Int             @default(0)
  leadsContacted   Int             @default(0)
  interestedCount  Int             @default(0)
  pendingClosureCount Int          @default(0)
  enrolledCount    Int             @default(0)

  createdAt        DateTime        @default(now())

  @@unique([userId, month, weekNumber])
}

model DailyReportLog {
  id               String          @id @default(uuid())
  reportType       ReportType      // HALF_DAY or FULL_DAY
  reportDate       DateTime        @db.Date
  periodStart      DateTime
  periodEnd        DateTime

  leadsAdded       Int
  callsMade        Int
  connectedRate    Decimal         @db.Decimal(5, 2)
  pendingClosureVal Decimal        @db.Decimal(12, 2)
  revenueCollected Decimal         @db.Decimal(12, 2)
  enrollmentsCount Int

  payloadJson      Json            // Full breakdown by manager and counselor
  emailSentStatus  String          @default("SUCCESS")
  whatsappSentStatus String        @default("SUCCESS")
  recipientCount   Int
  createdAt        DateTime        @default(now())
}

model Activity {
  id               String          @id @default(uuid())
  leadId           String?
  lead             Lead?           @relation(fields: [leadId], references: [id])
  userId           String?
  user             User?           @relation(fields: [userId], references: [id])
  action           String
  description      String          @db.Text
  createdAt        DateTime        @default(now())
}

model CallLog {
  id               String          @id @default(uuid())
  leadId           String
  lead             Lead            @relation(fields: [leadId], references: [id])
  userId           String
  user             User            @relation(fields: [userId], references: [id])
  outcome          String
  durationSeconds  Int             @default(0)
  notes            String?         @db.Text
  createdAt        DateTime        @default(now())
}

model CounselingNote {
  id               String          @id @default(uuid())
  leadId           String
  lead             Lead            @relation(fields: [leadId], references: [id])
  userId           String
  user             User            @relation(fields: [userId], references: [id])
  content          String          @db.Text
  createdAt        DateTime        @default(now())
}

model Payment {
  id               String          @id @default(uuid())
  receiptNumber    String          @unique // RCP-2026-0001
  leadId           String
  lead             Lead            @relation(fields: [leadId], references: [id])
  userId           String
  user             User            @relation(fields: [userId], references: [id])
  amount           Decimal         @db.Decimal(10, 2)
  paymentMethod    String
  transactionRef   String?
  milestoneTitle   String
  status           String          @default("Completed")
  paidAt           DateTime        @default(now())
}

model StageHistory {
  id               String          @id @default(uuid())
  leadId           String
  lead             Lead            @relation(fields: [leadId], references: [id])
  fromStage        LeadStage?
  toStage          LeadStage
  changedById      String?
  reason           String?
  createdAt        DateTime        @default(now())
}
```

---

## 4. Automated Reporting Engine (WhatsApp & Email)

### 4.1 Dispatch Schedule & Triggers
The reporting engine runs automatically via **BullMQ + Redis Cron**:

| Report | Trigger Time | Period Covered | WhatsApp Summary Card | Rich Email Digest |
|---|---|---|---|---|
| **Half-Day Report** | `13:30 IST` (Mon–Sat) | 09:00 IST – 13:30 IST | Formatted bullet summary sent to Admin, Managers, Stakeholders group | Executive HTML report with counselor metrics table |
| **Full-Day (EOD) Report** | `19:30 IST` (Mon–Sat) | 09:00 IST – 19:30 IST | Complete closure summary, daily quota vs collected, top performers | Detailed graphical audit, pipeline movements, and week pacing |

### 4.2 WhatsApp Automated Report Payload Format
```text
📊 *SKILL MOVE CRM — HALF-DAY OPERATIONS REPORT*
📅 *Date:* 02 Oct 2026 | ⏰ *Time:* 1:30 PM IST
━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 *EXECUTIVE SUMMARY (09:00 AM - 1:30 PM)*
• Registered Leads Ingested: *34*
• Outbound Calls Completed: *142* (Connect Rate: *72%*)
• Stage Moves to Pending Closure: *6* (Pipeline Value: *₹2,70,000*)
• Confirmed Enrollments: *3*
• Cash Collected Midday: *₹65,000*
• Daily Cash Target: *₹1,25,000* (Midday Pacing: *52%*)

👥 *TEAM LEADERBOARD (MIDDAY)*
1. Arun Kumar: 38 Calls | 2 Pending Closure | ₹35,000 Collected
2. Sneha Patil: 34 Calls | 3 Pending Closure | ₹20,000 Collected
3. Vikram Malhotra: 32 Calls | 1 Enrolled | ₹10,000 Collected

🚨 *ACTION ITEMS FOR 2ND HALF:*
- 18 high-priority follow-ups due between 2:00 PM - 5:00 PM.
- 4 pending installment balance verifications.

🔗 Open Full Live Dashboard: https://crm.skillmove.org/pages/reports.html
```

---

## 5. Weekly Performance Refresh & Historical Archival Architecture

### 5.1 Weekly Target Cycle Rules
1. **Week Boundaries**:
   - Week 1: Day 1 to Day 7 of the target month.
   - Week 2: Day 8 to Day 14.
   - Week 3: Day 15 to Day 21.
   - Week 4: Day 22 to Month-End.
2. **Weekly Refresh Routine (Every Monday 00:01 AM or Calendar Cut-Off)**:
   - Evaluates active week metrics for each counselor.
   - Writes an immutable record to `WeeklyPerformanceSnapshot`.
   - Clears active weekly counters on the live dashboard while preserving monthly running totals.
3. **Historical View Capabilities**:
   - Dashboard UI includes two global selectors: `[Select Month: 2026-09 ▼]` and `[Select Week: Week 2 (Sep 8 - Sep 14) ▼]`.
   - Selecting any past week instantly loads the frozen historical snapshot:
     - Target Quota vs Achieved Revenue.
     - Total Calls, Connects, Interested Leads, Enrolled Candidates.
     - Counselor ranking and manager team performance for that exact historical week.

---

## 6. Controlled Development Structure & Master Prompts

To implement this full-stack transformation cleanly without regressions, follow this **6-Phase Execution Plan**. Each phase is self-contained and comes with a dedicated master prompt.

```
PHASE 1: Backend Foundation, PostgreSQL Schema & Authentication
   ↓
PHASE 2: Core Domain APIs & Bulk Lead Import Split Engine
   ↓
PHASE 3: WhatsApp Business Cloud API & Transactional Email Gateway
   ↓
PHASE 4: Scheduled Half-Day & Full-Day Automated Reporting System
   ↓
PHASE 5: Weekly Performance Refresh & Historical Archival Engine
   ↓
PHASE 6: Frontend API Integration & Modular Extensibility Hooks
```

---

### Phase 1: Master Prompt — Backend Architecture, Database Schema & Authentication

```markdown
### MASTER PROMPT 1: Backend Setup, PostgreSQL Database & RBAC Authentication

**Role**: Senior Principal Full-Stack Architect
**Task**: Build Phase 1 of the Skill Move Sales CRM Enterprise Full-Stack Transformation.

**Core Objectives**:
1. Initialize a production-ready Node.js TypeScript backend inside a `/server` directory using Express.js (or NestJS).
2. Configure Prisma ORM connected to PostgreSQL with the complete Skill Move CRM schema (Users, Leads, Stages, Targets, Templates, Snapshots, DailyReports, Activities, Calls, Payments).
3. Implement secure authentication (bcrypt password hashing, JWT access tokens in HTTP-only cookies, refresh tokens).
4. Implement Role-Based Access Control (RBAC) middleware enforcing three distinct roles:
   - `ADMIN`: Full system governance, template creation, user management, system settings.
   - `MANAGER`: Team assignment, template creation, team reporting, target monitoring.
   - `SALES`: Assigned leads, candidate profile editing, communication dispatch, call recording.
5. Seed the database with the verified demo dataset matching current users (Alexander Wright [Admin], Rajesh Sharma [Manager], Arun Kumar [Sales counselor]) and standard lead stages.

**Technical Requirements**:
- Environment config via `.env` (`DATABASE_URL`, `JWT_SECRET`, `PORT=5000`).
- Health check endpoint `GET /api/v1/health`.
- Authentication endpoints:
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/logout`
  - `GET /api/v1/auth/me`
- Comprehensive error handling middleware and request validation using Zod.
- Unit/integration test ensuring JWT generation, password verification, and RBAC rejection.
```

---

### Phase 2: Master Prompt — Core Domain APIs & Bulk Lead Split Distribution

```markdown
### MASTER PROMPT 2: CRM Core Domain APIs & Bulk Lead Import Split Engine

**Role**: Senior Backend Engineer
**Task**: Build Phase 2 of the Skill Move Sales CRM Full-Stack Transformation.

**Core Objectives**:
1. Implement full CRUD APIs for Leads with custom ID generator `SM-LD-xxxx` and stage transition validation:
   - `GET /api/v1/leads`: Scoped by user role (Admin/Manager see all/team leads, Counselors see only assigned leads). Supports filtering by stage, priority, search text, manager, and counselor.
   - `GET /api/v1/leads/:id`: Candidate 360 profile with stage history, counseling notes, call logs, fee milestones, and activity timeline.
   - `POST /api/v1/leads`: Single lead creation with duplicate mobile check.
   - `PATCH /api/v1/leads/:id`: Profile updates.
   - `POST /api/v1/leads/:id/stage`: Stage change with audit logging. Strict rule: If moving to `Pending Closure`, validate that `estimatedRevenue` is provided.
2. Implement Candidate Payments & Receipt API:
   - `POST /api/v1/leads/:id/payments`: Record installment, update `paidAmount`, auto-generate `RCP-YYYY-xxxx` receipt number, log transaction activity.
3. Implement the Bulk Lead Import & Split Engine (`POST /api/v1/leads/import`):
   - Accept CSV / Excel file or parsed JSON array.
   - Distribution Modes:
     a) `ALL_COUNSELORS`: Evenly distributes rows across all active counselors using round-robin.
     b) `SELECTED_COUNSELORS`: Distributes evenly across an array of 2 to 3 selected counselor IDs.
     c) `SINGLE_COUNSELOR`: Assigns 100% of imported rows to a single designated counselor.
   - Auto-assigns corresponding Manager ID based on user hierarchy.
   - Returns detailed import summary: `{ totalRows, successfullyImported, duplicatesSkipped, distributionBreakdown }`.
```

---

### Phase 3: Master Prompt — WhatsApp Business API & Transactional Email Gateway

```markdown
### MASTER PROMPT 3: WhatsApp Business Cloud API & Email Communication Engine

**Role**: Senior Communications Integration Specialist
**Task**: Build Phase 3 of the Skill Move Sales CRM Full-Stack Transformation.

**Core Objectives**:
1. Implement Communication Templates Governance API:
   - `GET /api/v1/templates?type=email|whatsapp`: Fetch approved templates.
   - `POST /api/v1/templates`: Restricted strictly to `ADMIN` and `MANAGER`. Supports template name, channel, subject, dynamic placeholders (`{{lead_name}}`, `{{target_role}}`, `{{total_fee}}`, etc.), attachment requirement toggle, and default document selector.
   - `PUT /api/v1/templates/:id` and `DELETE /api/v1/templates/:id`: Update and delete templates (Admin & Manager only).
2. Implement Native WhatsApp Gateway (Meta Cloud API / Twilio):
   - Service to dispatch official WhatsApp template messages and media messages.
   - `POST /api/v1/communication/whatsapp`:
     - Accepts `{ leadId, templateId, customBody, withAttachment, attachmentName }`.
     - Automatically interpolates placeholders with candidate's live record.
     - If `withAttachment` is true, resolves the verified PDF URL from the document repository and dispatches as a media card.
     - Logs entry in `CommunicationDispatch` and creates an audit entry in `Activity`.
   - Webhook listener `POST /api/v1/communication/whatsapp/webhook` to handle delivery status receipts (`delivered`, `read`).
3. Implement Transactional Email Gateway (SendGrid / AWS SES):
   - `POST /api/v1/communication/email`:
     - Accepts `{ leadId, templateId, subject, customBody, withAttachment, attachmentName }`.
     - Interpolates tags, attaches official PDF document if selected, and dispatches via SMTP / API.
     - Logs dispatch status and candidate activity history.
4. Static / S3 Document Repository:
   - Provide standard downloadable brochure and agreement storage:
     - `Skill_Move_Placement_Track_Brochure_2026.pdf`
     - `Skill_Move_Fee_Structure_and_Agreement.pdf`
     - `Technical_Assessment_and_Interview_Prep.pdf`
     - `Job_Description_FullStack_Backend.pdf`
```

---

### Phase 4: Master Prompt — Automated Half-Day & Full-Day Scheduled Reporting Engine

```markdown
### MASTER PROMPT 4: Automated Half-Day & Full-Day Operations Reporting System

**Role**: Senior Systems & Automation Engineer
**Task**: Build Phase 4 of the Skill Move Sales CRM Full-Stack Transformation.

**Core Objectives**:
1. Implement BullMQ & Redis Job Scheduler for automated periodic reports:
   - **Job 1 (Half-Day Report)**: Scheduled every Monday–Saturday at `13:30 IST`.
   - **Job 2 (Full-Day EOD Report)**: Scheduled every Monday–Saturday at `19:30 IST`.
2. Report Aggregator Service:
   - Calculates operational metrics for the specific timeframe:
     - Total leads ingested & source breakdown.
     - Calls completed, connect rate, and call outcome distribution.
     - Pipeline progression: count of leads moved to *Interested*, *Prospect*, *Pending Closure* (with total pipeline value), and *Enrolled*.
     - Revenue collected vs daily/monthly target quota.
     - Individual counselor performance breakdown (calls, conversions, revenue).
3. Dual-Channel Dispatch Engine:
   - **WhatsApp Dispatcher**: Formats a sleek, high-visibility WhatsApp summary card and broadcasts it to:
     - Admin & Sales Manager phone numbers.
     - Configured Stakeholder WhatsApp Group / distribution list.
   - **Email Dispatcher**: Renders a branded executive HTML report and dispatches via SendGrid/SES to executive stakeholder emails.
4. Logging & Manual Trigger API:
   - Persist full report payload in `DailyReportLog`.
   - Endpoint `POST /api/v1/reports/dispatch-now`: Allows Admin to manually trigger a half-day or full-day report on demand for ad-hoc reviews.
```

---

### Phase 5: Master Prompt — Weekly Performance Refresh & Historical Archival Engine

```markdown
### MASTER PROMPT 5: Weekly Target Refresh & Historical Performance Archival

**Role**: Senior Data Architect & Backend Engineer
**Task**: Build Phase 5 of the Skill Move Sales CRM Full-Stack Transformation.

**Core Objectives**:
1. Implement Revenue Targets Management API:
   - `GET /api/v1/targets?month=YYYY-MM`: View monthly quota and Week 1–4 breakdown for all counselors or specific team.
   - `PUT /api/v1/targets/:userId`: Set or update monthly quota and 4-week targets (Admin & Manager only).
2. Weekly Performance Snapshot & Refresh Scheduler:
   - Implement cron task running every Sunday at `23:59 IST` (or Monday `00:01 IST`).
   - For every counselor and manager:
     - Computes total revenue collected in the week.
     - Calculates target pacing (`achievedRevenue / quotaRevenue * 100`).
     - Gathers total calls made, leads contacted, pending closure count, and enrollments closed.
     - Creates an immutable record in `WeeklyPerformanceSnapshot`.
   - Advances current active week index from Week 1 → Week 2 → Week 3 → Week 4.
3. Historical Archival API:
   - `GET /api/v1/performance/history`:
     - Query parameters: `?month=YYYY-MM&week=1|2|3|4&userId=...`.
     - Returns frozen historical performance metrics for that specific week/month.
   - `GET /api/v1/performance/trends`:
     - Multi-week performance curves comparing Week 1 vs Week 2 vs Week 3 vs Week 4 for trend analysis.
```

---

### Phase 6: Master Prompt — Frontend Connection & Extensibility Engine

```markdown
### MASTER PROMPT 6: Frontend API Service Integration & Extensible Plugin Architecture

**Role**: Lead Full-Stack Integration Engineer
**Task**: Build Phase 6 of the Skill Move Sales CRM Full-Stack Transformation.

**Core Objectives**:
1. Implement `js/api.js` to replace client-side `StorageService`:
   - Unified API client with automatic JWT token management, request timeout, and error notification toasts.
   - Refactor `js/customers.js`, `js/leads.js`, `js/pipeline.js`, `js/templates.js`, `js/targets.js`, and `js/reports.js` to consume backend REST endpoints asynchronously.
2. Update Dashboard UI with Historical Performance Selector:
   - Add Month & Week dropdown picker to Counselor, Manager, and Admin dashboards.
   - When a past week is selected, toggle dashboard into "Historical Archive Mode" with an indicator badge, rendering frozen snapshot data.
3. Build Modular Extensibility Hooks (`CRM_EVENTS`):
   - Implement an extensible event system allowing future plugins:
     - `lead.created`: Ready for external lead webhook ingestion.
     - `lead.enrolled`: Ready for future LMS auto-enrollment.
     - `payment.received`: Ready for Razorpay/Stripe webhook reconciliation.
     - `call.initiated`: Ready for cloud telephony (Twilio/Exotel) click-to-call.
4. End-to-End System Testing & Verification:
   - Validate template creation by Admin/Manager.
   - Validate 1-click WhatsApp and Email sending with attachments.
   - Validate bulk Excel lead import with counselor split.
   - Validate scheduled report generation and weekly snapshot archival.
```

---

## 7. Operational Deployment & Maintenance Checklist

```
[ ] 1. PostgreSQL instance provisioned with SSL connection.
[ ] 2. Redis cluster configured for BullMQ cron queues.
[ ] 3. Meta WhatsApp Business Cloud API credentials verified (Phone Number ID, WABA ID, Permanent Token).
[ ] 4. SendGrid / AWS SES domain authentication verified (SPF, DKIM, DMARC records).
[ ] 5. Stakeholder notification list configured for automated 1:30 PM and 7:30 PM reports.
[ ] 6. Weekly snapshot cron validated with timezone set to Asia/Kolkata (IST).
[ ] 7. S3 bucket configured for public brochure downloads and private receipt archives.
```
