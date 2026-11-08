"use server";

import { deleteSession } from "@/src/lib/auth/session";

export async function signoutUser() {
	try {
		await deleteSession();

		return {
			success: true,
			message: "Signed out successfully!",
		};
	} catch (error) {
		console.error("Sign out error: ", error);

		throw new Error("Something went wrong... Please try again!");
	}
}
