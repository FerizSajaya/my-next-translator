import { prisma } from "@/src/lib/prisma";

export async function getUsers() {
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
