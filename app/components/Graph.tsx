"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface GraphProps {
    data: {
        date: string;
        amount: number;
    }[];
}

const Graph = ({ data }: GraphProps) => {
    return (
        <ChartContainer config={{
            amount: {
                label: 'Amount',
                color: "var(--primary)",
            },
        }}
            className="min-h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </ChartContainer>
    )
}

export default Graph