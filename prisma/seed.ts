import "dotenv/config";
import argon2 from "argon2";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	const name = process.env.SUPER_ADMIN_NAME;
	const email = process.env.SUPER_ADMIN_EMAIL;
	const password = process.env.SUPER_ADMIN_PASSWORD;

	if (!name || !email || !password) {
		throw new Error("SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be defined.");
	}

	const passwordHash = await argon2.hash(password, {
		type: argon2.argon2id,
	});

	await prisma.user.upsert({
		where: {
			email,
		},
		update: {
			role: "SUPER_ADMIN",
		},
		create: {
			name,
			email,
			password: passwordHash,
			role: "SUPER_ADMIN",
		},
	});
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
