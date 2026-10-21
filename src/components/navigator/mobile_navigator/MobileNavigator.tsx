import Link from "next/link";
import { getCurrentUser } from "@/src/lib/auth/session";
import { navigatorIcons, navigatorItems } from "@/src/enums/navigator.enum";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default async function MobileNavigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<div className="flex md:hidden justify-center items-center gap-4 h-12">
			<NavigationMenu>
				<NavigationMenuList>
					{visibleNavigatorItems.map(({ id, href, title }) => {
						const Icon = navigatorIcons[title];

						return (
							<NavigationMenuItem key={id}>
								<NavigationMenuLink
									className={navigationMenuTriggerStyle()}
									render={
										<Link href={href} replace className={`flex flex-col justify-between items-center h-full mx-2 py-1 px-2 rounded-md`}>
											<Icon size={20} strokeWidth={2} />

											<span className="text-2xs">{title}</span>
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
