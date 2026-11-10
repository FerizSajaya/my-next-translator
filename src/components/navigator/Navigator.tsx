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
			<NavigationMenu className="flex md:hidden justify-center items-center size-full">
				<NavigationMenuList className="flex justify-evenly items-center h-full">
					{visibleNavigatorItems.map(({ id, href, title }) => (
						<MobileNavigatorItem key={id} href={href} title={title} />
					))}
				</NavigationMenuList>
			</NavigationMenu>

			{/* Desktop */}
			<div className="hidden md:flex justify-center items-center w-max h-14">
				<NavigationMenu className="flex justify-center items-center h-full">
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
