import { getUsers } from "@/src/lib/users/getUsers";
import UserRoleSelector from "./UserRoleSelector";

export default async function UsersList() {
	const users = await getUsers();

	return (
		<section className="flex flex-col gap-2 w-full max-w-4xl px-2">
			{users.map(({ id, name, email, role }) => (
				<div key={id} className="flex items-center justify-between rounded-lg border p-4">
					<div>
						<p className="font-medium">{name}</p>

						<p className="text-sm text-gray-500">{email}</p>
					</div>

					{role !== "SUPER_ADMIN" && <UserRoleSelector userId={id} userRole={role} />}
				</div>
			))}
		</section>
	);
}
