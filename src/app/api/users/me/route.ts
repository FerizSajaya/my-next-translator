import { NextResponse } from "next/server";

import { requireAuth } from "@/src/lib/auth/authorization";
import { ForbiddenError, UnauthorizedError } from "@/src/lib/auth/errors";

export async function GET() {
	try {
		const user = await requireAuth();

		return NextResponse.json({
			data: user,
		});
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return NextResponse.json(
				{
					message: "Authentication required.",
				},
				{ status: 401 },
			);
		}

		if (error instanceof ForbiddenError) {
			return NextResponse.json(
				{
					message: "You do not have permission to access this resource.",
				},
				{ status: 403 },
			);
		}

		console.error("GET /api/users/me error:", error);

		return NextResponse.json(
			{
				message: "Internal server error.",
			},
			{ status: 500 },
		);
	}
}
