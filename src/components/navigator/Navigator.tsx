import { getCurrentUser } from "@/src/lib/auth/session";
import { navigatorItems } from "@/src/enums/navigator.enum";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import MobileNavigatorItem from "./NavigatorMobileItem";
import DesktopNavigatorItem from "./NavigatorDesktopItem";

export default async function Navigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<>
			{/* Mobile */}
			<NavigationMenu className="block md:hidden w-full h-12">
				<NavigationMenuList className="flex justify-between items-center">
					{visibleNavigatorItems.map(({ id, href, title }) => (
						<MobileNavigatorItem key={id} href={href} title={title} />
					))}
				</NavigationMenuList>
			</NavigationMenu>

			{/* Desktop */}
			<div className="hidden md:block w-max">
				<NavigationMenu className="flex justify-center items-center h-12 border rounded-lg border-gray-200">
					<NavigationMenuList>
						{visibleNavigatorItems
							.filter(({ href }) => href !== "/profile")
							.map(({ id, href, title }) => (
								<DesktopNavigatorItem key={id} href={href} title={title} />
							))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</>
	);
}
