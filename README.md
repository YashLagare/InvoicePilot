# InvoicePilot — Project Documentation

## Project Name
InvoicePilot

### Project Description
InvoicePilot is a Next.js (App Router) web application that lets authenticated users create invoices with line items, manage invoice status (PENDING/PAID), generate invoice PDFs, and send invoice-related emails (new invoice, updated invoice, and payment reminders).

### Business Problem Solved
Freelancers and SMBs often need a fast way to:
- create invoices with multiple line items,
- keep track of paid vs pending invoices,
- download/share invoices as PDFs,
- notify clients by email when invoices are created/updated and to send reminders.

### Target Users
- Freelancers
- Small businesses
- Teams that need lightweight invoicing and email delivery

### Key Benefits
- Magic-link authentication (email-only) via NextAuth
- Invoice creation/editing with validated form inputs (Zod + Conform)
- PDF generation using `jspdf`
- Automated email delivery via Nodemailer transport
- Dashboard overview (summary blocks, recent invoices, revenue chart for paid invoices)

Project Screenshot Placeholder:

[INSERT_PROJECT_COVER_SCREENSHOT_HERE]

---

# 1. EXECUTIVE SUMMARY

## Project Purpose
Provide an invoicing dashboard that supports invoice lifecycle management (create, edit, download, delete, mark as paid) and automated email communication.

## Core Features
- Authentication using NextAuth with a Nodemailer provider (magic link)
- Onboarding to capture user profile details (first/last name, address)
- Create invoice with:
  - invoice meta (name, number, currency)
  - “From” (seller details) and “To” (client details)
  - invoice date and payment terms (due date offset)
  - line items (description, quantity, rate)
  - optional note
- Edit invoice (updates invoice + items)
- Delete invoice
- Mark invoice as PAID
- Download invoice as a PDF via API
- Send reminder emails via API

## Technology Summary
- **Frontend/Fullstack:** Next.js (App Router) + React + TypeScript
- **Backend/data:** NextAuth + Prisma + PostgreSQL
- **PDF generation:** `jspdf`
- **Email:** Nodemailer transport (credentials configured via environment variables)
- **UI:** Tailwind CSS + shadcn/ui components

## Architecture Overview
This is a fullstack Next.js application where:
- UI routes are implemented as Next.js pages under `app/`.
- Server-side operations are handled via:
  - Next.js Route Handlers under `app/api/**` (for PDF generation and reminder email)
  - Next.js Server Actions in `app/action.ts` (for onboarding and invoice CRUD/paid updates)
- Database access is performed with Prisma Client (custom PrismaPg adapter + pg Pool).

Architecture diagram:

```text
User
  │
  ▼
Next.js Frontend (App Router)
  │
  │  (Server Actions)
  ▼
Next.js Server (Route Handlers + Actions)
  │
  ▼
Prisma Client
  │
  ▼
PostgreSQL
```

## Business Value
- Reduces manual invoice creation and follow-up work.
- Improves invoice delivery through automated email templates.
- Provides visibility into invoice status and paid revenue trends.

---

# 2. PROJECT OVERVIEW

## Project Name
InvoicePilot

## Objective
Enable authenticated users to generate and manage invoices end-to-end, including PDF downloads and email notifications.

## Scope
Implemented features (based on source code):
- Home page + login + verify page
- Dashboard with statistical blocks, invoice list, invoice graph (paid invoices last 30 days), and recent invoices
- Invoice CRUD operations plus status updates
- PDF generation and reminder emails via API routes

Out of scope / not implemented (explicitly):
- No REST API for general invoice listing/search; listing is done in server components.
- No payment processor integration (e.g., Stripe) is implemented.
- No admin roles/permissions system is implemented.

## Main Functionalities
- Magic-link login (email only)
- Onboarding form updating user profile fields
- Create invoice (validated form)
- Edit invoice (replace items)
- Delete invoice
- Mark invoice as paid
- Generate PDF for an invoice
- Send reminder email for an invoice

## Business Use Case
A freelancer generates invoices with multiple line items, delivers them to clients (via email templates), then later marks them paid and sends reminders.

