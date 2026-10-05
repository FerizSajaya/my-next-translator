export type AssignableRole = "USER" | "ADMIN";

export interface UserRoleSelectorProps {
	userId: number;
	userRole: AssignableRole;
}
