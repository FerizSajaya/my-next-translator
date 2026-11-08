import { NavigatorItem } from "../types/navigator.interface";
import { HomeIcon, LayoutDashboardIcon, TablePropertiesIcon, UserRoundCogIcon } from "lucide-react";

export const navigatorItems: NavigatorItem[] = [
	{
		id: 1,
		href: "/",
		title: "Home",
	},
	{
		id: 2,
		href: "/dashboard",
		title: "Dashboard",
		roles: ["ADMIN", "SUPER_ADMIN"],
	},
	{
		id: 3,
		href: "/words",
		title: "Words",
	},
	{
		id: 4,
		href: "/profile",
		title: "Profile",
	},
];

export const navigatorIcons = {
	Home: HomeIcon,
	Dashboard: LayoutDashboardIcon,
	Words: TablePropertiesIcon,
	Profile: UserRoundCogIcon,
};
