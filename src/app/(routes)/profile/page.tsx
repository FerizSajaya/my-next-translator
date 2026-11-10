import { TabsContent } from "@/components/ui/tabs";
import AuthForm from "@/src/app/(routes)/profile/components/auth/AuthForm";
import UserProfile from "@/src/app/(routes)/profile/components/UserProfile";
import { profileTabs } from "@/src/enums/profile.enum";
import { getCurrentUser } from "@/src/lib/auth/auth";
import UserSettings from "./components/UserSettings";
import ResponsiveProfileTabs from "./components/ResponsiveProfileTabs";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	const visibleTabs = profileTabs.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<main className="flex flex-col flex-1 justify-start items-center size-full">
			{user ? (
				<ResponsiveProfileTabs visibleTabs={visibleTabs}>
					<TabsContent value="account" className="flex-1 p-4">
						<UserProfile user={user} />
					</TabsContent>

					<TabsContent value="settings" className="flex-1 p-4">
						<UserSettings />
					</TabsContent>
				</ResponsiveProfileTabs>
			) : (
				<AuthForm />
			)}
		</main>
	);
}
