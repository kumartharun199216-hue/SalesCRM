# 10. UI Pages Directory & Interface Layout

Apex Sales CRM consists of 14 complete, interactive HTML interfaces organized under the `pages/` directory:

---

### Page Catalog

1. **`index.html` (Application Router)**
   - Root application controller. Checks current session context in `localStorage`.
   - Automatically redirects authenticated users to their role-specific dashboard or unauthenticated visitors to `pages/login.html`.

2. **`pages/login.html` (Sign In & 1-Click Persona Switcher)**
   - Clean enterprise authentication form with email and password inputs.
   - Includes 1-Click Demo Login cards for Administrator (Alexander Wright), Sales Manager (Rajesh Sharma), and Sales Representative (Arun Kumar).

3. **`pages/admin-dashboard.html` (Executive Command Center)**
   - 8 dynamic KPI cards (Total Leads, New, Contacted, Interested, Prospects, Converted, Lost, Follow-ups).
   - Chart.js Lead Pipeline Funnel bar chart and Pipeline Share doughnut.
   - Sales Rep Leaderboard table and live Audit Stream feed.

4. **`pages/manager-dashboard.html` (Sales Manager Dashboard)**
   - Scoped strictly to team members reporting to the logged-in manager.
   - Team members count, team pipeline breakdown chart, and urgent follow-up queue.

5. **`pages/salesperson-dashboard.html` (Sales Rep Daily Workspace)**
   - Scoped strictly to the logged-in sales rep's assigned leads.
   - Today's Follow-up Action Queue with direct 1-click Call, WhatsApp, and Complete buttons.
   - Active customer portfolio table and recent personal audit history.

6. **`pages/customers.html` (Customer & Account Directory)**
   - Complete customer directory table with badges for Stage, Status, and Priority.
   - Multi-field search and 7-parameter filter ribbon (Stage, Status, Priority, Rep, Source, City, Page Size).
   - Client-side pagination (10, 25, 50 rows per page) and CSV export.

7. **`pages/customer-details.html` (Customer 360° Profile)**
   - Header profile card with quick contact actions (Call, WhatsApp, Email, Record Call, Change Stage, Schedule Follow-up).
   - 6 tabbed panels:
     - Overview & Contact Information
     - Activity Interaction Timeline
     - Threaded Internal Notes
     - Recorded Call Logs
     - Follow-up Schedule
     - Pipeline Stage Transition History

8. **`pages/pipeline.html` (Excel Spreadsheet View)**
   - Dedicated Excel spreadsheet grid with freeze-pane sticky headers and sequential row numbering (`#1, #2, ...`).
   - Stage sub-menu integration and top pill tabs for all 9 stages.
   - In-cell actions for Calling, WhatsApp, Emailing, Stage Transitioning, Reassignment, and CSV export.

9. **`pages/leads.html` (Leads & Assignment Management)**
   - Queue of incoming leads with checkbox selection for bulk reassignment to managers and sales reps.
   - Single lead assignment and reassignment modals.

10. **`pages/followups.html` (Follow-up Schedule & Execution)**
    - Tabbed categorization: `Today's Follow-ups`, `Overdue Follow-ups`, `Upcoming Follow-ups`, and `Completed Follow-ups`.
    - Modal workflows for scheduling, completing (with remarks), and rescheduling.

11. **`pages/team.html` (Personnel & Hierarchy Management)**
    - Directory of Sales Managers and Sales Representatives.
    - Role tabs, Active/Inactive status toggle, and Add Team Member modal.

12. **`pages/activities.html` (Centralized Audit Trail)**
    - Searchable chronological log of all 15 system operation types.
    - Summary KPI cards (Total, Today, This Week, This Month), action filter, user filter, and date filter.

13. **`pages/reports.html` (Sales Reports & Analytics)**
    - Stage Movement Velocity report with date range filtering.
    - Sales Team Leaderboard with closed deals and conversion rate metrics.
    - Lead Source Channel Attribution analysis.

14. **`pages/import-leads.html` (Bulk CSV Lead Importer)**
    - Drag-and-drop CSV file uploader.
    - Automated duplicate mobile validation and field checking.
    - Interactive preview table and downloadable sample CSV template.

15. **`pages/settings.html` (System Settings & Governance)**
    - LocalStorage diagnostics and memory footprint monitor.
    - Pipeline stages view, JSON database backup export/import, and Demo Data factory reset.
