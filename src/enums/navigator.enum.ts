import { HomeIcon, LayoutDashboardIcon, TablePropertiesIcon } from "lucide-react";
import { NavigatorItems } from "../types/navigator.interface";

export const navigatorItems: NavigatorItems[] = [
	{
		id: 1,
		href: "/",
		title: "Home",
	},
	{
		id: 2,
		href: "/dashboard",
		title: "Dashboard",
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
