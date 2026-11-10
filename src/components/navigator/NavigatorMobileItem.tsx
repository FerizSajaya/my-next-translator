"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { NavigatorMobileItemProps } from "@/src/types/navigator.interface";

export default function NavigatorMobileItem({ href, title }: NavigatorMobileItemProps) {
	const pathname = usePathname();

	const Icon = navigatorIcons[title];

	const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

	return (
		<NavigationMenuItem className="h-full">
			<NavigationMenuLink
				active={isActive}
				className={cn(
					navigationMenuTriggerStyle(),
					"h-full rounded-none",
					isActive ? "border-t-2 border-zinc-700 text-zinc-800! dark:bg-zinc-900! dark:text-white!" : "bg-transparent text-zinc-600!",
				)}
				render={
					<Link href={href} replace aria-current={isActive ? "page" : undefined} className="flex flex-col justify-between items-center h-full">
						<Icon strokeWidth={2} className="size-6" />

						<span className="text-base">{title}</span>
					</Link>
				}
			/>
		</NavigationMenuItem>
	);
}
