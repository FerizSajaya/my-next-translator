import { ScrollIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function EmptyUsersList() {
	return (
		<section className="w-full max-w-4xl px-2">
			<Alert className="max-w-md">
				<ScrollIcon />

				<AlertTitle>The user list is empty!</AlertTitle>

				<AlertDescription>No user was found, or no user has registered yet.</AlertDescription>
			</Alert>
		</section>
	);
}
