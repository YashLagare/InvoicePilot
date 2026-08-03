# InvoicePilot Modernization & Scalability Roadmap (plan.md)

## Executive Summary
InvoicePilot is currently a functional full-stack invoicing prototype supporting basic invoice CRUD, Nodemailer magic-link authentication, and simple PDF generation. To elevate InvoicePilot into an advanced, enterprise-grade, scalable SaaS platform, we need to address architectural limitations, expand data models, enhance security, implement online payments, build a live invoice preview builder, and provide advanced financial analytics.

---

## Technical Audit & Key Improvement Areas

1. **Data Model Limitations (Current State vs Target State)**
   - *Current:* Client details (`clientName`, `clientEmail`, `clientAddress`) are stored as raw text strings inside every single invoice record.
   - *Target:* Dedicated `Client` model with contact info, tax ID, payment terms, and relationship to invoices.
   - *Current:* User profile only stores name and address.
   - *Target:* `CompanyProfile` model with business logo, phone, tax ID (GST/VAT), currency preferences, bank payout info, and customizable invoice templates.
   - *Current:* Invoice status only supports `PENDING` and `PAID`. Total is a plain integer sum without tax/discounts.
   - *Target:* Statuses (`DRAFT`, `PENDING`, `SENT`, `PAID`, `OVERDUE`, `CANCELLED`). Support subtotal, tax %, discount %, shipping, amount paid, and custom invoice numbering (e.g. `INV-2026-0001`).

2. **Security & API Vulnerabilities**
   - *Current:* `/api/invoice/[invoiceId]` serves invoice PDFs without checking user ownership or session credentials. Anyone guessing a UUID can view invoice details.
   - *Target:* Implement role/session check for dashboard access, and tokenized authorization (`publicToken`) for client access.

3. **User Experience & Live Invoice Builder**
   - *Current:* Static multi-field forms without live visual preview.
   - *Target:* Dynamic split-screen live preview showing real-time formatted invoice layout as items, taxes, and notes are typed.

4. **Client Portal & Payments**
   - *Current:* No client view or online payment capability.
   - *Target:* Public invoice view page (`/pay/[token]`) with Stripe Checkout integration for automated payment collection and instant webhooks.

5. **Analytics & Financial Intelligence**
   - *Current:* Basic 30-day paid revenue line chart.
   - *Target:* Comprehensive executive dashboard: Overdue alerts, revenue forecasting, top client metrics, payment speed metrics, and CSV/Excel accounting export.

---

## Step-by-Step Implementation Plan

### Step 1: Database Architecture & Data Modeling Refactor
- Update `prisma/schema.prisma`:
  - `Client` model (Name, Email, Phone, Company, Address, TaxID, User relation).
  - `CompanyProfile` / Enhanced `User` model (Logo, Business Name, Tax ID, Currency, Payment Terms, Bank Details).
  - `Invoice` model enhancements (`status` enum with `DRAFT`, `PENDING`, `SENT`, `PAID`, `OVERDUE`, `CANCELLED`), `subtotal`, `taxRate`, `taxAmount`, `discountRate`, `discountAmount`, `shippingAmount`, `amountPaid`, `balance`, `publicToken`, `invoicePrefix`.
  - `InvoiceActivity` model for audit trails (Created, Sent, Viewed, Reminded, Paid).
- Run Prisma migrations (`npx prisma migrate dev` / `npx prisma generate`).

### Step 2: Client Management & Business Settings Modules
- Build Client CRUD interface (`/dashboard/clients`): Client listing, modal/page for creating & editing clients, client invoice history view.
- Build Settings interface (`/dashboard/settings`): Business profile management, tax settings, logo upload, payment settings.

### Step 3: Advanced Live Invoice Builder & Calculation Engine
- Update `CreateInvoice.tsx` & `EditInvoice.tsx`:
  - Client selector with auto-fill from existing clients.
  - Automatic invoice number generation (e.g., `INV-2026-0001`).
  - Interactive tax rate %, discount %, line item calculations (Subtotal, Tax, Total).
  - Real-time side-by-side PDF / Invoice preview pane.
- Update server actions (`app/action.ts`) & Zod schemas (`app/utils/zodSchemas.ts`).

### Step 4: Security Hardening & PDF Engine Overhaul
- Secure `/api/invoice/[invoiceId]` route with auth/session validation.
- Upgrade PDF generation (`jspdf` layout redesign / styled PDF layout featuring company logo, clean tables, tax breakdown, notes, and payment instructions).
- Add secure tokenized public endpoint `/api/public/invoice/[token]` for client downloads.

### Step 5: Public Client Portal & Stripe Payment Integration
- Create public client invoice landing page (`/pay/[token]`):
  - Clean client UI (View Invoice, Download PDF, Pay Now button).
  - Stripe Checkout Session integration for online payment.
- Implement Stripe Webhook handler (`/api/webhooks/stripe`):
  - Handle `checkout.session.completed`.
  - Auto-update invoice status to `PAID`, set payment date & transaction reference, send receipt email.

### Step 6: Automated Email System & Reminder Workflow
- Non-blocking email sending background handling.
- Rich HTML email templates (Invoice Notification, Payment Reminder, Payment Receipt).
- Automated Overdue detection & scheduled reminder email API endpoint.

### Step 7: Financial Analytics & CSV/PDF Accounting Export
- Upgrade Dashboard (`/dashboard/page.tsx`):
  - Metric cards: Total Revenue, Outstanding Receivables, Overdue Invoices, Paid Invoices count.
  - Chart overhaul: Revenue vs Overdue timeline chart, client revenue distribution.
- Export capabilities: Bulk download invoices, CSV/Excel financial export for accounting.

---

## Verification & Testing Plan

1. **Database Schema Verification**: Validate migrations, seed data, client-invoice relationships.
2. **Security Verification**: Test unauthorized API access to invoice routes to confirm data privacy.
3. **Form & Live Preview Verification**: Test creating, updating invoices with tax/discounts and verify calculation accuracy.
4. **PDF & Email Verification**: Inspect generated PDF output and test email template generation.
5. **Payment Workflow Verification**: Test Stripe Checkout integration in test mode and verify webhook execution.
6. **Analytics Verification**: Verify dashboard KPI cards and charts accurately reflect database aggregations.