## Target Audience
Freelancers and SMBs using invoicing workflows requiring PDF and email delivery.

Project Screenshot Placeholder:

[INSERT_PROJECT_OVERVIEW_SCREENSHOT_HERE]

---

# 3. TECHNOLOGY STACK

## Frontend
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI Layer:** React Server Components and Client Components (mixed)
- **Styling:** Tailwind CSS
- **UI Component Library:** shadcn/ui (`components/ui/*`)
- **Form Handling:** Conform (`@conform-to/react`, `@conform-to/zod`) + Zod
- **Charts:** `recharts` (used for revenue overview graph)
- **Client Notifications:** `sonner` (toasts)

## Backend
- **Runtime:** Next.js server (Route Handlers + Server Actions)
- **Auth Framework:** NextAuth v5 beta
- **Email Delivery:** Nodemailer (via NextAuth Nodemailer provider and direct Nodemailer transport for invoice emails)
- **PDF Generation:** `jspdf`

## Database
- **Database Type:** PostgreSQL
- **ORM/Access Layer:** Prisma Client
- **Storage Strategy:**
  - Invoice data and invoice items stored in relational tables as defined by Prisma schema.
  - Authentication data stored using NextAuth PrismaAdapter models (User/Account/Session/VerificationToken/Authenticator).

## Authentication
Implemented via:
- **NextAuth** (`next-auth`) using **PrismaAdapter** with a Prisma-backed session store
- **Provider:** `next-auth/providers/nodemailer` (magic link)

## DevOps & Deployment
- Build/run scripts are standard Next.js scripts:
  - `npm run dev`, `npm run build`, `npm run start`
- Prisma runtime uses `DATABASE_URL` and Prisma PG adapter.
- Actual hosting/CI/CD services are not implemented/configured in the repository (not found in inspected files).

---

# 4. FEATURES LIST

> Note: Only features present in the codebase are documented.

1. **Magic-link email authentication**
   - **Purpose:** Authenticate users without passwords using email magic links.
   - **User Benefit:** Quick sign-in workflow.
   - **Related Components:**
     - `app/api/auth/[...nextauth]/route.ts`
     - `app/utils/auth.ts`
     - `app/login/page.tsx`
     - `app/verify/page.tsx`

2. **User onboarding profile update**
   - **Purpose:** Capture additional user information (first name, last name, address).
   - **User Benefit:** Pre-fills “From” details when creating invoices.
   - **Related Components:** `app/action.ts` (server action `onboardingUser`)

3. **Invoice creation with validated input**
   - **Purpose:** Create an invoice and its invoice items.
   - **User Benefit:** Ensures invoice data correctness and reduces manual entry errors.
   - **Related Components:**
     - `app/components/CreateInvoice.tsx`
     - `app/utils/zodSchemas.ts` (invoiceSchema)
     - `app/action.ts` (server action `createInvoice`)

4. **Invoice editing**
   - **Purpose:** Update invoice meta and replace invoice items.
   - **User Benefit:** Maintain up-to-date invoice data.
   - **Related Components:**
     - `app/dashboard/invoices/[invoiceId]/page.tsx`
     - `app/components/EditInvoice.tsx`
     - `app/action.ts` (server action `editInvoice`)

5. **Invoice deletion**
   - **Purpose:** Permanently remove an invoice for the authenticated user.
   - **User Benefit:** Cleanly remove incorrect invoices.
   - **Related Components:**
     - `app/dashboard/invoices/[invoiceId]/delete/page.tsx`
     - `app/action.ts` (server action `DeleteInvoice`)

6. **Mark invoice as paid**
   - **Purpose:** Change invoice status to `PAID`.
   - **User Benefit:** Track payment progress.
   - **Related Components:**
     - `app/dashboard/invoices/[invoiceId]/paid/page.tsx`
     - `app/action.ts` (server action `MarkAsPaidInvoice`)

7. **PDF generation for invoices**
   - **Purpose:** Generate a PDF from invoice data.
   - **User Benefit:** Download/share invoices.
   - **Related Components:** `app/api/invoice/[invoiceId]/route.ts`

