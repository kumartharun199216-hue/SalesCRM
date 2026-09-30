# 07. Lead Pipeline & Excel Spreadsheet View

## 1. Overview & Architecture
Per user requirements, the Lead Pipeline has been implemented as an **Excel-Sheet Style Spreadsheet** with dedicated stage sub-menu options in the navigation, replacing the traditional board format with a data-dense, spreadsheet-driven workflow.

---

## 2. Defined Pipeline Stages
The application implements 9 sequential sales pipeline stages:

1. **New Lead**: Freshly registered account awaiting initial discovery.
2. **Contacted**: Outreach established; discovery call pending or underway.
3. **Interested**: Explicit product interest and solution fit confirmed.
4. **Prospect**: Commercial decision-makers engaged; proposal or trial active.
5. **Follow-up**: Active review period with scheduled touchpoints.
6. **Negotiation**: Contract legal review, pricing adjustments, and SLA finalization.
7. **Converted**: Deal closed; contract executed and converted to active customer.
8. **Not Interested**: Qualified out; prospect opted out or lacks current budget.
9. **Lost**: Opportunity lost to competition or discontinued project.

---

## 3. Sidebar Sub-Menu Integration
- In the left sidebar navigation, **Pipeline (Excel)** includes an expandable sub-menu displaying each stage individually.
- Each sub-menu item contains:
  - Stage icon
  - Stage title (e.g. `Interested`)
  - Live count pill showing the number of leads currently in that stage (e.g. `6`).
- Clicking any sub-menu item navigates directly to `pipeline.html?stage=[StageName]`, filtering the spreadsheet to that stage.

---

## 4. Excel Spreadsheet User Interface
- **Freeze-Pane Column Headers**: Top header row stays pinned at the top during vertical scrolling (`position: sticky; top: 0`).
- **Sequential Row Indexing**: First column provides Excel-like row numbers (`#1, #2, #3, ...`).
- **Cell Gridlines**: Clean, high-contrast borders between cells (`border: 1px solid #e2e8f0`).
- **Top Pill Ribbon**: Interactive pill buttons at the top of the sheet displaying every stage and its current volume.
- **Excel Toolbar**: Global spreadsheet search, priority filter, salesperson filter, and reset button.
- **Excel Status Bar**: Fixed at the bottom of the grid showing active row count, selected stage, total leads, and company win rate.

---

## 5. In-Row Actions & Capabilities
Every row in the spreadsheet provides all CRM operational capabilities:
- **1-Click Call**: Initiates phone call via `tel:+91...` and opens the Call Outcome form modal.
- **1-Click WhatsApp**: Opens WhatsApp chat via `wa.me/91...` in a new tab.
- **1-Click Email**: Opens email composer via `mailto:...`.
- **Change Stage**: Clicking the stage badge opens the Stage Change Modal requiring business justification notes.
- **Schedule Follow-up**: Modal to schedule follow-up date, time, and purpose.
- **Reassign Lead**: Fast assignment to Manager or Sales Representative.
- **Add Note**: Threaded notes modal.
- **Export to CSV**: Exports the active sheet view to a downloaded CSV file.

---

## 6. Stage Change Audit Rules
- Overwriting stages without audit history is strictly prohibited.
- `Pipeline.changeStage(customerId, toStage, reason)` requires a non-empty reason string.
- Automatically inserts a record in `crm_stage_history` and `crm_activities`.
- Dynamically updates customer `status` (`Active`, `Converted`, `Lost`, `Not Interested`).
