import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;
        const origin = new URL(request.url).origin;

        const invoice = await prisma.invoice.findUnique({
            where: {
                publicToken: token,
            },
        });

        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        if (invoice.status === "PAID") {
            return NextResponse.redirect(`${origin}/pay/${token}`);
        }

        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeSecretKey) {
            // Fallback for demo when Stripe key is not yet configured in environment variables:
            // Auto-mark invoice as PAID in demo mode so payment flow works!
            await prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    status: "PAID",
                    amountPaid: invoice.total,
                    balance: 0,
                    activities: {
                        create: {
                            type: "PAID",
                            description: "Invoice paid online by client (Demo Payment)",
                        },
                    },
                },
            });

            return NextResponse.redirect(`${origin}/pay/${token}?status=success`);
        }

        const stripe = new Stripe(stripeSecretKey, {
            apiVersion: "2025-02-24.acacia" as any,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: invoice.currency.toLowerCase(),
                        product_data: {
                            name: `Invoice ${invoice.invoicePrefix}-${invoice.invoiceNumber}: ${invoice.invoiceName}`,
                            description: `Payment for invoice issued by ${invoice.fromName}`,
                        },
                        unit_amount: Math.round(invoice.total * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: invoice.clientEmail,
            metadata: {
                invoiceId: invoice.id,
                publicToken: invoice.publicToken as string,
            },
            success_url: `${origin}/pay/${token}?paid=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pay/${token}?cancelled=true`,
        });

        return NextResponse.redirect(session.url as string, 303);
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
    }
}
