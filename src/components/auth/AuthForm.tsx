"use client";

import { useState } from "react";
import { AuthMode } from "@/src/types/auth.interface";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
	const [mode, setMode] = useState<AuthMode>("signin");

	return (
		<section className="flex justify-center items-center size-full p-2">
			{mode === "signin" ? <SignInForm onSwitch={() => setMode("signup")} /> : <SignUpForm onSwitch={() => setMode("signin")} />}
		</section>
	);
}
