# InvoicePilot — Enterprise SaaS Invoicing Platform

## Cover Page

**Project Name:** InvoicePilot  
**Project Description:** InvoicePilot is a modern full-stack Next.js (App Router) enterprise SaaS application designed for freelancers, SMBs, and modern teams. It enables users to create professional invoices with live split-screen visual previews, manage client directories, configure business branding and bank payout details, issue tokenized public client portals, collect online credit card payments via Stripe Checkout, and track complete financial analytics and activity audit trails.  
**Business Problem Solved:** Eliminates administrative overhead, manual PDF formatting errors, fragmented client tracking, and delayed payment processing by centralizing client management, automated tax/discount calculations, tokenized invoice sharing, and automated online payment settlement.  
**Target Users:** Freelancers, Independent Contractors, Small Businesses, Agencies, and Modern Service Teams.  
**Business Value:** Accelerates invoice delivery, reduces payment cycles via online Stripe Checkout, automates payment status tracking, and provides real-time visibility into revenue metrics and receivables.  
**Current Version:** 0.1.0  
**Last Updated:** August 3, 2026  

### Repository Structure Summary
```text
InvoicePilot/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── email/[invoiceId]/
│   │   ├── invoice/[invoiceId]/
│   │   ├── pay/[token]/checkout/
│   │   ├── public/invoice/[token]/
│   │   └── webhooks/stripe/
│   ├── components/
│   ├── dashboard/
│   │   ├── clients/
│   │   ├── invoices/
│   │   └── settings/
│   ├── login/
│   ├── onboarding/
│   ├── pay/[token]/
│   ├── utils/
│   └── verify/
├── components/
│   ├── landing/
│   └── ui/
├── lib/
│   ├── generated/prisma/
│   ├── db.ts
│   └── utils.ts
└── prisma/
    └── schema.prisma
```

### Project Cover Screenshot
[INSERT_PROJECT_COVER_SCREENSHOT]

---

