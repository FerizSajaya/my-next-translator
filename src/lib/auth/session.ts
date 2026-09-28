import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import { SESSION_COOKIE_NAME, SESSION_DURATION } from "@/src/constants/auth";

function hashSessionToken(token: string) {
	return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: number) {
	const token = randomBytes(32).toString("hex");
	const sessionId = hashSessionToken(token);

	const expiresAt = new Date(Date.now() + SESSION_DURATION);

	await prisma.session.create({
		data: {
			id: sessionId,
			userId,
			expiresAt,
		},
	});

	const cookieStore = await cookies();

	cookieStore.set({
		name: SESSION_COOKIE_NAME,
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt,
		path: "/",
	});
}

export async function getCurrentUser() {
	const cookieStore = await cookies();

	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (!token) {
		return null;
	}

	const sessionId = hashSessionToken(token);

	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		select: {
			id: true,
			expiresAt: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			},
		},
	});

	if (!session) {
		return null;
	}

	if (session.expiresAt <= new Date()) {
		await prisma.session.delete({
			where: { id: session.id },
		});

		cookieStore.delete(SESSION_COOKIE_NAME);

		return null;
	}

	return session.user;
}

export async function deleteSession() {
	const cookieStore = await cookies();

	const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

	if (!token) {
		return;
	}

	const sessionId = hashSessionToken(token);

	await prisma.session.deleteMany({
		where: {
			id: sessionId,
		},
	});

	cookieStore.delete(SESSION_COOKIE_NAME);
}
