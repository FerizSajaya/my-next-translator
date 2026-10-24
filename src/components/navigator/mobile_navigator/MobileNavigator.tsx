import { getCurrentUser } from "@/src/lib/auth/session";
import { navigatorItems } from "@/src/enums/navigator.enum";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import MobileNavigatorItem from "./MobileNavigatorItem";

export default async function MobileNavigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<NavigationMenu className="block md:hidden w-full h-12">
			<NavigationMenuList className="flex justify-between items-center">
				{visibleNavigatorItems.map(({ id, href, title }) => (
					<MobileNavigatorItem key={id} href={href} title={title} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