8. **Reminder email delivery**
   - **Purpose:** Send a reminder email containing invoice summary and a download link.
   - **User Benefit:** Follow-up automatically.
   - **Related Components:**
     - `app/api/email/[invoiceId]/route.ts`
     - `app/utils/emailTemplate.ts` (reminder template)
     - `app/components/InvoiceActions.tsx`

9. **Dashboard statistical overview**
   - **Purpose:** Show revenue/invoice counts based on database queries.
   - **User Benefit:** Quick status visibility.
   - **Related Components:** `app/components/DashboardBlocks.tsx`

10. **Revenue chart for paid invoices (last 30 days)**
   - **Purpose:** Visualize aggregated paid invoice totals over the last 30 days.
   - **User Benefit:** Identify payment trends.
   - **Related Components:** `app/components/InvoiceGraph.tsx`, `app/components/Graph.tsx`

11. **Invoice listing with status filter and pagination**
   - **Purpose:** List invoices for the authenticated user with filtering by status and pagination.
   - **User Benefit:** Manage many invoices efficiently.
   - **Related Components:**
     - `app/dashboard/invoices/page.tsx`
     - `app/components/StatusFilter.tsx`
     - `app/components/InvoiceList.tsx`
     - `app/components/PaginationComponent.tsx`

Feature Screenshot Placeholder:

[INSERT_FEATURE_SCREENSHOT_HERE]

---

# 5. FOLDER STRUCTURE

Actual folder structure (as present in the repository):

```text
invoice-pilot/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts
│   │   ├── email/[invoiceId]/
│   │   │   └── route.ts
│   │   └── invoice/[invoiceId]/
│   │       └── route.ts
│   ├── components/
│   │   ├── CreateInvoice.tsx
│   │   ├── DashboardBlocks.tsx
│   │   ├── DashboardLinks.tsx
│   │   ├── EditInvoice.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Graph.tsx
│   │   ├── InvoiceActions.tsx
│   │   ├── InvoiceGraph.tsx
│   │   ├── InvoiceItemList.tsx
│   │   ├── InvoiceList.tsx
│   │   ├── ModeToggle.tsx
│   │   ├── PaginationComponent.tsx
│   │   ├── RecentInvoices.tsx
│   │   ├── StatusFilter.tsx
│   │   ├── SubmitButton.tsx
│   │   └── theme-provider.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── invoices/
│   │       ├── page.tsx
│   │       ├── [invoiceId]/
│   │       │   ├── page.tsx
│   │       │   ├── delete/page.tsx
│   │       │   └── paid/page.tsx
│   │       └── create/page.tsx
│   ├── login/page.tsx
│   ├── onboarding/page.tsx
│   ├── page.tsx
│   └── verify/page.tsx
├── components/
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── sonner.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       └── ...
├── lib/
│   ├── db.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── *.png, *.gif, *.webp, svg
│   └── ...
├── prisma.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
└── PROJECT_DOCUMENTATION.md (this file)
```

Important top-level files:
- `app/api/**`: Route handlers for auth, invoice PDF, and reminder emails.
- `app/action.ts`: Server Actions for onboarding and invoice mutations.
- `lib/db.ts`: Prisma client initialization (PostgreSQL via PrismaPg adapter).
- `prisma/schema.prisma`: Database schema and relations.

---

# 6. SYSTEM ARCHITECTURE

Architecture pattern
- Next.js App Router (hybrid server/client)
- Server Actions for mutations
- Route Handlers for PDF and email reminder endpoints
- Prisma for database operations
- NextAuth for authentication

Request lifecycle & data flow

```text
User Interaction (UI)
   │
   ├─(Server Action submit)───────────────┐
   │                                       ▼
   │                               Next.js Server Action
   │                                       ▼
   │                                  Prisma Client
   │                                       ▼
   │                               PostgreSQL / tables
   │                                       ▼
   │                                  Redirect/Response
   │
   └─(API call / route handler)────────────┐
                                           ▼
                                   Next.js Route Handler
                                           ▼
                                     Prisma Client
                                           ▼
                                  (Generate PDF / Send Email)
                                           ▼
                                      Response (JSON/PDF)
```

