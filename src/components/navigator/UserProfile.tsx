"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { navigatorIcons } from "@/src/enums/navigator.enum";

export default function UserProfile() {
	const pathname = usePathname();

	const isLinkActive = pathname.startsWith("/profile");

	const { Profile: Icon } = navigatorIcons;

	return (
		<Link
			href={"/profile"}
			replace
			prefetch
			className={cn(
				"hidden md:block absolute top-1/2 -translate-y-1/2 inset-e-2 sm:inset-e-3 md:inset-e-4 p-2 border rounded-full",
				isLinkActive ? "bg-sky-200 border-sky-400 dark:bg-blue-900 dark:border-blue-900" : "bg-sky-100 border-sky-300 dark:bg-blue-800 dark:border-blue-900",
			)}>
			<Icon strokeWidth={2} className="size-6 text-sky-600" />
		</Link>
	);
}
