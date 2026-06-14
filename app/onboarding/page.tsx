import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SubmitButton from "../components/SubmitButton"

const Onboarding = () => {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost there!</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>First Name</Label>
                                <Input placeholder="Enter your first name" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input placeholder="Enter your address" />
                        </div>

                        <SubmitButton text="Finish onboarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Onboarding
