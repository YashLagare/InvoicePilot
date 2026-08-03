import prisma from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import CompanySettingsForm from "@/app/dashboard/settings/CompanySettingsForm";

async function getCompanyProfile(userId: string) {
    const profile = await prisma.companyProfile.findUnique({
        where: {
            userId: userId,
        },
    });

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            address: true,
        },
    });

    return { profile, user };
}

export default async function SettingsPage() {
    const session = await requireUser();
    const { profile, user } = await getCompanyProfile(session.user?.id as string);

    return <CompanySettingsForm profile={profile} user={user} />;
}
