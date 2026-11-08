import "server-only";

import { getCurrentUser } from "@/src/lib/auth/auth";
import { Role } from "@/src/generated/prisma/client";
import { ForbiddenError, UnauthorizedError } from "./errors";

export async function requireAuth() {
	const user = await getCurrentUser();

	if (!user) throw new UnauthorizedError();

	return user;
}

export async function requireRoles(allowedRoles: Role[]) {
	const user = await requireAuth();

	if (!allowedRoles.includes(user.role)) throw new ForbiddenError();

	return user;
}
