# RESTful API Specification & Contracts
## Career Apex CRM — Student Placement & Career Counseling Sales CRM

---

### Document Control
- **Document Identifier:** API-APEX-08
- **Version:** 2.0
- **Base URL:** `https://api.crm.careerapex.com/api/v1`
- **Specification Standard:** OpenAPI 3.0 / RESTful JSON
- **Authentication:** HTTP Bearer Header (`Authorization: Bearer <JWT_TOKEN>`)

---

## 1. Global Standards & Error Envelope

### 1.1 Standard Response Format
Every API response returns a uniform JSON envelope:
```json
{
  "success": true,
  "statusCode": 200,
  "data": { ... },
  "message": "Operation completed successfully.",
  "timestamp": "2026-09-30T14:30:00.000Z"
}
```

### 1.2 Standard Error Response Format
```json
{
  "success": false,
  "statusCode": 400,
  "error": "BAD_REQUEST",
  "message": "Student primary mobile number is already registered.",
  "details": [
    {
      "field": "mobile",
      "issue": "Duplicate phone number matched candidate CRM-STU-004."
    }
  ],
  "timestamp": "2026-09-30T14:30:00.000Z"
}
```

### 1.3 HTTP Status Codes
| Code | Constant | Meaning |
| :---: | :--- | :--- |
| `200` | `OK` | Request succeeded; body contains data payload. |
| `201` | `CREATED` | Resource successfully created (Candidate, Payment, Follow-up). |
| `400` | `BAD_REQUEST` | Validation failed or business rule violation. |
| `401` | `UNAUTHORIZED` | Missing or invalid bearer JWT token. |
| `403` | `FORBIDDEN` | Role has insufficient permissions to perform action. |
| `404` | `NOT_FOUND` | Candidate or resource ID does not exist. |
| `409` | `CONFLICT` | Duplicate mobile phone number detected. |
| `500` | `INTERNAL_SERVER_ERROR` | Unhandled server exception. |

---

## 2. API Endpoints Catalog

### 2.1 Authentication Endpoints

#### `POST /auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "rajesh.admin@careerapex.com",
    "password": "Password@123"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
      "expiresIn": 3600,
      "user": {
        "id": "usr-001",
        "name": "Rajesh Sharma",
        "email": "rajesh.admin@careerapex.com",
        "role": "admin",
        "avatar": "../assets/avatars/admin.png"
      }
    }
  }
  ```

---

### 2.2 Student Candidate Endpoints

#### `GET /students`
- **Access:** Authenticated (Data scoped automatically by user role)
- **Query Parameters:**
  - `search` (string): Text query across ID, Name, College, Skills, Mobile.
  - `stage` (string): Pipeline stage filter.
  - `paymentStatus` (string): `All`, `Fully Paid`, `Partially Paid`, `Pending`, `Overdue`.
  - `passingYear` (string): `2026`, `2025`, `2024`, etc.
  - `salespersonId` (string): Counselor ID filter.
  - `page` (integer): Page number (default: 1).
  - `pageSize` (integer): Rows per page (default: 10, max: 100).
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "items": [
        {
          "id": "CRM-STU-001",
          "name": "Aarav Sharma",
          "mobile": "9876543210",
          "email": "aarav.sharma@gmail.com",
          "qualification": "B.Tech Computer Science",
          "college": "IIT Delhi",
          "passingYear": "2025",
          "skills": "Java, Python, Spring Boot",
          "targetRole": "Full Stack Developer",
          "stage": "Converted",
          "status": "Placed / Hired",
          "priority": "High",
          "salespersonName": "Amit Verma",
          "totalFee": 45000,
          "paidAmount": 45000,
          "pendingAmount": 0,
          "paymentStatus": "Fully Paid"
        }
      ],
      "pagination": {
        "page": 1,
        "pageSize": 10,
        "total": 24,
        "totalPages": 3,
        "hasNext": true,
        "hasPrev": false
      }
    }
  }
  ```

#### `POST /students`
- **Access:** Authenticated (Admin, Manager, Counselor)
- **Request Body:**
  ```json
  {
    "name": "Rohan Mehra",
    "mobile": "9845012345",
    "altMobile": "9845012346",
    "email": "rohan.m@gmail.com",
    "qualification": "B.E. Information Technology",
    "college": "BITS Pilani",
    "passingYear": "2025",
    "skills": "React, Node.js, PostgreSQL",
    "targetRole": "Frontend Engineer",
    "stage": "Cold Calling",
    "salespersonId": "usr-004",
    "totalFee": 45000,
    "paymentPlan": "2 Installments"
  }
  ```
- **Response `201 CREATED`:** Returns created student candidate object.

#### `POST /students/:id/stage`
- **Access:** Authenticated (Scoped)
- **Request Body:**
  ```json
  {
    "newStage": "Interested",
    "reason": "Candidate cleared counseling screening and agreed to placement track."
  }
  ```
- **Response `200 OK`:** Updates candidate stage and logs to `crm_stage_history`.

---

### 2.3 Placement Fee & Payment Endpoints

#### `POST /payments`
- **Access:** Authenticated (Scoped)
- **Request Body:**
  ```json
  {
    "customerId": "CRM-STU-004",
    "installmentId": "inst-02",
    "amount": 22500,
    "paymentMode": "UPI",
    "transactionRef": "UPI/329482910384",
    "notes": "Paid via GooglePay to corporate bank account"
  }
  ```
- **Response `201 CREATED`:**
  ```json
  {
    "success": true,
    "data": {
      "receiptNumber": "REC-00124",
      "customerId": "CRM-STU-004",
      "amount": 22500,
      "paymentMode": "UPI",
      "transactionRef": "UPI/329482910384",
      "updatedBalance": {
        "totalFee": 45000,
        "paidAmount": 45000,
        "pendingAmount": 0,
        "paymentStatus": "Fully Paid"
      }
    }
  }
  ```

#### `GET /payments/receipt/:receiptNumber`
- **Access:** Authenticated
- **Response `200 OK`:** Returns printable receipt voucher payload including candidate details, amount in words, and authorized counselor signature.

---

### 2.4 Reports & Analytics Endpoints

#### `GET /reports/revenue`
- **Access:** Admin, Manager
- **Query Parameters:** `startDate`, `endDate`, `counselorId`, `managerId`, `stage`, `paymentStatus`.
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "data": {
      "summary": {
        "totalBooked": 1600000,
        "totalCollected": 603500,
        "totalPending": 996500,
        "collectionRate": 37.7,
        "overdueCount": 6
      },
      "counselorLeaderboard": [
        {
          "counselorId": "usr-004",
          "name": "Amit Verma",
          "students": 8,
          "booked": 360000,
          "collected": 180000,
          "pending": 180000,
          "realizationRate": "50.0%"
        }
      ]
    }
  }
  ```
