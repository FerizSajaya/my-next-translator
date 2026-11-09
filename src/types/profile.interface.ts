import { ReactNode } from "react";
import { Role } from "@/src/generated/prisma/client";

export interface ProfileTab {
	id: number;
	value: string;
	title: string;
	roles?: Role[];
}

export interface ResponsiveProfileTabsProps {
	visibleTabs: ProfileTab[];
	children?: ReactNode;
}
