"use client";

import { useState } from "react";
import { AuthMode } from "@/src/types/auth.interface";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthForm() {
	const [mode, setMode] = useState<AuthMode>("signin");

	if (mode === "signin") return <SignInForm onSwitch={() => setMode("signup")} />;

	return <SignUpForm onSwitch={() => setMode("signin")} />;
}
