import { Role } from "@/src/generated/prisma/client";
import { ReactNode } from "react";

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
