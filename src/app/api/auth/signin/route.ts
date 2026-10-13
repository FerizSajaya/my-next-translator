import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { verifyPassword } from "@/src/lib/auth/password";
import { signInSchema } from "@/src/lib/auth/validation";
import { createSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { data, success, error } = signInSchema.safeParse(body);

		if (!success) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid input!",
					errors: error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const { email: emailInput, password: passwordInput } = data;

		const existingUser = await prisma.user.findUnique({
			where: {
				email: emailInput,
			},
		});

		if (!existingUser) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid email or password!",
				},
				{ status: 401 },
			);
		}

		const { id: userId, name: userName, password: userPassword, email: userEmail, role: userRole } = existingUser;

		const passwordMatches = await verifyPassword(userPassword, passwordInput);

		if (!passwordMatches) {
			return NextResponse.json(
				{
					success: false,
					message: "Invalid email or password!",
				},
				{ status: 401 },
			);
		}

		await createSession(userId);

		return NextResponse.json({
			success: true,
			message: "Signed in successfully!",
			user: {
				id: userId,
				name: userName,
				email: userEmail,
				role: userRole,
			},
		});
	} catch (error) {
		console.error("Sign in error: ", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong... Please try again!",
			},
			{ status: 500 },
		);
	}
}
