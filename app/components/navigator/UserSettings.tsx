"use client";

import { UserRoundCogIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSettings() {
	const pathname = usePathname();

	const isLinkActive = pathname.startsWith("/settings");

	return (
		<Link href={"/settings"} replace className="absolute top-1/2 -translate-y-1/2 inset-e-4">
			<UserRoundCogIcon size={isLinkActive ? 20 : 18} strokeWidth={isLinkActive ? 2 : 1.5} />
		</Link>
	);
}
