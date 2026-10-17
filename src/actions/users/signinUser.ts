"use server";

import { verifyPassword } from "@/src/lib/auth/password";
import { createSession } from "@/src/lib/auth/session";
import { signInSchema } from "@/src/lib/auth/validation";
import { prisma } from "@/src/lib/prisma";

export async function signinUser(data: unknown) {
	const validation = signInSchema.safeParse(data);

	const { data: inputData, success } = validation;

	if (!success) throw new Error("Invalid input!");

	const { email, password } = inputData;

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) throw new Error("Invalid email or password!");

	const { id: userId, name: userName, password: userPassword, email: userEmail, role: userRole } = user;

	const passwordMatches = await verifyPassword(userPassword, password);

	if (!passwordMatches) throw new Error("Invalid email or password!");

	await createSession(userId);

	return {
		success: true,
		message: "Signed in successfully!",
		user: {
			id: userId,
			name: userName,
			email: userEmail,
			role: userRole,
		},
	};
}
