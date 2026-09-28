import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { prisma } from "@/src/lib/prisma";

const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

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
