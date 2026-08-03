import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret || !signature) {
        return NextResponse.json({ message: "Stripe configuration missing" }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2025-02-24.acacia" as any,
    });

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Signature verification failed:`, err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const invoiceId = session.metadata?.invoiceId;

        if (invoiceId) {
            const invoice = await prisma.invoice.update({
                where: { id: invoiceId },
                data: {
                    status: "PAID",
                    amountPaid: session.amount_total ? session.amount_total / 100 : 0,
                    balance: 0,
                    stripePaymentIntentId: session.payment_intent as string,
                    activities: {
                        create: {
                            type: "PAID",
                            description: `Invoice paid online via Stripe (Ref: ${session.payment_intent || session.id})`,
                        },
                    },
                },
            });

            // Send receipt notification email
            try {
                await emailClient.sendMail({
                    from: process.env.EMAIL_FROM || "InvoicePilot <hello@demomailtrap.com>",
                    to: invoice.clientEmail,
                    subject: `Payment Receipt for Invoice ${invoice.invoicePrefix}-${invoice.invoiceNumber}`,
                    html: `<div style="font-family: sans-serif; padding: 20px;">
                        <h2>Payment Received</h2>
                        <p>Hi ${invoice.clientName},</p>
                        <p>We have successfully received your payment of <strong>${invoice.currency} ${invoice.total}</strong> for invoice <strong>${invoice.invoicePrefix}-${invoice.invoiceNumber}</strong>.</p>
                        <p>Thank you for your business!</p>
                    </div>`,
                });
            } catch (emailErr) {
                console.error("Failed to send payment receipt email:", emailErr);
            }
        }
    }

    return NextResponse.json({ received: true });
}
