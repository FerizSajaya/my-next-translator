"use server";

import { revalidatePath } from "next/cache";
import { requireRoles } from "@/src/lib/auth/authorization";
import { prisma } from "@/src/lib/prisma";

export async function deleteUser(userId: number) {
	await requireRoles(["SUPER_ADMIN"]);

	const targetUser = await prisma.user.findUnique({
		where: { id: userId },
		select: { id: true, role: true },
	});

	if (!targetUser) throw new Error("User not found!");

	if (targetUser.role === "SUPER_ADMIN") throw new Error("SUPER_ADMIN cannot be deleted!");

	await prisma.user.delete({
		where: { id: userId },
	});

	revalidatePath("/dashboard");
}
