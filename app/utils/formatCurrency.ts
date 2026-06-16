interface IFormatCurrencyOptions {
    amount: number;
    currency: "INR" | "USD" | "EUR" | "GBP" | "CAD";
}

export function formatCurrency({amount, currency}: IFormatCurrencyOptions) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
    }).format(amount);
}
