import { SignInInput } from "@/src/types/auth.interface";

export async function signinUser(data: SignInInput) {
	const response = await fetch("/api/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();

	if (!response.ok) throw new Error(result.message ?? "Signin failed!");

	return result;
}
