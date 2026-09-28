"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccessDeniedProps } from "@/src/types/auth.interface";
import { toast } from "sonner";

export default function AccessDenied({ type }: AccessDeniedProps) {
	const router = useRouter();

	useEffect(() => {
		if (type === "UNAUTHORIZED") {
			toast.error("Authentication required.", {
				description: "Please sign in to access this page.",
			});
		} else {
			toast.error("Access denied.", {
				description: "You do not have permission to access this page.",
			});
		}

		const timeout = setTimeout(() => {
			router.replace("/");
		}, 800);

		return () => clearTimeout(timeout);
	}, [type, router]);

	return null;
}
