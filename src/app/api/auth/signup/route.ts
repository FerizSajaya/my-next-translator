import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { hashPassword } from "@/src/lib/auth/password";
import { signUpSchema } from "@/src/lib/auth/validation";
import { createSession } from "@/src/lib/auth/session";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { data, success, error } = signUpSchema.safeParse(body);

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

		const { name: nameInput, email: emailInput, password: passwordInput } = data;

		const existingUser = await prisma.user.findUnique({
			where: {
				email: emailInput,
			},
		});

		if (existingUser) {
			return NextResponse.json(
				{
					success: false,
					message: "An account with this email already exists!",
				},
				{ status: 409 },
			);
		}

		const passwordHash = await hashPassword(passwordInput);

		const {
			id: userId,
			name: userName,
			email: userEmail,
			role: userRole,
		} = await prisma.$transaction(async (db) => {
			return await db.user.create({
				data: {
					name: nameInput,
					email: emailInput,
					password: passwordHash,
				},
			});
		});

		await createSession(userId);

		return NextResponse.json(
			{
				success: true,
				message: "Account created successfully!",
				user: {
					id: userId,
					name: userName,
					email: userEmail,
					role: userRole,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Signup error: ", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong... Please try again!",
			},
			{ status: 500 },
		);
	}
}