Communication model
- Browser ↔ Next.js via:
  - Server Actions (form submissions)
  - Fetch to `/api/email/:invoiceId`
  - Direct browser navigation to `/api/invoice/:invoiceId` for PDF

---

# 7. DATABASE DESIGN

All database entities are defined in `prisma/schema.prisma`.

## User
- **Purpose:** Authenticated account profile used by NextAuth.
- **Fields:**
  - `id: String` (PK, default `cuid()`)
  - `firstName?: String`
  - `lastName?: String`
  - `address?: String`
  - `email: String` (unique)
  - `emailVerified?: DateTime`
  - `image?: String`
  - Relations:
    - `accounts: Account[]`
    - `sessions: Session[]`
    - `invoices: Invoice[]`
    - `Authenticator[]` (WebAuthn optional)
  - `createdAt: DateTime` (default now)
  - `updatedAt: DateTime` (auto update)

## Account
- **Purpose:** NextAuth account linking model.
- **Fields:**
  - `userId: String` (FK to User)
  - `type: String`
  - `provider: String`
  - `providerAccountId: String`
  - Token fields (`refresh_token`, `access_token`, etc.)
  - `createdAt`, `updatedAt`
- **Constraints:** composite primary key `@@id([provider, providerAccountId])`

## Session
- **Purpose:** NextAuth session storage model.
- **Fields:**
  - `sessionToken: String` (unique, PK)
  - `userId: String` (FK to User)
  - `expires: DateTime`
  - `createdAt`, `updatedAt`

## VerificationToken
- **Purpose:** NextAuth verification token storage.
- **Fields:**
  - `identifier: String`
  - `token: String`
  - `expires: DateTime`
- **Constraints:** composite primary key `@@id([identifier, token])`

## Authenticator
- **Purpose:** Optional WebAuthn model for NextAuth (present in schema but provider usage not implemented beyond schema support).
- **Fields:** credential fields; relation to User.

## Invoice
- **Purpose:** Main business entity representing an invoice.
- **Fields:**
  - `id: String` (PK, default `uuid()`)
  - `total: Int`
  - `status: InvoiceStatus`
  - `date: DateTime`
  - `dueDate: String`
  - `fromName: String`
  - `fromEmail: String`
  - `fromAddress: String`
  - `clientName: String`
  - `clientEmail: String`
  - `clientAddress: String`
  - `currency: String`
  - `invoiceName: String`
  - `invoiceNumber: Int`
  - `note?: String`
  - Relations:
    - `items: InvoiceItem[]`
    - `user?: User` via `userId?: String`
  - `createdAt`, `updatedAt`

## InvoiceItem
- **Purpose:** Line items within an invoice.
- **Fields:**
  - `id: String` (PK, default `uuid()`)
  - `description: String`
  - `quantity: Int`
  - `rate: Int`
  - `invoiceId: String` (FK to Invoice)
  - Relation: `invoice: Invoice` with cascade delete

## InvoiceStatus enum
- `PAID`
- `PENDING`

---

# 8. ENTITY RELATIONSHIP DIAGRAM (ERD)

```text
User
 ├─ id (PK)
 ├─ email (unique)
 └─ invoices (1:N)

     1:N
     ▼
Invoice
 ├─ id (PK)
 ├─ userId (FK -> User.id, optional)
 ├─ status (InvoiceStatus)
 └─ items (1:N)

     1:N
     ▼
InvoiceItem
 ├─ id (PK)
 ├─ invoiceId (FK -> Invoice.id)
 └─ description, quantity, rate
```

---

# 9. SECURITY ARCHITECTURE

Security architecture based on actual implementation in source code.

## Authentication
- Uses NextAuth (`next-auth`) with:
  - Prisma adapter storing sessions.
  - Nodemailer provider configured from environment variables.

## Authorization
- The app uses an app-level helper `requireUser()`.
- `requireUser()`:
  - calls `auth()` to retrieve session.
  - if `!session?.user`, redirects to `/`.
