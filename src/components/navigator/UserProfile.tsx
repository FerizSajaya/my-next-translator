"use client";

import { cn } from "cn";
import { UserRoundCogIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserProfile() {
	const pathname = usePathname();

	const isLinkActive = pathname.startsWith("/profile");

	return (
		<Link
			href={"/profile"}
			replace
			prefetch
			className={cn(
				"hidden md:block absolute top-1/2 -translate-y-1/2 inset-e-2 sm:inset-e-3 md:inset-e-4 p-2 border rounded-full",
				isLinkActive ? "bg-sky-200 border-sky-400 dark:bg-blue-900 dark:border-blue-900" : "bg-sky-100 border-sky-300 dark:bg-blue-800 dark:border-blue-900",
			)}>
			<UserRoundCogIcon size={20} strokeWidth={1.5} />
		</Link>
	);
}
