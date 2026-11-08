"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { navigatorIcons } from "@/src/enums/navigator.enum";
import { MobileNavigatorItemProps } from "@/src/types/navigator.interface";

export default function MobileNavigatorItem({ href, title }: MobileNavigatorItemProps) {
	const pathname = usePathname();

	const Icon = navigatorIcons[title];

	const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

	return (
		<NavigationMenuItem>
			<NavigationMenuLink
				active={isActive}
				className={cn(
					navigationMenuTriggerStyle(),
					"h-full px-2 py-1 rounded-sm",
					isActive ? "bg-sky-100! text-sky-900 dark:bg-blue-900! dark:text-white" : "bg-transparent",
				)}
				render={
					<Link href={href} replace aria-current={isActive ? "page" : undefined} className="flex h-full flex-col items-center justify-between">
						<Icon size={20} strokeWidth={2} />

						<span className="text-2xs">{title}</span>
					</Link>
				}
			/>
		</NavigationMenuItem>
	);
}