- Invoice-level authorization is implemented by filtering queries with `userId` and `invoice.id`:
  - Examples:
    - `app/components/InvoiceList.tsx` uses `where: { userId }`.
    - `app/dashboard/invoices/[invoiceId]/page.tsx` uses `findUnique({ where: { id: invoiceId, userId } })`.
    - `app/dashboard/invoices/[invoiceId]/delete/page.tsx` checks invoice belongs to user.
    - `app/dashboard/invoices/[invoiceId]/paid/page.tsx` checks invoice belongs to user.
    - Reminder email endpoint finds invoice with `where: { id, userId }`.

## Session Management
- Managed by NextAuth with Prisma session storage.

## Token Strategy
- NextAuth manages session tokens internally.
- The repository does not expose direct JWT verification logic; it relies on NextAuth's `auth()`.

## Protected Routes
- Server-rendered dashboard and invoice pages call `requireUser()`.
- API endpoints requiring invoice ownership call `requireUser()` too.

## Validation
- Zod schemas validate onboarding and invoice form data in server actions:
  - `app/utils/zodSchemas.ts` uses `invoiceSchema` and `onboardingSchema`.

## Encryption
- Encryption specifics for tokens are not explicitly configured in code.
- The app relies on NextAuth and its underlying secure mechanisms.

Security diagram:

```text
User Request
  │
  ▼
requireUser() / NextAuth auth()
  │
  ├─ if no session.user → redirect to '/'
  │
  └─ if session.user exists
        │
        ▼
Invoice queries include userId constraint
        │
        ▼
Proceed with mutation or data response
```

---

# 10. AUTHENTICATION FLOW

Authentication is implemented using **NextAuth v5** with **Nodemailer magic link**.

```text
User enters email on /login
    │
    ▼
Login form submits to NextAuth signIn('nodemailer')
    │
    ▼
NextAuth Nodemailer provider sends magic link email
    │
    ▼
User opens magic link (NextAuth verify step)
    │
    ▼
NextAuth creates/updates session (Prisma-backed)
    │
    ▼
User redirected to /dashboard
```

Verified behavior in code:
- Login page checks `session?.user` and redirects to `/dashboard`.
- `/verify` route is a UI page that instructs user to check email (it does not implement token verification itself; verification is handled by NextAuth).

---

# 11. APPLICATION FLOW

High-level app lifecycle and runtime flow.

```text
App Startup
   │
   ▼
Load Next.js App Router Routes
   │
   ▼
User visits:
  - Home (/)
  - Login (/login)
  - Verify (/verify)
  - Dashboard (/dashboard)
   │
   ▼
Server components call requireUser() where required
   │
   ▼
Render dashboard/list/forms
   │
   ▼
User triggers actions:
  - create/edit invoice (Server Action)
  - send reminder email (POST to API route)
  - download invoice PDF (GET to API route)
   │
   ▼
Database update / email sending
   │
   ▼
UI redirect or JSON response
```

---

# 12. BACKEND INTERNAL FLOW

Backend operations split into:
- Route Handlers (PDF generation, reminder email)
- Server Actions (onboarding, invoice CRUD)

```text
Client Request
  │
  ├─(Route Handler)→ Route Handler
  │                  │
  │                  ▼
  │             requireUser() (for reminder)
  │                  │
  │                  ▼
  │              Prisma query/update
  │                  │
  │                  ▼
  │        PDF generation or Nodemailer send
  │                  │
  │                  ▼
  │               Response (PDF/JSON)
  │
  └─(Server Action)→ Next.js Server Action
                     │
                     ▼
               requireUser()
                     │
                     ▼
            Conform/Zod validation
                     │
                     ▼
              Prisma create/update/delete
                     │
                     ▼
            Send email (create/edit only; reminders via API)
                     │
                     ▼
                Redirect
```

---

# 13. FRONTEND INTERNAL FLOW

```text
Browser loads route
   │
   ▼
Next.js Server Component renders page
   │
   ▼
If page includes Client Components:
   - forms
   - filters
   - invoice actions
   - pagination
   ▼
User interacts with UI
   │
   ├─Form submission → Server Action
   │
   └─Reminder click → fetch POST /api/email/:invoiceId
   │
   ▼
Re-render (via redirect for server actions, or client toast + implicit refresh)
```

---

# 14. API DOCUMENTATION

The repository defines the following API endpoints under `app/api/**`.

