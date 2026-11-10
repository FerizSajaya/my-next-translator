import { UserProfileProps } from "@/src/types/auth.interface";
import SignOutButton from "@/src/app/(routes)/profile/components/auth/SignOutButton";

export default function UserProfile({ user }: UserProfileProps) {
	const { name, email } = user;

	const avatarText = name.trim().charAt(0).toUpperCase();

	return (
		<section className="flex flex-col justify-start items-center gap-2 size-full">
			<div className="flex w-full max-w-md items-center justify-between p-4 border rounded-xl border-gray-200 bg-gray-100 dark:border-gray-500 dark:bg-gray-900">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center shrink-0 size-12 rounded-full bg-primary text-lg font-semibold text-primary-foreground">{avatarText}</div>

					<div className="min-w-0">
						<p className="truncate font-medium">{name}</p>

						<p className="truncate text-sm text-muted-foreground">{email}</p>
					</div>
				</div>

				<SignOutButton />
			</div>
		</section>
	);
}
