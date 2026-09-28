import { UserProfileProps } from "@/src/types/auth.interface";
import SignOutButton from "./SignOutButton";

export default function UserProfile({ user }: UserProfileProps) {
	const avatarText = user.name.trim().charAt(0).toUpperCase();

	return (
		<div className="flex w-full max-w-md items-center justify-between rounded-xl border p-4">
			<div className="flex items-center gap-3">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">{avatarText}</div>

				<div className="min-w-0">
					<p className="truncate font-medium">{user.name}</p>

					<p className="truncate text-sm text-muted-foreground">{user.email}</p>
				</div>
			</div>

			<SignOutButton />
		</div>
	);
}
