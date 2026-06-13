import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "../utils/auth"

const LoginPage = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Enter your email below to login in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData)
              }}
              className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input 
                  name="email"
                  required
                  type="email"
                  placeholder="hello@gmail.com" />
              </div>
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default LoginPage