"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorProps } from "../types/root.interface";

export default function Error({ reset }: ErrorProps) {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.replace("/");
		}, 10_000);

		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<main className="flex flex-col items-center justify-center gap-4 size-full p-6 text-center">
			<h1 className="text-2xl font-semibold">Something went wrong</h1>

			<p className="text-sm text-gray-500">An unexpected error occurred. You will be redirected to the home page in 10 seconds.</p>

			<button type="button" onClick={() => reset()} className="rounded-md bg-black px-4 py-2 text-sm text-white">
				Try again
			</button>
		</main>
	);
}
