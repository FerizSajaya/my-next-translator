import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/src/components/auth/AuthForm";
import UserProfile from "@/src/components/auth/UserProfile";
import { profileTabs } from "@/src/enums/profile.enum";
import { getCurrentUser } from "@/src/lib/auth/auth";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	const visibleTabs = profileTabs.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<main className="flex flex-col flex-1 justify-start items-center size-full py-2">
			{user ? (
				<Tabs defaultValue="profile" className="size-full">
					<TabsList variant="line" className="w-full border-b border-gray-200">
						{visibleTabs.map(({ id, value, title }) => (
							<TabsTrigger key={id} value={value}>
								{title}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value="profile">
						<UserProfile user={user} />
					</TabsContent>

					<TabsContent value="settings">
						<>Settings tab</>
					</TabsContent>
				</Tabs>
			) : (
				<AuthForm />
			)}
		</main>
	);
}
