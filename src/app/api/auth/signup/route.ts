import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { hashPassword } from "@/src/lib/auth/password";
import { signUpSchema } from "@/src/lib/auth/validation";
import { createSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const result = signUpSchema.safeParse(body);

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

		const { name, email, password } = result.data;

		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					message: "An account with this email already exists.",
				},
				{ status: 409 },
			);
		}

		const passwordHash = await hashPassword(password);

		const user = await prisma.$transaction(async (tx) => {
			const newUser = await tx.user.create({
				data: {
					name,
					email,
					password: passwordHash,
				},
			});

			return newUser;
		});

		await createSession(user.id);

		return NextResponse.json(
			{
				success: true,
				message: "Account created successfully.",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Signup error:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong. Please try again.",
			},
			{ status: 500 },
		);
	}
}
