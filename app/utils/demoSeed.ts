import prisma from "@/lib/db";

export async function seedDemoUser() {
  const DEMO_EMAIL = "demo@invoicepilot.app";

  // Check if demo user already exists
  let demoUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!demoUser) {
    // Create Demo User
    demoUser = await prisma.user.create({
      data: {
        email: DEMO_EMAIL,
        firstName: "Demo",
        lastName: "User",
        address: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
      },
    });

    // Create Company Profile for Demo User
    await prisma.companyProfile.create({
      data: {
        userId: demoUser.id,
        businessName: "InvoicePilot Studio",
        logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        phone: "+1 (555) 234-5678",
        website: "invoicepilot.app",
        taxId: "US987654321",
        defaultCurrency: "USD",
        paymentTerms: 15,
        bankDetails: "Bank of America | Account: **** 8829 | Routing: 121000358",
      },
    });

    // Create Sample Clients
    const client1 = await prisma.client.create({
      data: {
        userId: demoUser.id,
        name: "Acme Corporation",
        email: "billing@acmecorp.com",
        phone: "+1 (555) 010-9988",
        company: "Acme Corp",
        address: "100 Tech Blvd, Austin, TX 78701",
        taxId: "TX-11223344",
        notes: "Enterprise client with Net 15 payment terms.",
      },
    });

    const client2 = await prisma.client.create({
      data: {
        userId: demoUser.id,
        name: "Globex Logistics",
        email: "ap@globex.com",
        phone: "+1 (555) 020-4455",
        company: "Globex Corp",
        address: "450 Enterprise Way, Chicago, IL 60601",
        taxId: "IL-99887766",
        notes: "Shipping & logistics partner.",
      },
    });

    const client3 = await prisma.client.create({
      data: {
        userId: demoUser.id,
        name: "Stark Technologies",
        email: "invoices@starktech.io",
        phone: "+1 (555) 030-1122",
        company: "Stark Tech",
        address: "700 Innovation Park, San Jose, CA 95110",
        taxId: "CA-44556677",
        notes: "Retainer client for web services.",
      },
    });

    // Invoice 1: PAID ($4,250.00)
    const inv1 = await prisma.invoice.create({
      data: {
        userId: demoUser.id,
        clientId: client1.id,
        fromName: "InvoicePilot Studio",
        fromEmail: "demo@invoicepilot.app",
        fromAddress: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
        clientName: client1.name,
        clientEmail: client1.email,
        clientAddress: client1.address || "",
        invoiceName: "Web Application Development",
        invoiceNumber: 101,
        invoicePrefix: "INV",
        currency: "USD",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        dueDate: "15",
        subtotal: 4000,
        taxRate: 10,
        taxAmount: 400,
        discountRate: 3.75,
        discountAmount: 150,
        shippingAmount: 0,
        total: 4250,
        amountPaid: 4250,
        balance: 0,
        status: "PAID",
        note: "Thank you for partnering with InvoicePilot Studio!",
      },
    });

    await prisma.invoiceItem.createMany({
      data: [
        {
          invoiceId: inv1.id,
          description: "Full-Stack Web Application Architecture",
          quantity: 1,
          rate: 2500,
          amount: 2500,
        },
        {
          invoiceId: inv1.id,
          description: "Stripe Online Payment Gateway Integration",
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
      ],
    });

    await prisma.invoiceActivity.createMany({
      data: [
        { invoiceId: inv1.id, type: "CREATED", description: "Invoice INV-101 created" },
        { invoiceId: inv1.id, type: "SENT", description: "Sent invoice to billing@acmecorp.com" },
        { invoiceId: inv1.id, type: "PAID", description: "Paid $4,250.00 via Stripe Checkout" },
      ],
    });

    // Invoice 2: PENDING ($2,800.00)
    const inv2 = await prisma.invoice.create({
      data: {
        userId: demoUser.id,
        clientId: client2.id,
        fromName: "InvoicePilot Studio",
        fromEmail: "demo@invoicepilot.app",
        fromAddress: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
        clientName: client2.name,
        clientEmail: client2.email,
        clientAddress: client2.address || "",
        invoiceName: "Logistics Dashboard Overhaul",
        invoiceNumber: 102,
        invoicePrefix: "INV",
        currency: "USD",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        dueDate: "15",
        subtotal: 2800,
        taxRate: 0,
        taxAmount: 0,
        discountRate: 0,
        discountAmount: 0,
        shippingAmount: 0,
        total: 2800,
        amountPaid: 0,
        balance: 2800,
        status: "PENDING",
        note: "Payment due within 15 days of invoice date.",
      },
    });

    await prisma.invoiceItem.createMany({
      data: [
        {
          invoiceId: inv2.id,
          description: "Real-time Shipment Tracking API Setup",
          quantity: 1,
          rate: 1800,
          amount: 1800,
        },
        {
          invoiceId: inv2.id,
          description: "PostgreSQL Database Performance Optimization",
          quantity: 1,
          rate: 1000,
          amount: 1000,
        },
      ],
    });

    await prisma.invoiceActivity.createMany({
      data: [
        { invoiceId: inv2.id, type: "CREATED", description: "Invoice INV-102 created" },
        { invoiceId: inv2.id, type: "SENT", description: "Sent invoice to ap@globex.com" },
      ],
    });

    // Invoice 3: PAID ($1,950.00)
    const inv3 = await prisma.invoice.create({
      data: {
        userId: demoUser.id,
        clientId: client3.id,
        fromName: "InvoicePilot Studio",
        fromEmail: "demo@invoicepilot.app",
        fromAddress: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
        clientName: client3.name,
        clientEmail: client3.email,
        clientAddress: client3.address || "",
        invoiceName: "Security Audit & Refactoring",
        invoiceNumber: 103,
        invoicePrefix: "INV",
        currency: "USD",
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        dueDate: "15",
        subtotal: 1950,
        taxRate: 0,
        taxAmount: 0,
        discountRate: 0,
        discountAmount: 0,
        shippingAmount: 0,
        total: 1950,
        amountPaid: 1950,
        balance: 0,
        status: "PAID",
        note: "Monthly retainer billing for Security Maintenance.",
      },
    });

    await prisma.invoiceItem.create({
      data: {
        invoiceId: inv3.id,
        description: "Monthly Security Retainer & Penetration Testing",
        quantity: 1,
        rate: 1950,
        amount: 1950,
      },
    });

    await prisma.invoiceActivity.createMany({
      data: [
        { invoiceId: inv3.id, type: "CREATED", description: "Invoice INV-103 created" },
        { invoiceId: inv3.id, type: "PAID", description: "Paid $1,950.00 via Bank Payout" },
      ],
    });
  }

  return demoUser;
}
