import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/src/components/auth/AuthForm";
import UserProfile from "@/src/components/auth/UserProfile";
import { getCurrentUser } from "@/src/lib/auth/auth";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	return (
		<main className="flex flex-col flex-1 justify-start items-center size-full py-2">
			{user ? (
				<Tabs defaultValue="profile" className="size-full">
					<TabsList variant="line" className="w-full border-b border-gray-200">
						<TabsTrigger value="profile">Profile</TabsTrigger>

						<TabsTrigger value="settings">Settings</TabsTrigger>
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
