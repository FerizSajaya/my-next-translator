"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { MobileNavigatorItemProps } from "@/src/types/navigator.interface";

export default function MobileNavigatorItem({ href, title }: MobileNavigatorItemProps) {
	const pathname = usePathname();

	const isLinkActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

	const Icon = navigatorIcons[title];

	return (
		<Link
			href={href}
			replace
			className={`flex flex-col justify-between items-center h-full py-1 px-2 rounded-md ${isLinkActive ? "bg-gray-200 dark:bg-gray-900 font-semibold" : "font-normal"}`}>
			<Icon size={isLinkActive ? 20 : 18} strokeWidth={isLinkActive ? 2 : 1.5} />

			<span className="text-[10px]">{title}</span>
		</Link>
	);
}
