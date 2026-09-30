# 08. Activity Tracking & Audit Engine

The application maintains a centralized, immutable audit log across all system operations to ensure compliance, visibility, and accountability.

---

### Tracked Action Types

The `Activities` module in `js/activities.js` records 15 distinct operations:

1. **`Login`**: User authenticated into the CRM.
2. **`Logout`**: User ended session.
3. **`Customer Created`**: New customer/lead registered.
4. **`Customer Edited`**: Customer metadata updated.
5. **`Customer Viewed`**: Customer profile opened and reviewed.
6. **`Customer Deleted`**: Account purged by Administrator.
7. **`Lead Assigned`**: Lead delegated to manager/salesperson.
8. **`Lead Reassigned`**: Existing lead reassigned to another agent.
9. **`Stage Changed`**: Lead moved across the sales pipeline with justification.
10. **`Call Initiated`**: Outbound call triggered via `tel:` link.
11. **`Call Recorded`**: Call outcome, remarks, and follow-up documented.
12. **`WhatsApp Opened`**: External WhatsApp conversation opened via `wa.me`.
13. **`Email Initiated`**: Email draft composer opened via `mailto:`.
14. **`Note Added`**: Threaded internal note attached to account.
15. **`Follow-up Created`**: Follow-up milestone scheduled.
16. **`Follow-up Completed`**: Follow-up resolved with completion remarks.
17. **`Customer Imported`**: Batch CSV import executed.

---

### Activity Data Structure
Every event record captures:
- `id`: Sequential identifier (`CRM-ACT-000001`).
- `user`: Acting user's full name.
- `role`: Role of the acting user (`admin`, `manager`, `sales`).
- `action`: One of the standardized action types above.
- `customerId`: Related CRM ID (or `null` for system-level actions).
- `description`: Contextual summary describing the event.
- `timestamp`: ISO 8601 UTC timestamp.

---

### Audit Engine Query Methods
- `Activities.log({ action, customerId, description, user, role })`: Appends new record to `crm_activities` and limits buffer to recent 1,000 entries.
- `Activities.getAll(filters)`: Multi-criteria filter query supporting text search, user filtering, action filtering, date filtering, and RBAC scoping.
- `Activities.getByCustomer(customerId)`: Returns timeline of all interactions specifically associated with an individual customer.
- `Activities.getStats()`: Computes aggregated activity metrics (Total, Today, This Week, This Month, Activity by User, Activity by Type).
