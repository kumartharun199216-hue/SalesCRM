# 03. User Roles & Access Control (RBAC)

The application implements a 3-tier Role-Based Access Control model enforced across page navigation, customer data queries, and operational actions.

---

### Role Matrix Summary

| Feature / Page | Administrator | Sales Manager | Sales Representative |
| :--- | :---: | :---: | :---: |
| **Admin Dashboard** | ✅ Full Access | ❌ Restricted | ❌ Restricted |
| **Manager Dashboard** | ✅ Full Access | ✅ Team Scope | ❌ Restricted |
| **Salesperson Dashboard**| ✅ Full Access | ✅ Team Scope | ✅ Personal Scope |
| **View Customers** | ✅ All Customers | 👥 Team Customers | 👤 Assigned Only |
| **Create Customer** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Edit Customer** | ✅ All Customers | 👥 Team Customers | 👤 Assigned Only |
| **Delete Customer** | ✅ Allowed | ❌ Restricted | ❌ Restricted |
| **Assign / Reassign Leads** | ✅ Any User | 👥 Within Team | ❌ Restricted |
| **Excel Pipeline View** | ✅ All Stages | 👥 Team Leads | 👤 Assigned Only |
| **Stage Transitions** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Call Outcome Recording** | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **WhatsApp / Email Trigger**| ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Manage Team Members** | ✅ Create / Edit / Toggle | 👥 View Team Only | ❌ Restricted |
| **Reports & Analytics** | ✅ Company-wide | 👥 Team Scope | ❌ Restricted |
| **CSV Lead Import** | ✅ Allowed | ✅ Allowed | ❌ Restricted |
| **System Settings & Reset**| ✅ Full Access | ❌ Restricted | ❌ Restricted |

---

### Role Details & Responsibilities

#### 1. Administrator (`admin`)
- **Default Account**: Alexander Wright (`admin@crm.local` / `admin123`)
- **Scope**: Company-wide governance and system configuration.
- **Key Capabilities**:
  - Full CRUD permissions over all customer and lead records.
  - Can assign or reassign any lead to any manager or sales rep.
  - Can create, edit, activate, or deactivate sales managers and sales representatives.
  - Full visibility into company audit logs, stage transitions, and all performance reports.
  - Access to System Settings, JSON backup export/restore, and Demo Data reset.

#### 2. Sales Manager (`manager`)
- **Default Account**: Rajesh Sharma (`manager@crm.local` / `manager123`)
- **Scope**: Manages their specific regional sales team.
- **Key Capabilities**:
  - Visibility into customer records belonging to their assigned team members.
  - Can assign and reassign leads among sales reps reporting to them.
  - Monitors team pipeline stage velocity, team follow-ups, and team activities.
  - Access to Sales Team Performance reports and CSV import.
  - Cannot access system settings, cannot delete accounts, and cannot alter global user credentials.

#### 3. Sales Representative (`sales`)
- **Default Account**: Arun Kumar (`sales@crm.local` / `sales123`)
- **Scope**: Focused strictly on their personal assigned customer portfolio.
- **Key Capabilities**:
  - Dedicated personal workspace displaying today's urgent follow-up queue.
  - Can initiate calls, open WhatsApp chats, and trigger email drafts.
  - Records call outcomes, schedules follow-ups, and changes lead stages with audited notes.
  - Cannot access other sales reps' accounts, cannot access manager/admin dashboards, and cannot reassign leads.
