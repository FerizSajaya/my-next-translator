import "server-only";
import { prisma } from "@/src/lib/prisma";
import { requireRoles } from "@/src/lib/auth/authorization";

export async function getUsers() {
	await requireRoles(["SUPER_ADMIN", "ADMIN"]);

	return prisma.user.findMany({
		where: {
			role: {
				not: "SUPER_ADMIN",
			},
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}
