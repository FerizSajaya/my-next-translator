import AccessDenied from "@/src/components/auth/AccessDenied";
import { requireRoles } from "@/src/lib/auth/authorization";
import { ForbiddenError, UnauthorizedError } from "@/src/lib/auth/errors";
import UsersList from "./components/UsersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardTabs } from "@/src/enums/dashboard.enum";

export default async function DashboardPage() {
	try {
		const user = await requireRoles(["ADMIN", "SUPER_ADMIN"]);

		const { role } = user;

		const isUserSuperAdmin = role === "SUPER_ADMIN";

		const visibleTabs = dashboardTabs.filter(({ roles }) => {
			if (!roles) return true;

			return user ? roles.includes(user.role) : false;
		});

		return (
			<main className="flex flex-col flex-1 justify-start items-center size-full py-2">
				<Tabs defaultValue="words" className="size-full">
					<TabsList variant="line" className="w-full border-b border-gray-200">
						{visibleTabs.map(({ id, value, title }) => (
							<TabsTrigger key={id} value={value}>
								{title}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="words">
						<>words tab</>
					</TabsContent>

					<TabsContent value="payments">
						<>payments tab</>
					</TabsContent>

					{isUserSuperAdmin && (
						<TabsContent value="users">
							<UsersList />
						</TabsContent>
					)}
				</Tabs>
			</main>
		);
	} catch (error) {
		if (error instanceof UnauthorizedError) return <AccessDenied type="UNAUTHORIZED" />;

		if (error instanceof ForbiddenError) return <AccessDenied type="FORBIDDEN" />;

		throw error;
	}
}
