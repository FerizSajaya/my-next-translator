"use client";

import { navigatorIcons } from "@/app/enums/navigator.enum";
import { MobileNavigatorItemProps } from "@/app/types/navigator.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavigatorItem({ href, title }: MobileNavigatorItemProps) {
	const pathname = usePathname();

	const isLinkActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

	const Icon = navigatorIcons[title];

	return (
		<Link href={href} replace className={`flex flex-col justify-between items-center h-full py-1 px-2 rounded-md ${isLinkActive ? "bg-gray-200 font-bold" : ""}`}>
			<Icon size={isLinkActive ? 20 : 18} strokeWidth={isLinkActive ? 2 : 1.5} />

			<span className="text-xs">{title}</span>
		</Link>
	);
}