> Note: The PDF download endpoint is a Route Handler returning a binary PDF.

## Endpoint Summary

| Method | Endpoint | Description | Auth Required |
| ------ | -------- | ----------- | ------------- |
| GET | `/api/invoice/:invoiceId` | Generates and returns an invoice PDF for the given invoiceId | **No explicit requireUser() in handler** (handler queries by id only; it does **not** filter by `userId`) |
| POST | `/api/email/:invoiceId` | Sends reminder email for the given invoiceId | **Yes** (uses `requireUser()` and filters by userId) |

## 1) Download Invoice PDF

### Endpoint Name
Download Invoice (PDF)

- **Method:** `GET`
- **Endpoint:** `/api/invoice/:invoiceId`
- **Auth Required:** Not explicitly required by the implementation.
- **Middleware Used:** None in this route.

Request parameters

| Type | Name | Example |
| ---- | ---- | ------- |
| URL Param | invoiceId | `uuid-string` |

Request body
- None (GET)

Success response
- `Content-Type: application/pdf`
- `Content-Disposition: inline`
- Response body: PDF binary

Error response
- `404` JSON: `{ "message": "Invoice not found" }`

Internal flow

```text
GET /api/invoice/:invoiceId
    │
    ▼
Prisma invoice.findUnique({ where: { id: invoiceId }, select: ... })
    │
    ▼
If not found → NextResponse.json(404)
    │
    ▼
Create jsPDF
    │
    ▼
Return NextResponse(pdfBuffer, headers for PDF)
```

Security note (based on code):
- This endpoint does **not** check `userId` ownership when fetching invoice.
- Therefore, access control is not enforced at this specific route handler level.

## 2) Send Reminder Email

### Endpoint Name
Send Invoice Reminder Email

- **Method:** `POST`
- **Endpoint:** `/api/email/:invoiceId`
- **Auth Required:** Yes
- **Middleware Used:** `requireUser()`

Request parameters

| Type | Name | Example |
| ---- | ---- | ------- |
| URL Param | invoiceId | `uuid-string` |

Request body
- Not used (handler reads only params)

Success response
- `200` JSON:

```json
{ "success": true, "message": "Reminder email sent successfully" }
```

Error responses
- `404` JSON: `{ "error": "Invoice not found" }`
- `500` JSON: `{ "error": "Failed to send reminder email" }`

Internal flow

```text
POST /api/email/:invoiceId
    │
    ▼
requireUser() → session.user
    │
    ▼
Prisma invoice.findUnique({ where: { id: invoiceId, userId: session.user?.id } })
    │
    ▼
If not found → 404
    │
    ▼
Nodemailer emailClient.sendMail(reminder template)
    │
    ▼
Return JSON success
```

---

# 15. THIRD-PARTY INTEGRATIONS

## Email Delivery / Providers
- **NextAuth Nodemailer Provider:** Used for magic link login.
  - Configured via:
    - `process.env.EMAIL_SERVER_HOST`
    - `process.env.EMAIL_SERVER_PORT`
    - `process.env.EMAIL_SERVER_USER`
    - `process.env.EMAIL_SERVER_PASSWORD`
    - `process.env.EMAIL_FROM`
- **Nodemailer transport (`emailClient`)**: Used for sending invoice emails.
  - File: `app/utils/mailtrap.ts`

Integration flow

```text
Invoice creation/edit (Server Action)
    │
    ▼
Generate HTML template (app/utils/emailTemplate.ts)
    │
    ▼
emailClient.sendMail(...) via Nodemailer transport
    │
    ▼
Email sent to clientEmail
```

## PDF Generation
- `jspdf` is used server-side in `app/api/invoice/[invoiceId]/route.ts`.

External payment integrations
- None found in code.

External analytics
- None found in code.

---

# 16. ENVIRONMENT VARIABLES

The repository uses environment variables referenced in source code. Values are not available because `.env` content cannot be read in this environment.

