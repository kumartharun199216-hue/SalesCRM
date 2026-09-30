# 11. Development Notes & Implementation Decisions

## Architectural Principles Followed
1. **Decoupled JavaScript Layering**:
   - UI / Presentation (`pages/*.html`)
   - Domain Business Modules (`customers.js`, `leads.js`, `pipeline.js`, `followups.js`, `communication.js`, `reports.js`, `users.js`, `activities.js`)
   - Data Abstraction Layer (`storage.js`)
   - Persistent Storage (`localStorage`)
   - Neither component nor page files execute raw `localStorage.getItem` or `localStorage.setItem` calls directly.

2. **Fixed Sidebar Layout with Independent Scroll**:
   - The application viewport is locked to `100vh; overflow: hidden;` via `.crm-app-container`.
   - The left sidebar navigation (`.crm-sidebar`) is pinned with `position: sticky; top: 0; height: 100vh; flex-shrink: 0;` ensuring it never scrolls when the page scrolls.
   - The main content area (`.crm-main-content` / `.crm-page-body`) is clamped to `height: calc(100vh - 64px); max-height: calc(100vh - 64px); overflow-y: auto !important; overflow-x: auto;` ensuring smooth vertical and horizontal scrolling across all desktop and laptop resolutions.

3. **Excel-Sheet Style Pipeline View**:
   - Implemented per user directive to replace the traditional Kanban view with an Excel spreadsheet grid.
   - Designed with `.table-excel` featuring cell gridlines, freeze-pane sticky header row, sequential row indexing (`#1, #2, #3, ...`), top stage pill filters, toolbar search, and bottom status bar.
   - Stage sub-menu items are integrated directly into the sidebar navigation with individual count badges.

4. **Security & Validation Considerations**:
   - All dynamic DOM string interpolations pass through `Utils.escapeHtml()` to protect against cross-site scripting (XSS).
   - Phone numbers are validated against standard Indian 10-digit formats and stripped of formatting characters.
   - Duplicate detection checks both primary mobile and alternate mobile numbers across all accounts.

5. **Graceful Fallbacks & Empty States**:
   - Every list and spreadsheet view includes dedicated empty state cards when no records match filter criteria.
   - If `localStorage` is empty or cleared on initial load, `SeedData.initIfEmpty()` automatically detects this and populates the CRM with the full seed dataset.
