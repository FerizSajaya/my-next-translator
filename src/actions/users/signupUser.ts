"use server";

import { hashPassword } from "@/src/lib/auth/password";
import { createSession } from "@/src/lib/auth/session";
import { signUpSchema } from "@/src/lib/auth/validation";
import { prisma } from "@/src/lib/prisma";

export async function signupUser(data: unknown) {
	const validation = signUpSchema.safeParse(data);

	const { data: inputData, success } = validation;

	if (!success) throw new Error("Invalid input!");

	const { name, email, password } = inputData;

	const passwordHash = await hashPassword(password);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: passwordHash,
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
		},
	});

	await createSession(user.id);

	return {
		success: true,
		message: "Account created successfully!",
		user,
	};
}
