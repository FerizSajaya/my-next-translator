import { NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";
import { verifyPassword } from "@/src/lib/auth/password";
import { signInSchema } from "@/src/lib/auth/validation";
import { createSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const result = signInSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid input.",
					errors: result.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { email, password } = result.data;

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid email or password.",
				},
				{ status: 401 },
			);
		}

		const passwordMatches = await verifyPassword(password, user.password);

		if (!passwordMatches) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid email or password.",
				},
				{ status: 401 },
			);
		}

		await createSession(user.id);

		return NextResponse.json({
			success: true,
			message: "Signed in successfully.",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Sign in error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong. Please try again.",
			},
			{ status: 500 },
		);
	}
}
