import type { SignUpInput } from "@/src/types/auth.interface";

export async function signupUser(data: SignUpInput) {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (!response.ok) throw new Error(result.message ?? "Signup failed!");

	return result;
}
