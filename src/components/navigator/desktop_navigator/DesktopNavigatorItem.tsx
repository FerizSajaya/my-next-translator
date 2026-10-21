"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { DesktopNavigatorItemProps } from "@/src/types/navigator.interface";

export default function DesktopNavigatorItem({ href, title }: DesktopNavigatorItemProps) {
	const pathname = usePathname();

	const isLinkActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

	const Icon = navigatorIcons[title];

	return (
		<Link
			href={href}
			replace
			className={`flex justify-center items-center gap-2 h-full py-1 px-4 rounded-full ${isLinkActive ? "bg-gray-200 dark:bg-gray-900 font-semibold" : "font-normal"}`}>
			<Icon size={isLinkActive ? 20 : 18} strokeWidth={isLinkActive ? 2 : 1.5} />

			<span className="text-base">{title}</span>
		</Link>
	);
}
