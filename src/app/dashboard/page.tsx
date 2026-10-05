import AccessDenied from "@/src/components/auth/AccessDenied";
import { requireRoles } from "@/src/lib/auth/authorization";
import { ForbiddenError, UnauthorizedError } from "@/src/lib/auth/errors";
import UsersList from "./components/UsersList";

export default async function DashboardPage() {
	try {
		const user = await requireRoles(["ADMIN", "SUPER_ADMIN"]);

		const { name, role } = user;

		return (
			<main className="flex flex-col flex-1 justify-start items-center size-full p-4">
				<h1>Welcome {name}</h1>

				{role === "SUPER_ADMIN" && <UsersList />}
			</main>
		);
	} catch (error) {
		if (error instanceof UnauthorizedError) return <AccessDenied type="UNAUTHORIZED" />;

		if (error instanceof ForbiddenError) return <AccessDenied type="FORBIDDEN" />;

		throw error;
	}
}
