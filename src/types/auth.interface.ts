import z from "zod";
import { signInSchema, signUpSchema } from "../lib/auth/validation";
import { Role } from "../generated/prisma/enums";

export type AuthMode = "signin" | "signup";

export interface SignInFormProps {
	onSwitch: () => void;
}

export interface SignUpFormProps {
	onSwitch: () => void;
}

export type SignInInput = z.infer<typeof signInSchema>;

export type SignUpInput = z.infer<typeof signUpSchema>;

export interface UserProfileProps {
	user: {
		id: number;
		name: string;
		email: string;
		role: Role;
	};
}

export interface AccessDeniedProps {
	type: "UNAUTHORIZED" | "FORBIDDEN";
}
