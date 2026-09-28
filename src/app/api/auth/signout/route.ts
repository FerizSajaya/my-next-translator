import { NextResponse } from "next/server";

import { deleteSession } from "@/src/lib/auth/session";

export async function POST() {
	try {
		await deleteSession();

		return NextResponse.json({
			success: true,
			message: "Signed out successfully.",
		});
	} catch (error) {
		console.error("Sign out error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong. Please try again.",
			},
			{ status: 500 },
		);
	}
}
