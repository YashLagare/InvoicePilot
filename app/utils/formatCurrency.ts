interface IFormatCurrencyOptions {
    amount: number;
    currency: string;
}

export function formatCurrency({amount, currency}: IFormatCurrencyOptions) {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
        }).format(amount);
    } catch {
        return `${currency || "$"} ${amount.toFixed(2)}`;
    }
}

