"use client";

import { navigatorIcons } from "@/src/enums/navigator.enum";
import { DesktopNavigatorItemProps } from "@/src/types/navigator.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavigatorItem({ href, title }: DesktopNavigatorItemProps) {
	const pathname = usePathname();

	const isLinkActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

	const Icon = navigatorIcons[title];

	return (
		<Link href={href} replace className={`flex justify-center items-center gap-2 h-full py-1 px-4 rounded-full ${isLinkActive ? "bg-gray-200 font-bold" : ""}`}>
			<Icon size={isLinkActive ? 20 : 18} strokeWidth={isLinkActive ? 2 : 1.5} />

			<span className="text-base">{title}</span>
		</Link>
	);
}
