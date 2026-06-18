"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
    text: string
    variant?: "link" | "default" | "outline" | "secondary" | "ghost" | "destructive" | null | undefined
}

const SubmitButton = ({ variant, text }: iAppProps) => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-full" variant={variant}>
                    <Loader2 className="size-4 mr-2 animate-spin" />Loading...
                </Button>
            ) : (
                <Button type="submit" className="w-full" variant={variant}>{text}</Button>
            )}
        </>
    )
}

export default SubmitButton