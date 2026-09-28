import { Role } from "@/src/generated/prisma/client";

export type NavigatorItemAddress = "/" | "/dashboard" | "/translations";

export type NavigatorItemTitle = "Home" | "Dashboard" | "Translations";

export interface NavigatorItem {
	id: number;
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
	roles?: Role[];
}

export interface MobileNavigatorItemProps {
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
}

export interface DesktopNavigatorItemProps {
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
}
