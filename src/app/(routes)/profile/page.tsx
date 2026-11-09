import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/src/components/auth/AuthForm";
import UserProfile from "@/src/app/(routes)/profile/components/UserProfile";
import { profileTabs } from "@/src/enums/profile.enum";
import { getCurrentUser } from "@/src/lib/auth/auth";
import UserSettings from "./components/UserSettings";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	const visibleTabs = profileTabs.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<main className="flex flex-col flex-1 justify-start items-center size-full py-2">
			{user ? (
				<>
					{/* Horizontal tabs in mobile size */}
					<Tabs defaultValue="profile" orientation="horizontal" className="block md:hidden size-full">
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
							<UserSettings />
						</TabsContent>
					</Tabs>

					{/* Vertical Tabs in desktop size */}
					<Tabs defaultValue="profile" orientation="vertical" className="hidden md:flex size-full">
						<div className="w-max h-full border-e border-gray-200">
							<TabsList variant="line" className="size-max">
								{visibleTabs.map(({ id, value, title }) => (
									<TabsTrigger key={id} value={value}>
										{title}
									</TabsTrigger>
								))}
							</TabsList>
						</div>

						<TabsContent value="profile">
							<UserProfile user={user} />
						</TabsContent>

						<TabsContent value="settings">
							<UserSettings />
						</TabsContent>
					</Tabs>
				</>
			) : (
				<AuthForm />
			)}
		</main>
	);
}
