"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { DesktopNavigatorItemProps } from "@/src/types/navigator.interface";

export default function DesktopNavigatorItem({ href, title }: DesktopNavigatorItemProps) {
	const pathname = usePathname();

	const Icon = navigatorIcons[title];

	const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				active={isActive}
				className={cn(
					navigationMenuTriggerStyle(),
					"h-full mx-2 px-2 py-1 rounded-sm",
					isActive ? "bg-sky-100! text-sky-900 dark:bg-blue-900! dark:text-white" : "bg-transparent",
				)}
				render={
					<Link href={href} replace className={`flex justify-center items-center gap-2 h-full mx-2 py-1 px-4 rounded-full`}>
						<Icon size={20} strokeWidth={2} />

						<span className="text-base">{title}</span>
					</Link>
				}
			/>
		</NavigationMenuItem>
	);
}
