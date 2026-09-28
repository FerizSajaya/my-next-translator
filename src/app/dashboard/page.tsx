import AccessDenied from "@/src/components/auth/AccessDenied";
import { requireRoles } from "@/src/lib/auth/authorization";
import { ForbiddenError, UnauthorizedError } from "@/src/lib/auth/errors";

export default async function DashboardPage() {
	try {
		const user = await requireRoles(["ADMIN", "SUPER_ADMIN"]);

		return (
			<main className="flex flex-col flex-1 justify-start items-center size-full p-4">
				<h1>Welcome {user.name}</h1>
			</main>
		);
	} catch (error) {
		if (error instanceof UnauthorizedError) return <AccessDenied type="UNAUTHORIZED" />;

		if (error instanceof ForbiddenError) return <AccessDenied type="FORBIDDEN" />;

		throw error;
	}
}