| Variable | Purpose | Required |
| -------- | ------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma | Yes (required; `lib/db.ts` throws if missing) |
| `EMAIL_SERVER_HOST` | Nodemailer host (NextAuth provider + nodemailer transport) | Yes (used directly) |
| `EMAIL_SERVER_PORT` | Nodemailer port (number) | Yes (typed as Number; port may be undefined for NextAuth provider) |
| `EMAIL_SERVER_USER` | Nodemailer auth user | Yes (used by nodemailer auth) |
| `EMAIL_SERVER_PASSWORD` | Nodemailer auth password | Yes |
| `EMAIL_FROM` | From address used by email templates / senders | Optional (fallback used in code for some sends) |
| `NODE_ENV` | Prisma client caching behavior | Not required but used |

Environment variable usage notes (based on code):
- `lib/db.ts` throws error if `DATABASE_URL` is not set.
- Invoice emails attempt to use `process.env.EMAIL_FROM` with fallback:
  - `'InvoicePilot <hello@demomailtrap.com>'`
- Reminder endpoint also uses `process.env.EMAIL_FROM` with the same fallback.

Environment variable example (keys only):

```env
DATABASE_URL=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
```

---

# 17. DEPENDENCIES

## Frontend Dependencies (major)
- `next` (Next.js)
- `react`, `react-dom`
- `tailwindcss` (via Tailwind toolchain)
- `recharts` (charts)
- `lucide-react` (icons)
- `sonner` (toasts)
- `jspdf` (PDF generation; used in server code)

## Backend Dependencies (major)
- `next-auth` (authentication)
- `@auth/prisma-adapter`, `@prisma/client` (Prisma integration)
- `@prisma/adapter-pg`, `pg` (Postgres adapter)
- `nodemailer` (email sending)
- `zod`, `@conform-to/react`, `@conform-to/zod` (validation)

---

# 18. INSTALLATION GUIDE

1. Clone and enter project directory.

```bash
cd d:/MY-PROJECTS/InvoicePilot/invoice-pilot

npm install

# Prisma: ensure DATABASE_URL is set in your environment
# Then generate the Prisma client
npx prisma generate

# Run the development server
npm run dev
```

---

## 19. DEPLOYMENT GUIDE

This project is a standard Next.js application.

### Recommended deployment topology

```text
Browser
  │
  ▼
Frontend Hosting (Next.js)
  │
  ▼
API Routes + Server Actions
  │
  ▼
PostgreSQL Database
```

### Steps
1. Set required environment variables (see `#16`).
2. Build the app:

```bash
npm run build
```

3. Start the server in production mode:

```bash
npm run start
```

> Note: The repository does not include Docker/Kubernetes/CI pipelines; deployment is therefore handled externally by your chosen platform.

---

## 20. RUNTIME FLOW

What happens after the application starts.

```text
Server Starts (Next.js)
   │
   ▼
Route handlers & server actions become available
   │
   ▼
User requests:
  - /login
  - /verify
  - /dashboard
  - /dashboard/invoices/*
  - /api/invoice/* (PDF)
  - /api/email/* (reminder)
   │
   ▼
Authentication checks via NextAuth (auth/requireUser)
   │
   ▼
Database queries/updates via Prisma
   │
   ▼
PDF generation or email sending (where applicable)
   │
   ▼
HTTP response / redirect
```

---

## 21. CHALLENGES & LEARNINGS

### Technical Challenges (based on implementation)
1. **Magic-link auth integration**
   - Ensuring NextAuth Nodemailer provider, session storage, and app gating all work together.

2. **Invoice item replacement during edit**
   - The edit action uses `deleteMany: {}` followed by `create` of the provided items.

3. **PDF generation formatting**
   - The PDF layout is manually positioned; line wrapping uses `jsPDF.splitTextToSize`.

4. **Email delivery reliability**
   - Uses Nodemailer transport; send failures are caught and logged in create/edit actions.

### Solutions Implemented
- Prisma-backed authentication and session gating via `requireUser()`.
- Zod validation for onboarding and invoice create/edit inputs.
- Server-side PDF generation in a dedicated route handler.
- Server actions for create/edit + direct API route for reminder emails.

### Key Learnings
- Keep invoice ownership constraints in all mutation and reminder flows.
- Split responsibilities: server actions for CRUD, route handlers for binary/PDF and reminder emailing.

