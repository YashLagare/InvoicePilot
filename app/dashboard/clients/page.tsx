import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import prisma from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import { Building2, Mail, MoreHorizontal, Phone, Plus, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { deleteClientAction } from "@/app/action";
import { EmptyState } from "@/app/components/EmptyState";

async function getClients(userId: string) {
  const data = await prisma.client.findMany({
    where: {
      userId: userId,
    },
    include: {
      invoices: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function ClientsPage() {
  const session = await requireUser();
  const clients = await getClients(session.user?.id as string);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Clients Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage client profiles, contact information, and billing history.
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
          <Link href="/dashboard/clients/create">
            <Plus className="mr-2 h-4 w-4" /> Add New Client
          </Link>
        </Button>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          title="No clients found"
          description="Create your first client profile to quickly populate invoice details."
          buttonText="Add Client"
          href="/dashboard/clients/create"
        />
      ) : (
        <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Client Directory ({clients.length})
            </CardTitle>
            <CardDescription>
              All saved client records for automated invoice generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                  <TableHead className="pl-6">Client Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Invoices</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className="border-slate-100 dark:border-slate-800">
                    <TableCell className="pl-6 font-medium text-slate-900 dark:text-slate-100">
                      <Link href={`/dashboard/clients/${client.id}`} className="hover:underline flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-xs">
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">
                      {client.company || "—"}
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {client.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">
                      {client.phone ? (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {client.phone}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                        {client.invoices.length} Invoices
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/clients/${client.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/clients/${client.id}/edit`}>Edit Client</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <form action={async () => {
                              "use server";
                              await deleteClientAction(client.id);
                            }}>
                              <button type="submit" className="w-full text-left text-red-600 dark:text-red-400">
                                Delete Client
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
