import { Role } from "@/src/generated/prisma/client";

export type NavigatorItemAddress = "/" | "/dashboard" | "/words" | "/profile";

export type NavigatorItemTitle = "Home" | "Dashboard" | "Words" | "Profile";

export interface NavigatorItem {
	id: number;
	href: NavigatorItemAddress;
	title: NavigatorItemTitle;
	roles?: Role[];
}
