import { getCurrentUser } from "@/src/lib/auth/auth";
import { navigatorItems } from "@/src/enums/navigator.enum";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import DesktopNavigatorItem from "./DesktopNavigatorItem";

export default async function DesktopNavigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ href, roles }) => {
		if (href === "/profile") return false;

		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<NavigationMenu className="hidden md:flex justify-center items-center h-12 border rounded-lg border-gray-200">
			<NavigationMenuList>
				{visibleNavigatorItems.map(({ id, href, title }) => (
					<DesktopNavigatorItem key={id} href={href} title={title} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
