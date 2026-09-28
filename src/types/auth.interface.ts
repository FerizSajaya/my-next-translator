import z from "zod";
import { signInSchema, signUpSchema } from "../lib/auth/validation";

export type AuthMode = "signin" | "signup";

export interface SignInFormProps {
	onSwitch: () => void;
}

export interface SignUpFormProps {
	onSwitch: () => void;
}

export type SignInInput = z.infer<typeof signInSchema>;

export type SignUpInput = z.infer<typeof signUpSchema>;
