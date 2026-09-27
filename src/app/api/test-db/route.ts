import { prisma } from "@/src/lib/prisma";

export async function GET() {
	try {
		const users = await prisma.user.findMany();

		return Response.json({
			success: true,
			users,
		});
	} catch (error) {
		console.error("Database error:", error);

		return Response.json(
			{
				success: false,
				message: "Database connection failed",
			},
			{ status: 500 },
		);
	}
}
