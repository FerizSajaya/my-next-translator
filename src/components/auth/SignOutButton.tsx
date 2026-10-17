"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { signoutUser } from "@/src/actions/users/signoutUser";

export default function SignOutButton() {
	const router = useRouter();

	const { mutate: handleSignoutUser, isPending } = useMutation({
		mutationFn: signoutUser,
		onSuccess: () => {
			toast.success("Signed out successfully!");

			router.refresh();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to sign out!");
		},
	});

	return (
		<Button variant="outline" type="button" disabled={isPending} onClick={() => handleSignoutUser()}>
			Sign out
			{isPending && <LoaderCircleIcon data-icon="inline-end" className="animate-spin" />}
		</Button>
	);
}
