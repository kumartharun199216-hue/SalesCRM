# 01. Project Overview — Apex Sales CRM Frontend Prototype

## Executive Summary
Apex Sales CRM is a modular, high-performance, enterprise-grade Sales Customer Relationship Management (CRM) frontend prototype. It provides full lifecycle management for sales leads, customer accounts, organizational hierarchies, stage progression, follow-up scheduling, communication tracking, and analytical reporting.

The system is developed entirely without external backend dependencies or server databases. All application state, security contexts, audit trails, and lead transitions persist client-side using browser `localStorage` under a unified storage abstraction layer.

## Technology Stack
- **Structure**: Semantic HTML5 with accessibility attributes and unique IDs.
- **Styling**: Vanilla CSS3 using custom design tokens, modern typography (`Inter` & `Plus Jakarta Sans`), glassmorphism accents, and responsive layout grids.
- **Logic**: Pure Vanilla JavaScript (ES6+) structured modularly with clear separation of concerns (UI → Business Logic → Storage Service).
- **Icons**: FontAwesome 6 (CDN).
- **Analytics Visualization**: Chart.js (CDN) for executive charts, funnel analytics, and team leaderboards.
- **Data Persistence**: Browser `localStorage` with automated JSON schema migration, sequential ID generation, and full backup/restore capability.

## Key Objectives Achieved
1. **Zero Backend Required**: Fully functional prototype running directly in any modern browser.
2. **Realistic Business Workflows**: Pre-populated with 32 realistic corporate customer accounts across India's commercial hubs, 3 sales managers, 6 sales representatives, active follow-ups, and audit history.
3. **Role-Based Access Control (RBAC)**: Distinct permissions, dashboard views, and data scoping for Administrator, Sales Manager, and Sales Representative.
4. **Excel-Sheet Style Pipeline View**: Dedicated spreadsheet interface for managing all lead stages with freeze-pane headers, row numbering, quick communication buttons, stage transition modals, and CSV export.
5. **Stage Progression Audit**: Every stage change requires a documented business reason and creates an immutable transition log with author and timestamp.
6. **Unique Mobile Enforcement**: Prevents duplicate customer registration based on primary and alternate phone numbers with direct links to existing records.
7. **Actionable Communication**: Instant phone dialing via `tel:`, WhatsApp messaging via `wa.me`, email client invocation via `mailto:`, and structured call outcome logging.
8. **Extensibility**: Designed following Clean Architecture principles, ensuring seamless migration to a Node.js, Express, PostgreSQL, or MongoDB backend in future phases.
