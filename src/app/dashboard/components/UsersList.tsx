import { getUsers } from "@/src/lib/users/getUsers";
import UserRoleSelector from "./UserRoleSelector";

export default async function UsersList() {
	const users = await getUsers();

	return (
		<section className="w-full max-w-4xl">
			<h2 className="mb-4 text-xl font-semibold">Users</h2>

			<div className="flex flex-col gap-2">
				{users
					.filter(({ role }) => role !== "SUPER_ADMIN")
					.map(({ id, name, email, role }) => (
						<div key={id} className="flex items-center justify-between rounded-lg border p-4">
							<div>
								<p className="font-medium">{name}</p>

								<p className="text-sm text-gray-500">{email}</p>
							</div>

							{role !== "SUPER_ADMIN" && <UserRoleSelector userId={id} userRole={role} />}
						</div>
					))}
			</div>
		</section>
	);
}
