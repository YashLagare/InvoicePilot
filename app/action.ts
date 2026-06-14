"use server";

import { requireUser } from "./utils/hooks";

export async function onboardingUser() {
    const session = await requireUser();

    
}