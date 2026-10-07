"use client";

import { useState } from "react";
import { AuthMode } from "@/src/types/auth.interface";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
	const [mode, setMode] = useState<AuthMode>("signin");

	return (
		<section className="w-full max-w-4xl px-2">
			{mode === "signin" ? <SignInForm onSwitch={() => setMode("signup")} /> : <SignUpForm onSwitch={() => setMode("signin")} />}
		</section>
	);
}