## Table of Contents
- [1 Executive Summary](#1-executive-summary)
- [2 Project Overview](#2-project-overview)
- [3 Technology Stack](#3-technology-stack)
- [4 System Architecture](#4-system-architecture)
- [5 Repository Structure](#5-repository-structure)
- [6 Features](#6-features)
- [7 UI Screenshots](#7-ui-screenshots)
- [8 Database Design](#8-database-design)
- [9 Entity Relationship Diagram](#9-entity-relationship-diagram)
- [10 Security](#10-security)
- [11 Authentication](#11-authentication)
- [12 API Documentation](#12-api-documentation)
- [13 Third-party Services](#13-third-party-services)
- [14 Environment Variables](#14-environment-variables)
- [15 Major Dependencies](#15-major-dependencies)
- [16 Installation Guide](#16-installation-guide)
- [17 Deployment](#17-deployment)
- [18 Request Lifecycle](#18-request-lifecycle)
- [19 Performance](#19-performance)
- [20 Security Review](#20-security-review)
- [21 Challenges & Engineering Decisions](#21-challenges--engineering-decisions)
- [22 Future Improvements](#22-future-improvements)
- [23 Developer Notes](#23-developer-notes)

---

# 1 Executive Summary

### Purpose
InvoicePilot provides a full-stack, secure invoicing platform that covers the complete lifecycle of client billing: client record management, business profile branding, live visual invoice creation, automated calculations, tokenized public sharing, online Stripe payment collection, and revenue analytics.

### Key Capabilities
- Passwordless magic link authentication via NextAuth v5 and Nodemailer.
- Client directory management with detailed payment histories and saved contact details.
- Business profile settings including logo branding, tax/VAT numbers, currency defaults, and bank payout instructions.
- Advanced invoice builder with side-by-side live visual PDF preview rendering.
- Interactive tax %, discount %, and shipping fee calculation engine.
- Responsive public client portal (`/pay/[token]`) with tokenized PDF downloads.
- Stripe Checkout integration with automated webhook handlers (`checkout.session.completed`).
- Event audit logging (`InvoiceActivity`) tracking invoice creation, edits, client views, reminders, and payment settlements.

### Technology Summary
- **Frontend & App Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend Architecture:** Server Actions (`app/action.ts`), Next.js Route Handlers (`app/api/**`).
- **Database & Data Layer:** PostgreSQL (Neon DB), Prisma ORM (`@prisma/client` with `@prisma/adapter-pg`).
- **Authentication:** NextAuth v5 (Auth.js) with Nodemailer magic link provider.
- **Payments & Webhooks:** Stripe Node SDK (`stripe`) with Checkout Sessions and Webhook listeners.
- **PDF Engine:** Server-side `jspdf` buffer generator.

### Architecture Summary
InvoicePilot follows Next.js App Router architecture leveraging React Server Components (RSC) for data fetching, Server Actions for mutations, Route Handlers for PDF generation and webhook processing, and Prisma ORM for type-safe database queries.

### Business Value
Reduces operational friction, prevents manual calculation mistakes, ensures fast online payment collection, and provides clear visibility over cash flow and pending receivables.

---

# 2 Project Overview

### Objective
To equip freelancers, SMBs, and service providers with an automated, brandable invoicing application featuring live visual document previews, client profile management, public sharing portals, and integrated online card payments.

### Scope
- User onboarding and magic-link authentication.
- Client directory management (Create, Read, Update, Delete).
- Company profile & branding settings (Logo, Tax ID, Currency, Bank Payout Details).
- Advanced invoice creation and editing with real-time live preview and tax math.
- Public client landing page (`/pay/[token]`) for viewing invoices and paying online via Stripe.
- Private and tokenized PDF buffer generation via Route Handlers.
- Automated email delivery for invoice notifications, payment reminders, and receipts.
- Financial analytics dashboard with Collected Revenue, Pending Receivables, Active Clients, and Total Invoices.

### Primary Modules
1. **Authentication Module:** Passwordless sign-in and session verification.
2. **Client Management Module:** Centralized client directory and billing records.
3. **Company Settings Module:** Business branding, default currencies, and bank details.
4. **Invoice Engine Module:** Live preview builder, tax/discount calculation, and PDF generation.
5. **Client Portal & Payments Module:** Public tokenized web page and Stripe Checkout integration.
6. **Analytics & Activity Module:** Revenue statistics, payment tracking, and audit logging.

### Target Audience
Freelancers, consultants, digital agencies, small business owners, and service providers.

### Real-world Use Cases
- A freelance designer creates an invoice, selects a saved client, applies a 10% tax rate, previews the invoice live, and emails a tokenized payment link.
- A client opens the public portal link, reviews the itemized breakdown, downloads the PDF, and pays instantly using a credit card via Stripe Checkout.
- The platform receives a Stripe webhook event, updates the invoice status to `PAID`, records transaction metadata, logs an activity event, and sends an automated payment receipt.

---

# 3 Technology Stack

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.2.9` | React framework providing App Router, RSC, and server-side rendering |
| **React** | `19.2.4` | UI component library |
| **TypeScript** | `^5` | Type-safe JavaScript superset |
| **Tailwind CSS** | `^4` | Utility-first CSS framework |
| **shadcn/ui** | `^4.11.0` | Accessible component library built on Radix UI |
| **Radix UI** | `^1.5.0` | Low-level primitive UI components |
| **Lucide React** | `^1.17.0` | Icon set |
| **Recharts** | `^3.8.0` | Data visualization library for dashboard graphs |
| **Sonner** | `^2.0.7` | Toast notification system |
| **Conform** | `^1.19.4` | Progressive enhancement form validation for React & Server Actions |

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js Server** | `16.2.9` | Runtime environment for Route Handlers and Server Actions |
| **NextAuth.js** | `^5.0.0-beta.31` | Passwordless authentication framework |
| **Nodemailer** | `^7.0.13` | SMTP transport library for magic links, invoice delivery, and receipts |
| **jsPDF** | `^4.2.1` | Programmatic PDF buffer generation engine |
| **Stripe Node SDK** | `^18.0.0` | Server-side Stripe API client for Checkout Sessions and Webhooks |
| **Zod** | `^3.23.8` | Schema validation library |

### Database & ORM
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **PostgreSQL** | Neon DB | Relational database engine |
| **Prisma ORM** | `^7.8.0` | Database Object-Relational Mapping |
| **@prisma/adapter-pg** | `^7.8.0` | Driver adapter for PostgreSQL pool connection |
| **pg** | `^8.21.0` | PostgreSQL client pool driver |

### Authentication
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **@auth/prisma-adapter** | `^2.11.2` | NextAuth database adapter for Prisma |
| **Nodemailer Provider** | NextAuth | Email magic-link authentication provider |

---

# 4 System Architecture

InvoicePilot is built as a full-stack Next.js application using App Router patterns. All data mutations are executed via Next.js Server Actions, while file downloads and webhook callbacks use dedicated HTTP Route Handlers.

```text
+------------------------------------------------------------------------------------+
|                                  CLIENT BROWSER                                    |
|  +---------------------------+  +--------------------------+  +-----------------+  |
|  | Dashboard App (/dashboard)|  | Public Portal (/pay/token)|  | Landing (/page) |  |
|  +-------------+-------------+  +------------+-------------+  +--------+--------+  |
+----------------|-----------------------------|-------------------------|-----------+
                 |                             |                         |
                 | (Server Actions / HTTPS)    | (Stripe Checkout)       |
                 v                             v                         |
+------------------------------------------------------------------------|-----------+
|                                NEXT.JS SERVER                          |           |
|  +-------------------------+  +-------------------------+              |           |
|  |  Server Actions         |  | Route Handlers          |              |           |
|  |  - createInvoice        |  | - /api/invoice/[id]     | ◄------------+           |
|  |  - editInvoice          |  | - /api/public/invoice/* |                          |
|  |  - createClientAction   |  | - /api/pay/*/checkout   |                          |
|  |  - updateCompanyProfile |  | - /api/webhooks/stripe  | ◄--- (Stripe Webhook)    |
|  +------------+------------+  +------------+------------+                          |
|               |                            |                                       |
|               v                            v                                       |
|  +------------------------------------------------------+                          |
|  |               Prisma ORM & PostgreSQL                |                          |
|  +------------------------------------------------------+                          |
+------------------------------------------------------------------------------------+
```

---

# 5 Repository Structure

```text
invoice-pilot/
├── app/
│   ├── action.ts                          # Server Actions for Invoice, Client, and Settings mutations
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth authentication endpoints
│   │   ├── email/[invoiceId]/route.ts     # Payment reminder email trigger API
│   │   ├── invoice/[invoiceId]/route.ts   # Private session-authenticated PDF API
│   │   ├── pay/[token]/checkout/route.ts  # Stripe Checkout Session initialization API
│   │   ├── public/invoice/[token]/route.ts# Tokenized public client PDF download API
│   │   └── webhooks/stripe/route.ts       # Stripe webhook listener
│   ├── components/                        # Dashboard & form feature components
│   │   ├── CreateInvoice.tsx
│   │   ├── DashboardBlocks.tsx
│   │   ├── DashboardLinks.tsx
│   │   ├── EditInvoice.tsx
│   │   ├── InvoiceActions.tsx
│   │   ├── InvoiceGraph.tsx
│   │   ├── InvoiceItemList.tsx
│   │   ├── InvoiceList.tsx
│   │   └── ModeToggle.tsx
│   ├── dashboard/                         # Dashboard page routes
│   │   ├── clients/                       # Client management module
│   │   ├── invoices/                      # Invoice management module
│   │   ├── settings/                      # Business profile & settings module
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/page.tsx                     # Authentication login page
│   ├── onboarding/page.tsx                # User onboarding page
│   ├── pay/[token]/page.tsx               # Public client landing page
│   ├── utils/                             # Utility helpers (PDF generator, auth, schemas)
│   │   ├── auth.ts
│   │   ├── emailTemplate.ts
│   │   ├── formatCurrency.ts
│   │   ├── hooks.ts
│   │   ├── pdfGenerator.ts
│   │   └── zodSchemas.ts
│   ├── verify/page.tsx                    # Magic-link verification page
│   ├── globals.css                        # Global CSS styling & design tokens
│   ├── layout.tsx                         # Root app layout
│   └── page.tsx                           # Modular landing page composition
├── components/                            # Global UI & Landing components
│   ├── landing/                           # Modular landing page component suite
│   │   ├── Comparison.tsx
│   │   ├── CTA.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductPreview.tsx
│   │   └── Workflow.tsx
│   └── ui/                                # shadcn/ui primitives
├── lib/
│   ├── db.ts                              # Prisma Client singleton initialization
│   └── utils.ts                           # Tailwind class merging utility
├── prisma/
│   ├── schema.prisma                      # Prisma database schema definition
│   └── prisma.config.ts                   # Prisma configuration
├── next.config.ts                         # Next.js configuration
├── package.json                           # Dependency definitions and scripts
└── tsconfig.json                          # TypeScript configuration
```

---

# 6 Features

### 1. Passwordless Magic-Link Authentication
- **Purpose:** Secure passwordless sign-in via email links.
- **Business Value:** Eliminates password management vulnerabilities and provides seamless onboarding.
- **Main Components:** `app/login/page.tsx`, `app/verify/page.tsx`, `app/utils/auth.ts`
- **Related APIs:** `/api/auth/[...nextauth]`
- **Dependencies:** `next-auth`, `@auth/prisma-adapter`, `nodemailer`

### 2. User Onboarding Module
- **Purpose:** Captures initial user profile data (first name, last name, address).
- **Business Value:** Pre-populates seller information on all created invoices.
- **Main Components:** `app/onboarding/page.tsx`
- **Related APIs:** Server Action `onboardingUser`
- **Dependencies:** `@conform-to/react`, `zod`

### 3. Saved Client Management Directory
- **Purpose:** Full CRUD for client profiles (name, email, phone, company, billing address, tax ID, notes).
- **Business Value:** Eliminates repetitive client data entry and provides client-level revenue metrics.
- **Main Components:** `app/dashboard/clients/page.tsx`, `app/dashboard/clients/create/page.tsx`, `app/dashboard/clients/[clientId]/page.tsx`, `app/dashboard/clients/[clientId]/edit/page.tsx`
- **Related APIs:** Server Actions (`createClientAction`, `editClientAction`, `deleteClientAction`)
- **Dependencies:** `@prisma/client`, `@conform-to/react`, `zod`

### 4. Company Branding & Business Settings
- **Purpose:** Configure business branding details (company logo URL, phone, website, tax/VAT ID, default currency, payment terms, bank transfer notes).
- **Business Value:** Customizes invoices and client portals with business branding and bank payout instructions.
- **Main Components:** `app/dashboard/settings/page.tsx`, `app/dashboard/settings/CompanySettingsForm.tsx`
- **Related APIs:** Server Action `updateCompanyProfileAction`
- **Dependencies:** `@prisma/client`, `zod`

### 5. Advanced Invoice Builder with Live Visual Preview
- **Purpose:** Create and edit invoices with saved client auto-fill, tax rate %, discount rate %, shipping fee calculations, custom invoice prefixes (`INV-101`), and real-time split-screen visual preview.
- **Business Value:** Eliminates invoice calculation errors and allows instant visual verification before sending.
- **Main Components:** `app/components/CreateInvoice.tsx`, `app/components/EditInvoice.tsx`, `app/components/InvoiceItemList.tsx`
- **Related APIs:** Server Actions (`createInvoice`, `editInvoice`)
- **Dependencies:** `@conform-to/react`, `zod`, `lucide-react`

### 6. Public Client Portal & Tokenized Sharing
- **Purpose:** Generates a public web page (`/pay/[token]`) for clients to view invoices, download PDFs, and pay online.
- **Business Value:** Offers clients a frictionless, professional payment landing page accessible without registration.
- **Main Components:** `app/pay/[token]/page.tsx`
- **Related APIs:** `/api/public/invoice/[token]`, `/api/pay/[token]/checkout`
- **Dependencies:** `@prisma/client`, `stripe`

### 7. Online Stripe Checkout Payments & Webhooks
- **Purpose:** Processes credit card payments online via Stripe Checkout Sessions and updates database status asynchronously via Webhooks.
- **Business Value:** Speeds up payment collection and automates invoice reconciliation.
- **Main Components:** `app/api/pay/[token]/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`
- **Related APIs:** `/api/pay/[token]/checkout`, `/api/webhooks/stripe`
- **Dependencies:** `stripe`, `nodemailer`

### 8. Programmatic PDF Generation Engine
- **Purpose:** Generates PDF document buffers for private dashboard downloads and public client downloads.
- **Business Value:** Delivers standardized PDF files matching business profile branding.
- **Main Components:** `app/utils/pdfGenerator.ts`
- **Related APIs:** `/api/invoice/[invoiceId]`, `/api/public/invoice/[token]`
- **Dependencies:** `jspdf`

### 9. Financial Analytics & Dashboard Overview
- **Purpose:** Displays real-time KPI metrics for Collected Revenue, Pending Receivables, Active Clients, and Total Invoices alongside revenue charts.
- **Business Value:** Provides immediate executive visibility over receivables and business cash flow.
- **Main Components:** `app/components/DashboardBlocks.tsx`, `app/components/InvoiceGraph.tsx`, `app/components/RecentInvoices.tsx`
- **Related APIs:** Direct RSC Prisma queries
- **Dependencies:** `recharts`, `@prisma/client`

---

# 7 UI Screenshots

### Home Landing Page
[INSERT_HOME_PAGE_SCREENSHOT]

### Authentication Login Page
[INSERT_LOGIN_PAGE_SCREENSHOT]

### Magic Link Verification Page
[INSERT_VERIFY_PAGE_SCREENSHOT]

### User Onboarding Page
[INSERT_ONBOARDING_PAGE_SCREENSHOT]

### Executive Dashboard Page
[INSERT_DASHBOARD_SCREENSHOT]

### Client Directory List Page
[INSERT_CLIENTS_LIST_SCREENSHOT]

### Create Client Profile Page
[INSERT_CREATE_CLIENT_SCREENSHOT]

### Client Details & History Page
[INSERT_CLIENT_DETAILS_SCREENSHOT]

### Edit Client Profile Page
[INSERT_EDIT_CLIENT_SCREENSHOT]

### Invoice List Page
[INSERT_INVOICES_LIST_SCREENSHOT]

### Create Invoice Page (Live Builder)
[INSERT_CREATE_INVOICE_SCREENSHOT]

### Edit Invoice Page
[INSERT_EDIT_INVOICE_SCREENSHOT]

### Delete Invoice Confirmation Page
[INSERT_DELETE_INVOICE_SCREENSHOT]

### Mark Invoice as Paid Page
[INSERT_MARK_PAID_INVOICE_SCREENSHOT]

### Company Settings & Branding Page
[INSERT_SETTINGS_PAGE_SCREENSHOT]

### Public Client Portal Page
[INSERT_PUBLIC_CLIENT_PORTAL_SCREENSHOT]

---

# 8 Database Design

### User Model
- **Purpose:** Represents authenticated user accounts.
- **Primary Key:** `id` (`String`, `cuid()`)
- **Fields:**
  - `firstName` (`String?`)
  - `lastName` (`String?`)
  - `address` (`String?`)
  - `email` (`String`, `@unique`)
  - `emailVerified` (`DateTime?`)
  - `image` (`String?`)
  - `createdAt` (`DateTime`, `@default(now())`)
  - `updatedAt` (`DateTime`, `@updatedAt`)
- **Relationships:** Has many `Invoice`, `Client`, and optional `CompanyProfile`.

### CompanyProfile Model
- **Purpose:** Stores user business profile, branding, default currency, and bank transfer payout notes.
- **Primary Key:** `id` (`String`, `cuid()`)
- **Foreign Key:** `userId` (`String`, `@unique`, references `User.id`, `onDelete: Cascade`)
- **Fields:**
  - `businessName` (`String?`)
  - `logoUrl` (`String?`)
  - `phone` (`String?`)
  - `website` (`String?`)
  - `taxId` (`String?`)
  - `defaultCurrency` (`String`, `@default("USD")`)
  - `paymentTerms` (`Int`, `@default(0)`)
  - `bankDetails` (`String?`)
  - `createdAt` (`DateTime`, `@default(now())`)
  - `updatedAt` (`DateTime`, `@updatedAt`)

### Client Model
- **Purpose:** Stores client contact details and billing addresses.
- **Primary Key:** `id` (`String`, `uuid()`)
- **Foreign Key:** `userId` (`String`, references `User.id`, `onDelete: Cascade`)
- **Fields:**
  - `name` (`String`)
  - `email` (`String`)
  - `phone` (`String?`)
  - `company` (`String?`)
  - `address` (`String?`)
  - `taxId` (`String?`)
  - `notes` (`String?`)
  - `createdAt` (`DateTime`, `@default(now())`)
  - `updatedAt` (`DateTime`, `@updatedAt`)
- **Relationships:** Belongs to `User`, has many `Invoice`.

### Invoice Model
- **Purpose:** Core invoice entity containing billing data, totals, calculations, and public tokens.
- **Primary Key:** `id` (`String`, `uuid()`)
- **Foreign Keys:**
  - `userId` (`String?`, references `User.id`, `onDelete: SetNull`)
  - `clientId` (`String?`, references `Client.id`, `onDelete: SetNull`)
- **Fields:**
  - `total` (`Float`, `@default(0)`)
  - `subtotal` (`Float`, `@default(0)`)
  - `taxRate` (`Float`, `@default(0)`)
  - `taxAmount` (`Float`, `@default(0)`)
  - `discountRate` (`Float`, `@default(0)`)
  - `discountAmount` (`Float`, `@default(0)`)
  - `shippingAmount` (`Float`, `@default(0)`)
  - `amountPaid` (`Float`, `@default(0)`)
  - `balance` (`Float`, `@default(0)`)
  - `status` (`InvoiceStatus`, `@default(PENDING)`)
  - `date` (`DateTime`)
  - `dueDate` (`String`)
  - `fromName` (`String`)
  - `fromEmail` (`String`)
  - `fromAddress` (`String`)
  - `clientName` (`String`)
  - `clientEmail` (`String`)
  - `clientAddress` (`String`)
  - `currency` (`String`)
  - `invoiceName` (`String`)
  - `invoiceNumber` (`Int`)
  - `invoicePrefix` (`String`, `@default("INV")`)
  - `note` (`String?`)
  - `publicToken` (`String?`, `@unique`, `@default(uuid())`)
  - `stripePaymentIntentId` (`String?`)
  - `createdAt` (`DateTime`, `@default(now())`)
  - `updatedAt` (`DateTime`, `@updatedAt`)
- **Relationships:** Belongs to `User` and `Client`, has many `InvoiceItem` and `InvoiceActivity`.

### InvoiceItem Model
- **Purpose:** Stores individual line items belonging to an invoice.
- **Primary Key:** `id` (`String`, `uuid()`)
- **Foreign Key:** `invoiceId` (`String`, references `Invoice.id`, `onDelete: Cascade`)
- **Fields:**
  - `description` (`String`)
  - `quantity` (`Float`, `@default(1)`)
  - `rate` (`Float`, `@default(0)`)
  - `amount` (`Float`, `@default(0)`)

### InvoiceActivity Model
- **Purpose:** Audit trail log tracking invoice events.
- **Primary Key:** `id` (`String`, `uuid()`)
- **Foreign Key:** `invoiceId` (`String`, references `Invoice.id`, `onDelete: Cascade`)
- **Fields:**
  - `type` (`String`) - `CREATED`, `UPDATED`, `SENT`, `VIEWED`, `PAID`
  - `description` (`String`)
  - `createdAt` (`DateTime`, `@default(now())`)

---

# 9 Entity Relationship Diagram

```text
+-------------------+       1        1       +-----------------------+
| User              |------------------------| CompanyProfile        |
+-------------------+                        +-----------------------+
| id (PK)           |                        | id (PK)               |
| email (UQ)        |                        | userId (FK, UQ)       |
+-------------------+                        | defaultCurrency       |
  |             |                            +-----------------------+
  | 1           | 1
  |             |
  | N           | N
  v             v
+-------------+ +--------------------+
| Client      | | Invoice            |
+-------------+ +--------------------+
| id (PK)     | | id (PK)            |
| userId (FK) | | userId (FK)        |
| name        | | clientId (FK)      |
| email       | | publicToken (UQ)   |
+-------------+ | total, status      |
                +--------------------+
                  |               |
                  | 1             | 1
                  |               |
                  | N             | N
                  v               v
                +---------------+ +-----------------------+
                | InvoiceItem   | | InvoiceActivity       |
                +---------------+ +-----------------------+
                | id (PK)       | | id (PK)               |
                | invoiceId(FK) | | invoiceId (FK)        |
                | description   | | type, description     |
                +---------------+ +-----------------------+
```

---

# 10 Security

### Implemented Security Mechanisms
- **Authentication:** Passwordless email magic-link authentication powered by NextAuth v5.
- **Protected Routes:** Dashboard layouts enforce user session authentication using `requireUser()` server helper.
- **API Access Controls:** Route Handler `/api/invoice/[invoiceId]` verifies that the active session matches `invoice.userId`.
- **Public Token Access:** Public client portals (`/pay/[token]`) and public PDF downloads (`/api/public/invoice/[token]`) rely on cryptographically random UUID tokens (`publicToken`), preventing unauthorized UUID enumeration.
- **Input Validation:** Zod schema validation enforces strict constraints on Server Actions and form submissions.
- **Stripe Webhook Signature Verification:** Webhook endpoints verify signatures via `stripe.webhooks.constructEvent()` using `STRIPE_WEBHOOK_SECRET`.

### Missing / Deferred Security Mechanisms
- Rate limiting middleware (e.g. Upstash Redis rate limiter) is not currently implemented on public endpoints.

---

# 11 Authentication

### Authentication Flow
InvoicePilot uses NextAuth v5 with a Nodemailer magic-link provider backed by PrismaAdapter.

```text
+--------+            +-------------------+            +--------------------+            +--------------+
| User   |            | Login Page        |            | NextAuth Server    |            | SMTP Mailer  |
+---+----+            +---------+---------+            +---------+----------+            +------+-------+
    |                           |                                |                              |
    | Submit Email              |                                |                              |
    +-------------------------->|                                |                              |
    |                           | POST signin("nodemailer")      |                              |
    |                           +------------------------------->|                              |
    |                           |                                | Create VerificationToken     |
    |                           |                                | Send Email Magic Link        |
    |                           |                                +----------------------------->|
    |                           |                                |                              |
    | Click Link in Email       |                                |                              |
    +----------------------------------------------------------->|                              |
    |                           |                                | Validate Token               |
    |                           |                                | Create Session Cookie        |
    | Redirect to /dashboard    |<-------------------------------+                              |
    |<--------------------------+                                |                              |
```

---

# 12 API Documentation

### Endpoint Summary Table
| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/auth/[...nextauth]` | No | NextAuth authentication handler |
| `POST` | `/api/email/[invoiceId]` | Session | Sends invoice reminder email to client |
| `GET` | `/api/invoice/[invoiceId]` | Session | Generates and streams PDF for authenticated user |
| `GET` | `/api/public/invoice/[token]` | Token | Streams PDF for public client download via public token |
| `POST` | `/api/pay/[token]/checkout` | Token | Creates a Stripe Checkout Session for public client payment |
| `POST` | `/api/webhooks/stripe` | Signature | Processes Stripe `checkout.session.completed` events |

### Endpoint Details

#### 1. Private Invoice PDF Download
- **Endpoint:** `GET /api/invoice/[invoiceId]`
- **Authentication:** Required (Active NextAuth session matching `invoice.userId`)
- **Response:** `200 OK` (`application/pdf` binary stream)

#### 2. Public Invoice PDF Download
- **Endpoint:** `GET /api/public/invoice/[token]`
- **Authentication:** Public (Validated via `publicToken` UUID)
- **Response:** `200 OK` (`application/pdf` binary stream)

#### 3. Stripe Checkout Initialization
- **Endpoint:** `POST /api/pay/[token]/checkout`
- **Authentication:** Public (Validated via `publicToken` UUID)
- **Response:** `303 See Other` (Redirect to Stripe Hosted Checkout URL)

#### 4. Stripe Webhook Listener
- **Endpoint:** `POST /api/webhooks/stripe`
- **Authentication:** Signature Verified (`stripe-signature` header)
- **Response:** `200 OK` (`{ received: true }`)

---

# 13 Third-party Services

- **NextAuth v5 (Auth.js):** Session management and passwordless email authentication.
- **Stripe API:** Credit card payment processing via Hosted Checkout Sessions and Webhooks.
- **Nodemailer / Mailtrap:** SMTP transport for delivery of magic links, invoice notifications, reminders, and payment receipts.
- **Neon DB:** Managed serverless PostgreSQL database provider.

---

# 14 Environment Variables

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Cryptographic secret for signing session tokens |
| `EMAIL_SERVER_HOST` | Yes | SMTP server hostname |
| `EMAIL_SERVER_PORT` | Yes | SMTP server port |
| `EMAIL_SERVER_USER` | Yes | SMTP authentication user |
| `EMAIL_SERVER_PASSWORD` | Yes | SMTP authentication password |
| `EMAIL_FROM` | Yes | Default sender email address |
| `MAILTRAP_TOKEN` | Yes | Mailtrap API token |
| `NEXT_PUBLIC_BASE_URL` | Yes | Public application domain |
| `NEXTAUTH_URL` | Yes | NextAuth canonical base URL |
| `STRIPE_SECRET_KEY` | Optional | Stripe Secret API Key for online payments |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe Webhook Signing Secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Stripe Publishable API Key |

---

# 15 Major Dependencies

- **`next` (`16.2.9`):** Core framework providing App Router, RSC, and server optimization.
- **`@prisma/client` (`7.8.0`):** Type-safe ORM for database interaction.
- **`stripe` (`^18.0.0`):** Official Node.js library for Stripe payment operations.
- **`nodemailer` (`^7.0.13`):** SMTP transport engine.
- **`jspdf` (`^4.2.1`):** Programmatic PDF generation engine.
- **`zod` (`^3.23.8`):** Schema parsing and data validation.
- **`@conform-to/react` (`^1.19.4`):** Form state management for Server Actions.

---

# 16 Installation Guide

### Prerequisites
- Node.js `^20.0.0` or higher
- npm `^10.0.0`
- PostgreSQL database instance (Neon DB recommended)

### Step-by-Step Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/user/invoice-pilot.git
   cd invoice-pilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
   AUTH_SECRET="your-random-secret"
   EMAIL_SERVER_HOST="smtp.mailtrap.io"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-smtp-user"
   EMAIL_SERVER_PASSWORD="your-smtp-password"
   EMAIL_FROM="hello@example.com"
   NEXTAUTH_URL="http://localhost:3000"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

4. **Sync Database Schema:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

# 17 Deployment

### Deployment Architecture
- **Frontend & Server Actions:** Deployed on Vercel / Node.js container host.
- **Database:** Hosted serverless PostgreSQL (Neon DB).
- **Stripe Webhooks:** Configured pointing to `https://your-domain.com/api/webhooks/stripe`.

### Production Build Command
```bash
npm run build
npm run start
```

---

# 18 Request Lifecycle

```text
User / Client
      |
      v
Next.js App Router (app/page.tsx or app/dashboard/*)
      |
      +---> Server Component (RSC Direct Prisma Query)
      |
      +---> Server Action (app/action.ts)
      |         |
      |         v
      |     Zod Validation & Auth Check (requireUser)
      |         |
      |         v
      |     Prisma Transaction (PostgreSQL)
      |         |
      |         v
      |     Email Dispatch (Nodemailer)
      |
      v
HTTP Response / UI Revalidation
```

---

# 19 Performance

### Implemented Optimizations
- React Server Components (RSC) fetch data on the server, eliminating client waterfall requests.
- Selective Prisma `select` queries fetch only required fields.
- Server-side pagination limits invoice queries to 10 items per page.

### Potential Bottlenecks
- Synchronous PDF buffer generation during GET requests for complex invoices.

### Scalability Considerations
- Email sending can be offloaded to a background queue (e.g. Inngest / BullMQ) to reduce action execution latency.

---

# 20 Security Review

### Current Strengths
- Passwordless magic link authentication eliminates credential theft.
- User session isolation enforced on dashboard pages and server actions.
- Cryptographic public tokens (`publicToken`) protect public invoice access.
- Stripe signature verification prevents spoofed webhook payloads.

### Recommended Improvements
- Implement rate limiting middleware on `/api/pay/[token]/checkout` and authentication endpoints.

---

# 21 Challenges & Engineering Decisions

- **App Router & Server Actions:** Selected Server Actions to handle forms natively with progressive enhancement via `@conform-to/react`.
- **Tokenized Public Access:** Implemented dual PDF routes (`/api/invoice/[invoiceId]` for session users vs `/api/public/invoice/[token]` for clients) to balance data privacy with frictionless sharing.

---

# 22 Future Improvements

- Automated recurring invoice generation (CRON schedules).
- CSV/Excel accounting export for QuickBooks/Xero.
- Multi-currency automatic exchange rate conversion.

---

# 23 Developer Notes

- **Database Inspection:** Run `npx prisma studio` to inspect records visually at `http://localhost:5555`.
- **Code Consistency:** All server actions enforce authentication via `requireUser()` in `app/utils/hooks.ts`.

---
Written by Yash Lagare
