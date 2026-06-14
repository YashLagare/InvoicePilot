"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
    text: string
}

const SubmitButton = ({ text }: iAppProps) => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-full">
                    <Loader2 className="size-4 mr-2 animate-spin" />Loading...
                </Button>
            ) : (
                <Button type="submit" className="w-full">{text}</Button>
            )}
        </>
    )
}

export default SubmitButton