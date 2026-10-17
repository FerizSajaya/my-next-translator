"use server";

import { revalidatePath } from "next/cache";
import { requireRoles } from "@/src/lib/auth/authorization";
import { prisma } from "@/src/lib/prisma";
import { AssignableRole } from "@/src/types/dashboard.interface";

export async function updateUserRole(userId: number, userRole: AssignableRole) {
	await requireRoles(["SUPER_ADMIN"]);

	const targetUser = await prisma.user.findUnique({
		where: { id: userId },
		select: { role: true },
	});

	if (!targetUser) throw new Error("User not found!");

	if (targetUser.role === "SUPER_ADMIN") throw new Error("SUPER_ADMIN role cannot be changed!");

	await prisma.user.update({
		where: { id: userId },
		data: { role: userRole },
	});

	revalidatePath("/dashboard");
}
