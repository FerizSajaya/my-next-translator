"use client";

import { cn } from "cn";
import { UserRoundCogIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSettings() {
	const pathname = usePathname();

	const isLinkActive = pathname.startsWith("/settings");

	return (
		<Link
			href={"/settings"}
			replace
			className={cn(
				"absolute top-1/2 -translate-y-1/2 inset-e-2 sm:inset-e-3 md:inset-e-4 p-2 border rounded-full",
				isLinkActive ? "border-sky-400 bg-sky-200" : "border-sky-300 bg-sky-100",
			)}>
			<UserRoundCogIcon size={20} strokeWidth={1.5} />
		</Link>
	);
}
