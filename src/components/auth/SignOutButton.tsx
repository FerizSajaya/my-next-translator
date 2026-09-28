"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			setIsLoading(true);

			const response = await fetch("/api/auth/signout", { method: "POST" });

			if (!response.ok) throw new Error("Failed to sign out.");

			router.refresh();
		} catch (error) {
			console.error("Sign out error:", error);

			setIsLoading(false);
		}
	};

	return (
		<button type="button" onClick={handleSignOut} disabled={isLoading} className="rounded-md border px-3 py-2 text-sm">
			{isLoading ? "Signing out..." : "Sign out"}
		</button>
	);
}
