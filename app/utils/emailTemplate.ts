export function generateEmailTemplate(data: {
    clientName: string;
    invoiceNumber: string;
    fromName: string;
    currency: string;
    total: string;
    dueDate: string;
    invoiceLink: string;
}) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Invoice from InvoicePilot</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #09090b;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <tr>
                            <td align="center" style="background-color: #18181b; padding: 30px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">InvoicePilot</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 40px 20px 40px;">
                                <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #09090b;">New Invoice Received</h2>
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #71717a;">
                                    Hi ${data.clientName},<br><br>
                                    I hope you're doing well. A new invoice <strong>#${data.invoiceNumber}</strong> has been generated for you by <strong>${data.fromName}</strong>.
                                </p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                                    <tr>
                                        <td style="padding-bottom: 12px; font-size: 14px; color: #71717a;">Total Amount</td>
                                        <td align="right" style="padding-bottom: 12px; font-size: 16px; font-weight: 500; color: #09090b;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 14px; color: #71717a;">Amount Due</td>
                                        <td align="right" style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 24px; font-weight: 600; color: #2563eb;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; color: #71717a;">Due Date</td>
                                        <td align="right" style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; font-weight: 500; color: #09090b;">${data.dueDate}</td>
                                    </tr>
                                </table>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center">
                                            <a href="${data.invoiceLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 6px;">
                                                Download Invoice
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center;">
                                <p style="margin: 0; font-size: 13px; color: #a1a1aa;">
                                    If you have any questions, simply reply to this email to reach out to ${data.fromName}.<br><br>
                                    Powered by <a href="https://portfolio-five-opal-53.vercel.app/" style="color: #2563eb; text-decoration: none;">InvoicePilot</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

export function generateInvoiceUpdatedEmailTemplate(data: {
    clientName: string;
    invoiceNumber: string;
    fromName: string;
    currency: string;
    total: string;
    dueDate: string;
    invoiceLink: string;
}) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice Updated - InvoicePilot</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #09090b;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <tr>
                            <td align="center" style="background-color: #18181b; padding: 30px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">InvoicePilot</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 40px 20px 40px;">
                                <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #09090b;">Invoice Updated</h2>
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #71717a;">
                                    Hi ${data.clientName},<br><br>
                                    I hope you're doing well. Your invoice <strong>#${data.invoiceNumber}</strong> from <strong>${data.fromName}</strong> has been updated.
                                </p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                                    <tr>
                                        <td style="padding-bottom: 12px; font-size: 14px; color: #71717a;">Total Amount</td>
                                        <td align="right" style="padding-bottom: 12px; font-size: 16px; font-weight: 500; color: #09090b;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 14px; color: #71717a;">Amount Due</td>
                                        <td align="right" style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 24px; font-weight: 600; color: #2563eb;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; color: #71717a;">Due Date</td>
                                        <td align="right" style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; font-weight: 500; color: #09090b;">${data.dueDate}</td>
                                    </tr>
                                </table>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center">
                                            <a href="${data.invoiceLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 6px;">
                                                Download Invoice
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center;">
                                <p style="margin: 0; font-size: 13px; color: #a1a1aa;">
                                    If you have any questions, simply reply to this email to reach out to ${data.fromName}.<br><br>
                                    Powered by <a href="https://portfolio-five-opal-53.vercel.app/" style="color: #2563eb; text-decoration: none;">InvoicePilot</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}


export function generateInvoiceReminderEmailTemplate(data: {
    clientName: string;
    invoiceNumber: string;
    fromName: string;
    currency: string;
    total: string;
    dueDate: string;
    invoiceLink: string;
}) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice Reminder - InvoicePilot</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #09090b;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        <tr>
                            <td align="center" style="background-color: #18181b; padding: 30px 20px;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">InvoicePilot</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 40px 40px 20px 40px;">
                                <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #09090b;">Payment Reminder</h2>
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #71717a;">
                                    Hi ${data.clientName},<br><br>
                                    I hope you're doing well. This is a friendly reminder that your invoice <strong>#${data.invoiceNumber}</strong> from <strong>${data.fromName}</strong> is due.
                                </p>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                                    <tr>
                                        <td style="padding-bottom: 12px; font-size: 14px; color: #71717a;">Total Amount</td>
                                        <td align="right" style="padding-bottom: 12px; font-size: 16px; font-weight: 500; color: #09090b;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 14px; color: #71717a;">Amount Due</td>
                                        <td align="right" style="padding-top: 12px; border-top: 1px solid #e4e4e7; padding-bottom: 12px; font-size: 24px; font-weight: 600; color: #2563eb;">${data.total}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; color: #71717a;">Due Date</td>
                                        <td align="right" style="padding-top: 8px; border-top: 1px solid #e4e4e7; font-size: 14px; font-weight: 500; color: #09090b;">${data.dueDate}</td>
                                    </tr>
                                </table>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center">
                                            <a href="${data.invoiceLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 28px; border-radius: 6px;">
                                                Download Invoice
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e4e4e7; text-align: center;">
                                <p style="margin: 0; font-size: 13px; color: #a1a1aa;">
                                    If you have any questions, simply reply to this email to reach out to ${data.fromName}.<br><br>
                                    Powered by <a href="https://portfolio-five-opal-53.vercel.app/" style="color: #2563eb; text-decoration: none;">InvoicePilot</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

