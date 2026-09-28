import { HomeIcon, LayoutDashboardIcon, TablePropertiesIcon } from "lucide-react";
import { NavigatorItem } from "../types/navigator.interface";

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
		href: "/translations",
		title: "Translations",
	},
];

export const navigatorIcons = {
	Home: HomeIcon,
	Dashboard: LayoutDashboardIcon,
	Translations: TablePropertiesIcon,
};
