# Career Apex CRM — Software Development Lifecycle (SDLC) Documentation Suite
## Master Document Index & Navigation Guide

---

### Project Overview
- **Project Name:** Career Apex Sales CRM (Student Placement & Career Counseling Sales CRM)
- **Domain:** Higher Education, Job Seeking, Career Placement & Vocational Counseling
- **System Version:** 2.0 (Prototype to Full-Stack Enterprise Blueprint)
- **Author:** Antigravity Engineering Architecture Team
- **Date:** September 2026

---

### Purpose of this Documentation Suite
This directory contains the formal, end-to-end software development lifecycle (SDLC) specifications for Career Apex CRM. Each document serves a dedicated phase in the engineering lifecycle—from executive business requirements, product definition, and user role scoping, to high-level architecture, low-level component design, relational schema, API contracts, screen-by-screen functional blueprints, technology stacks, and quality assurance test plans.

---

### Documentation Suite Map

| Document Code | Document Title | Target Audience | Primary Focus |
| :--- | :--- | :--- | :--- |
| **[01_BRS]** | [Business Requirements Specification](./01_BRS_BUSINESS_REQUIREMENTS_SPECIFICATION.md) | Business Owners, Sales Leadership, Stakeholders | Business problem statement, ROI goals, candidate lifecycle, placement fee monetization, operational KPIs. |
| **[02_URS]** | [User Requirements & Role Hierarchy](./02_URS_USER_ROLES_AND_PERMISSIONS.md) | HR, Project Managers, Security Architects | User personas (Admin, Manager, Counselor), organizational hierarchy, scope of data access, RBAC matrix. |
| **[03_PRD]** | [Product Requirements Document](./03_PRD_PRODUCT_REQUIREMENTS_DOCUMENT.md) | Product Managers, UI/UX Leads, Tech Leads | Functional requirements (FRs), non-functional requirements (NFRs), system rules, edge cases, acceptance criteria. |
| **[04_SCREEN]** | [Screen-by-Screen Functional Specification](./04_SCREEN_BY_SCREEN_FUNCTIONAL_SPECIFICATION.md) | Frontend Developers, QA Engineers, Designers | Exhaustive deep-dive into all 14 screens, UI layout, components, buttons, filters, modals, workflows, and state changes. |
| **[05_HLD]** | [High-Level Design Document](./05_HLD_HIGH_LEVEL_DESIGN.md) | Enterprise Architects, Lead Developers | System topology, C4 architectural models, data flow sequences, security, session management, and scalability. |
| **[06_LLD]** | [Low-Level Design Document](./06_LLD_LOW_LEVEL_DESIGN.md) | Full-Stack Developers, Module Owners | Component class diagrams, state machines (Pipeline & Payments), algorithmic data processing, and validation rules. |
| **[07_DB]** | [Database Design & Data Dictionary](./07_DATABASE_DESIGN_AND_DATA_DICTIONARY.md) | Database Administrators, Backend Engineers | Relational ERD schema, PostgreSQL DDL statements, field definitions, foreign keys, indexes, and integrity rules. |
| **[08_API]** | [RESTful API Specification](./08_REST_API_SPECIFICATION.md) | Backend & Integration Developers | REST API contracts, endpoints, query parameters, request/response JSON payloads, status codes, and error models. |
| **[09_STACK]** | [Tech Stack & Migration Roadmap](./09_TECH_STACK_AND_MIGRATION_ROADMAP.md) | DevOps, Tech Leads, Engineering Managers | Production technology stack recommendations, infrastructure setup, and 6-phase migration roadmap from prototype. |
| **[10_TEST]** | [Test Plan & Acceptance Test Cases](./10_TEST_PLAN_AND_ACCEPTANCE_TEST_CASES.md) | QA Leads, Automation Engineers, Product Owners | Comprehensive testing strategy, test scenarios, manual/automated test cases, regression checklists, and test data sets. |

---

### Reading Recommendations by Role
- **For Business Executives & Product Managers:** Start with `01_BRS`, `02_URS`, `03_PRD`, and `04_SCREEN`.
- **For Technical Architects & Tech Leads:** Review `05_HLD`, `06_LLD`, `07_DB`, and `09_STACK`.
- **For Frontend & Backend Developers:** Read `03_PRD`, `04_SCREEN`, `06_LLD`, `07_DB`, and `08_API`.
- **For Quality Assurance (QA) & Testers:** Focus on `03_PRD`, `04_SCREEN`, `08_API`, and `10_TEST`.

---
