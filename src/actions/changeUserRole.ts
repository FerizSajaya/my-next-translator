"use server";

import { z } from "zod";

import { prisma } from "@/src/lib/prisma";
import { requireRoles } from "@/src/lib/auth/authorization";

const changeRoleSchema = z.object({
	userId: z.number().int().positive(),
	role: z.enum(["USER", "ADMIN"]),
});

export async function changeUserRole(input: unknown) {
	const user = await requireRoles(["SUPER_ADMIN"]);

	const data = changeRoleSchema.parse(input);

	await prisma.user.update({
		where: {
			id: data.userId,
		},
		data: {
			role: data.role,
		},
	});

	return {
		success: true,
	};
}
