"use client";

import { useTransition } from "react";
import { updateUserRole } from "@/src/actions/users";
import { AssignableRole, UserRoleSelectorProps } from "@/src/types/dashboard.interface";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export default function UserRoleSelector({ userId, userRole }: UserRoleSelectorProps) {
	const [isPending, startTransition] = useTransition();

	const isAdmin = userRole === "ADMIN";

	function handleChange(newRole: AssignableRole) {
		startTransition(async () => {
			await updateUserRole(userId, newRole);
		});
	}

	return (
		<ButtonGroup>
			<Button size="sm" variant={isAdmin ? "default" : "secondary"} disabled={isPending} className="cursor-pointer" onClick={() => handleChange("ADMIN")}>
				Admin
			</Button>

			<ButtonGroupSeparator />

			<Button size="sm" variant={!isAdmin ? "default" : "secondary"} disabled={isPending} className="cursor-pointer" onClick={() => handleChange("USER")}>
				User
			</Button>
		</ButtonGroup>
	);
}
