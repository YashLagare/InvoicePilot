import InvoiceList from "@/app/components/InvoiceList"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

type SearchParams = Promise<{ page?: string }>;

const InvoicesRoute = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon />Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <InvoiceList page={page} />
      </CardContent>
    </Card>
  )
}

export default InvoicesRoute