---

## 22. COMMON ERRORS & TROUBLESHOOTING

### Installation / Build
- **Prisma error about DATABASE_URL**
  - Fix: set `DATABASE_URL` in your environment.

### Authentication
- **Users can’t sign in / magic link not delivered**
  - Fix: verify `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, and `EMAIL_FROM`.

- **Redirects to `/` instead of dashboard**
  - Fix: ensure NextAuth session is established; confirm environment variables and database connectivity.

### Database / Invoice operations
- **Invoice not found (404)**
  - Cause: invoice does not exist, or (for reminder) does not belong to the current user.

### Email sending
- **Reminder email fails (500)**
  - Fix: verify nodemailer transport configuration and that invoice data exists for the current user.

---

## 23. PERFORMANCE ANALYSIS

### Current Optimizations
- Server-side pagination for invoice list (fetches 10 invoices per page).
- Prisma queries use `select` to limit returned columns.

### Potential Bottlenecks
- **PDF generation on demand**
  - Each download regenerates PDF server-side.

- **Email sending latency**
  - Reminder emails are triggered via client fetch; network/email provider latency impacts UX.

### Scalability Considerations
- Consider caching generated PDFs if download volume increases.
- Consider queuing email jobs (not implemented in current repository).

### Performance Recommendations
- Add caching headers or pre-generation strategy for PDFs.
- Introduce rate limiting for `/api/email/:invoiceId` (currently not present in inspected code).

---

## 24. SECURITY REVIEW

### Existing Security Measures (from code)
- **Authentication gating**: `requireUser()` redirects unauthenticated users.
- **Authorization by ownership** for invoice CRUD and reminders:
  - list uses `where: { userId }`
  - edit/delete/paid verify invoice belongs to `session.user?.id`
  - reminder email endpoint queries with `{ id: invoiceId, userId: session.user?.id }`
- **Input validation**: Zod schemas for onboarding/invoice create/edit.

### Security Risks / Gaps (explicitly from implementation)
- **PDF download authorization gap**
  - `/api/invoice/[invoiceId]/route.ts` fetches the invoice by `id` only and does **not** enforce `userId` ownership.
  - As a result, authenticated users are not required and invoice PDFs may be downloadable by guessing IDs.

### Recommended Improvements
1. Add authorization to the PDF route handler:
   - enforce `requireUser()`
   - query invoices by `{ id: invoiceId, userId: session.user?.id }`
2. Add rate limiting to reminder endpoint.
3. Validate and sanitize any email-related input (templates currently use provided fields directly).
4. Add CSRF protections for any state-changing operations exposed to the browser (server actions already require form submission; reminder uses fetch).

---

## 25. FUTURE ENHANCEMENTS

Based strictly on current architecture and gaps:
1. **Invoice PDF access control** (fix `/api/invoice/*` ownership).
2. **Queued email delivery** (background job/queue), instead of synchronous sending.
3. **Invoice number auto-increment per user** (currently stored as user input; no unique constraint enforced).
4. **Improved due date handling**
   - current dueDate field is stored as string and used as offset days in server action.
5. **Search/sort** for invoices (currently status filter + pagination; full-text search not implemented).
6. **Role-based access** (no admin/user roles implemented).

---

## 26. DEVELOPER NOTES

### Architecture Decisions
- Use Next.js App Router with Server Components and Server Actions for CRUD.
- Use Route Handlers for endpoints that return non-HTML responses (PDF binary, reminder email JSON).
- Use Prisma for data modeling and enforcement of relationships.

### Maintainability Notes
- Consolidate email link generation:
  - invoice create/edit actions use hardcoded `http://localhost:3000`.
  - reminder endpoint also uses `http://localhost:3000`.

### Refactoring Opportunities
- Remove duplication between `createInvoice` and `editInvoice` email template selection logic.
- Standardize date types (`dueDate` is `String` in Prisma; consider `Int` for offset days if appropriate).

### Technical Debt Observations
- PDF endpoint lacks authorization checks.
- Hardcoded base URL (`localhost:3000`) inside templates.
- Reminder endpoint does not validate request body (it only uses params) and there is no rate limiting.

