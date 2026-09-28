import AuthForm from "@/src/components/auth/AuthForm";
import UserProfile from "@/src/components/auth/UserProfile";
import { getCurrentUser } from "@/src/lib/auth/auth";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	return <main className="flex flex-col flex-1 justify-start items-center size-full p-4">{user ? <UserProfile user={user} /> : <AuthForm />}</main>;
}
