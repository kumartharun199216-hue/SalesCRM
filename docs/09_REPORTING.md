# 09. Reporting & Analytical Calculations

All metrics, graphs, and leaderboard numbers in Apex Sales CRM are computed dynamically from active `localStorage` records. No hard-coded metrics are used.

---

### 1. Stage Movement Report
- **Source Collection**: `crm_stage_history`
- **Logic**: Aggregates all transition records where `fromStage` and `toStage` are populated.
- **Output**: Matrix of transitions:
  - Transition path: `[From Stage] → [To Stage]`
  - Movement count: Total times this specific transition occurred.
  - Granular records list.
- **Date Filtering**: Allows evaluating transitions across custom start and end date ranges.
- **Visualization**: Horizontal bar chart visualizing top transition velocity paths.

---

### 2. Sales Team Performance Report
- **Source Collections**: `crm_users`, `crm_customers`, `crm_calls`, `crm_followups`, `crm_activities`
- **Calculated Columns per Sales Representative**:
  1. `Leads Assigned`: Total accounts where `salespersonId === user.id`.
  2. `Leads Contacted`: Accounts in `Contacted` stage or having non-null `lastContacted`.
  3. `Calls Made`: Total records in `crm_calls` for this agent.
  4. `Interested Count`: Accounts in `Interested` stage.
  5. `Prospects Count`: Accounts in `Prospect` stage.
  6. `Follow-ups Scheduled / Completed`: Ratio of resolved follow-ups.
  7. `Converted Count`: Accounts in `Converted` stage or status.
  8. `Not Interested Count`: Accounts marked `Not Interested`.
  9. `Total Activities`: All audit entries where `user === rep.name`.
  10. `Win Rate / Conversion Rate`: Calculated as `(Converted / Assigned) * 100%`.
- **Export**: One-click download of the complete team performance leaderboard to CSV.

---

### 3. Lead Source Attribution Report
- **Source Collection**: `crm_customers`
- **Logic**: Aggregates account inflow counts across standard channels:
  - Website Inquiry
  - Cold Call
  - LinkedIn
  - Referral
  - Google Ads
  - Trade Show
  - Inbound Call
- **Visualization**: Doughnut chart illustrating percentage share by channel.

---

### 4. Dynamic Dashboard KPI Calculations
- `Total Leads`: Length of scoped customer array.
- `New Leads`: Stage === 'New Lead'.
- `Contacted`: Stage === 'Contacted'.
- `Interested`: Stage === 'Interested'.
- `Prospects`: Stage === 'Prospect'.
- `Follow-ups`: Stage === 'Follow-up'.
- `Converted`: Stage === 'Converted'.
- `Lost / Dropped`: Stage === 'Lost' or Stage === 'Not Interested'.
- `Today's Follow-ups`: Scheduled date === today's local date and status === 'Pending'.
- `Overdue Follow-ups`: Scheduled date < today's local date and status === 'Pending'.
