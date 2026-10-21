import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth/auth";
import { navigatorIcons, navigatorItems } from "@/src/enums/navigator.enum";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default async function DesktopNavigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ href, roles }) => {
		if (href === "/profile") return false;

		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<div className="hidden md:flex justify-center items-center gap-4 h-12 rounded-xl bg-gray-200">
			<NavigationMenu>
				<NavigationMenuList>
					{visibleNavigatorItems.map(({ id, href, title }) => {
						const Icon = navigatorIcons[title];

						return (
							<NavigationMenuItem key={id}>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									render={
										<Link href={href} replace className={`flex justify-center items-center gap-2 h-full mx-2 py-1 px-4 rounded-full`}>
											<Icon size={20} strokeWidth={2} />

											<span className="text-base">{title}</span>
										</Link>
									}
								/>
							</NavigationMenuItem>
						);
					})}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
