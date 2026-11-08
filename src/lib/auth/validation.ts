import { z } from "zod";

export const signInSchema = z.object({
	email: z.email("Invalid email address").trim().toLowerCase(),

	password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
	.object({
		name: z.string().trim().min(2, "Name must be at least 2 characters!").max(20, "Name cannot exceed 20 characters!"),

		email: z.email("Invalid email address!").trim().toLowerCase(),

		password: z.string().min(8, "Password must be at least 8 characters!").max(20, "Password cannot exceed 20 characters!"),

		confirmPassword: z.string().min(8, "Please confirm your password!"),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match!",
	});
