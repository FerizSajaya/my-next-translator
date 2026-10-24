import { DashboardTab } from "../types/dashboard.interface";

export const dashboardTabs: DashboardTab[] = [
	{
		id: 1,
		value: "words",
		title: "Words",
	},
	{
		id: 2,
		value: "payments",
		title: "Payments",
	},
	{
		id: 3,
		value: "users",
		title: "Users",
		roles: ["SUPER_ADMIN"],
	},
];
