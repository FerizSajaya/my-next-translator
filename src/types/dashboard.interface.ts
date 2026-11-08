import { Role } from "@/src/generated/prisma/client";

export type AssignableRole = "USER" | "ADMIN";

export interface UserRoleSelectorProps {
	userId: number;
	userRole: AssignableRole;
}

export interface DashboardTab {
	id: number;
	value: string;
	title: string;
	roles?: Role[];
}
