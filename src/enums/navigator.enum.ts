import { NavigatorItem } from "../types/navigator.interface";
import { HomeIcon, LayoutDashboardIcon, TablePropertiesIcon } from "lucide-react";

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
		roles: ["USER", "ADMIN", "SUPER_ADMIN"],
	},
];

export const navigatorIcons = {
	Home: HomeIcon,
	Dashboard: LayoutDashboardIcon,
	Words: TablePropertiesIcon,
};
