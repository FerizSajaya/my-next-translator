import { Role } from "@/src/generated/prisma/client";

export type NavigatorItemAddress = "/" | "/dashboard" | "/words";

export type NavigatorItemTitle = "Home" | "Dashboard" | "Words";

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
