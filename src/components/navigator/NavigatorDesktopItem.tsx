"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { NavigatorDesktopItemProps } from "@/src/types/navigator.interface";

export default function NavigatorDesktopItem({ href, title }: NavigatorDesktopItemProps) {
	const pathname = usePathname();

	const Icon = navigatorIcons[title];

	const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				active={isActive}
				className={cn(
					navigationMenuTriggerStyle(),
					"h-full",
					isActive ? "bg-zinc-200! text-zinc-800! dark:bg-zinc-900! dark:text-white!" : "bg-transparent text-zinc-600!",
				)}
				render={
					<Link href={href} replace className={`flex justify-center items-center gap-2 h-full mx-2 py-1 px-4 rounded-full`}>
						<Icon strokeWidth={2} className="size-6" />

						<span className="text-base">{title}</span>
					</Link>
				}
			/>
		</NavigationMenuItem>
	);
}
