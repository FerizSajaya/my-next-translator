import { NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";
import { ForbiddenError, UnauthorizedError } from "@/src/lib/auth/errors";
import { requireRoles } from "@/src/lib/auth/authorization";

export async function GET() {
	try {
		await requireRoles(["ADMIN", "SUPER_ADMIN"]);

		const users = await prisma.user.findMany({
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

		return NextResponse.json({
			success: true,
			data: users,
		});
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return NextResponse.json(
				{
					success: false,
					message: "Authentication required.",
				},
				{ status: 401 },
			);
		}

		if (error instanceof ForbiddenError) {
			return NextResponse.json(
				{
					success: false,
					message: "You do not have permission to perform this action.",
				},
				{ status: 403 },
			);
		}

		console.error("Get users error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong.",
			},
			{ status: 500 },
		);
	}
}
