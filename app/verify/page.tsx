// import { buttonVariants } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { AlertCircleIcon, ArrowLeft, Mail } from 'lucide-react'
// import Link from 'next/link'

// const VerifyPage = () => {
//     return (
//         <div className='min-h-screen w-full flex items-center justify-center'>
//             <Card className='w-95 px-5'>
//                 <CardHeader className="text-center">
//                     <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
//                         <Mail className="size-12 text-blue-500" />
//                     </div>

//                     <CardTitle className='text-2xl font-bold'>Check your Email</CardTitle>
//                     <CardDescription>We Have sent verification link to your email address</CardDescription>
//                     <CardContent>
//                         <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
//                             <div className="flex items-center">
//                                 <AlertCircleIcon className="size-5 text-yellow-400" />
//                                 <p className="text-sm font-medium text-yellow-700 ml-3">Be sure to check your spam folder!</p>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </CardHeader>
//                 <CardFooter>
//                     <Link href="/" className={buttonVariants(
//                         {
//                             className: "w-full",
//                             variant: "outline",
//                         }
//                     )}>
//                         <ArrowLeft className="size-4 mr-2" />Back to Homepage
//                     </Link>
//                 </CardFooter>
//             </Card>
//         </div>
//     )
// }

// export default VerifyPage


import { buttonVariants } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, FileText, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const VerifyPage = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 sm:p-8">

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl">

                {/* ── Left: Brand Panel ── */}
                <div className="relative bg-blue-700 p-8 sm:p-10 flex flex-col justify-between overflow-hidden">

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
                            One step away
                        </h2>
                        <p className="text-blue-200 text-sm leading-relaxed mb-8">
                            Your magic link is on its way. Check your inbox and click it to access your account instantly.
                        </p>

                        <ul className="space-y-5">
                            {[
                                { icon: Mail, title: "Check your inbox", desc: "The link expires in 10 minutes" },
                                { icon: AlertCircle, title: "Check spam too", desc: "Sometimes emails land there" },
                                { icon: ShieldCheck, title: "Single-use link", desc: "Each link works only once, securely" },
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
                        <div className="h-1.5 w-5 rounded-full bg-white/30" />
                        <div className="h-1.5 w-5 rounded-full bg-white/30" />
                        <div className="h-1.5 w-8 rounded-full bg-white" />
                    </div>
                </div>

                {/* ── Right: Verify Panel ── */}
                <div className="bg-white p-8 sm:p-10 flex flex-col justify-center">

                    <div className="mb-8">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase mb-3">
                            Verify email
                        </span>
                        <h1 className="text-slate-900 text-2xl font-semibold tracking-tight mb-1.5">
                            Check your email
                        </h1>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            We sent a verification link to your email address. Click it to sign in.
                        </p>
                    </div>

                    {/* Mail icon */}
                    <div className="flex flex-col items-center justify-center py-8 mb-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-slate-700 text-sm font-medium">Magic link sent!</p>
                        <p className="text-slate-400 text-xs mt-1">The link expires in 10 minutes</p>
                    </div>

                    {/* Spam warning */}
                    <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-700 text-xs leading-relaxed">
                            Can't find the email? Be sure to check your <span className="font-semibold">spam or junk</span> folder.
                        </p>
                    </div>

                    {/* Back button */}
                    <Link
                        href="/"
                        className={buttonVariants({
                            variant: "outline",
                            className: "w-full h-11 rounded-xl border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-all",
                        })}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to homepage
                    </Link>

                    <p className="text-center text-slate-400 text-xs mt-5 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3 h-3" />
                        SSL secured · GDPR compliant
                    </p>

                </div>
            </div>
        </div>
    )
}

export default VerifyPage