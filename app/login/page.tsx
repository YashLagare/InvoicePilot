// import { buttonVariants } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import { redirect } from "next/navigation"
// import SubmitButton from "../components/SubmitButton"
// import { auth, signIn } from "../utils/auth"

// const LoginPage = async () => {
//   const session = await auth();

//   if(session?.user){
//     redirect("/dashboard")
//   }

//   return (
//     <>
//       <div className="flex h-screen w-full items-center justify-center px-4">
//         <Card className="w-full max-w-sm">
//           <CardHeader>
//             <CardTitle className="text-2xl">Login</CardTitle>
//             <CardDescription className="text-sm text-muted-foreground">Enter your email below to login in to your account</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form
//               action={async (formData) => {
//                 "use server";
//                 await signIn("nodemailer", formData)
//               }}
//               className="flex flex-col gap-y-4">
//               <div className="flex flex-col gap-y-2">
//                 <Label>Email</Label>
//                 <Input 
//                   name="email"
//                   required
//                   type="email"
//                   placeholder="hello@gmail.com" />
//               </div>
//               <SubmitButton text="Login"/>
//             </form>
//           </CardContent>
//           <CardFooter>
//             <Link href="/" className={buttonVariants({
//               className: "w-full",
//               variant: "outline",
//             })}>
//               <ArrowLeft className="size-4 mr-2" />Back to Homepage
//             </Link>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   )
// }

// export default LoginPage


import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileText, Lock, Mail, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { DemoNotice } from "../components/DemoNotice"
import { ModeToggle } from "../components/ModeToggle"
import SubmitButton from "../components/SubmitButton"
import { auth, signIn } from "../utils/auth"

async function handleCredentialsLogin(formData: FormData) {
  "use server"

  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    redirect("/login?error=missing-credentials")
  }

  const result = await signIn("credentials", { email, password, redirect: false })

  if (result?.error) {
    redirect("/login?error=invalid-credentials")
  }

  redirect("/dashboard")
}

async function handleMagicLinkLogin(formData: FormData) {
  "use server"

  const email = formData.get("email")?.toString().trim()

  if (!email) {
    redirect("/login?error=missing-email")
  }

  await signIn("nodemailer", { email, redirect: false })
  redirect("/verify")
}

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-8">

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl">

        {/* ── Left: Brand Panel ── */}
        <div className="relative bg-blue-700 dark:bg-blue-900 p-8 sm:p-10 flex flex-col justify-between overflow-hidden">

          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-base leading-none">InvoicePilot</p>
              <p className="text-blue-200 text-xs mt-0.5">Seamless invoicing</p>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 mt-10 flex-1">
            <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-snug tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              Sign in to manage your invoices, clients, and payments — all in one place.
            </p>

            <ul className="space-y-5">
              {[
                { icon: Zap, title: "Instant magic link", desc: "No password needed — check your email" },
                { icon: ShieldCheck, title: "Secure by default", desc: "Every session is encrypted end-to-end" },
                { icon: Mail, title: "One-click access", desc: "Click the link in your email to get in" },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/12 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-none mb-1">{title}</p>
                    <p className="text-blue-200 text-xs leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Dots */}
          <div className="relative z-10 flex items-center gap-1.5 mt-10">
            <div className="h-1.5 w-8 rounded-full bg-white" />
            <div className="h-1.5 w-5 rounded-full bg-white/30" />
            <div className="h-1.5 w-5 rounded-full bg-white/30" />
          </div>
        </div>

        {/* ── Right: Login Form ── */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 flex flex-col justify-center">

          <div className="flex items-center justify-end mb-4">
            <ModeToggle />
          </div>

          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase mb-3">
              Sign in
            </span>
            <h1 className="text-slate-900 dark:text-white text-2xl font-semibold tracking-tight mb-1.5">
              Choose a sign-in method
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Use the password option for demos and shared access, or use a magic link if you prefer a passwordless experience.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Lock className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Password login</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Best for demos and shared access</p>
              </div>
            </div>

            <form action={handleCredentialsLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Email address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    name="email"
                    required
                    type="email"
                    placeholder="hello@example.com"
                    className="h-11 pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                               focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                               focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    name="password"
                    required
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                               focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                               focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/70 dark:bg-blue-900/20 px-3 py-2.5 text-xs text-blue-700 dark:text-blue-300">
                Demo access: use <span className="font-semibold">demo@invoicepilot.com</span> with <span className="font-semibold">demo123456</span>.
              </div>

              <SubmitButton text="Sign in with password" />
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Magic link</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">No password required</p>
              </div>
            </div>

            <form action={handleMagicLinkLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Email address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    name="email"
                    required
                    type="email"
                    placeholder="hello@example.com"
                    className="h-11 pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                               focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                               focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl px-4 py-3">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-700 dark:text-blue-300 text-xs leading-relaxed">
                  We'll email you a secure magic link — no password required.
                </p>
              </div>

              <SubmitButton text="Send magic link" />
            </form>
          </div>

          <DemoNotice />

          <div className="mt-4">
            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                className: "w-full h-11 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 text-sm hover:bg-slate-50 transition-all",
              })}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to homepage
            </Link>
          </div>

          <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            SSL secured · GDPR compliant
          </p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage