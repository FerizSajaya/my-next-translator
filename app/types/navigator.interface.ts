export type NavigatorItemAddress = "/" | "/dashboard" | "/translations";

export type NavigatorItemTitle = "Home" | "Dashboard" | "Translations";

export interface NavigatorItems {
	id: number;
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
}

export interface MobileNavigatorItemProps {
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
}

export interface DesktopNavigatorItemProps {
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
}
