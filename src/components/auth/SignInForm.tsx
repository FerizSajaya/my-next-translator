"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/lib/auth/validation";
import { SignInFormProps, SignInInput } from "@/src/types/auth.interface";

export default function SignInForm({ onSwitch }: SignInFormProps) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit = async (data: SignInInput) => {
		try {
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error(result);
				return;
			}

			console.log("Sign in successful:", result);

			router.refresh();
		} catch (error) {
			console.error("Sign in request failed:", error);
		}
	};

	return (
		<div className="w-full max-w-md space-y-6 rounded-xl border p-6">
			<div>
				<h1 className="text-2xl font-bold">Signin</h1>

				<p className="mt-2 text-sm text-muted-foreground">Fill the form to signin your account!</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="email">E-mail</label>

					<input id="email" type="email" {...register("email")} className="mt-1 w-full rounded-md border p-2" />

					{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
				</div>

				<div>
					<label htmlFor="password">Password</label>

					<input id="password" type="password" {...register("password")} className="mt-1 w-full rounded-md border p-2" />

					{errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
				</div>

				<button type="submit" disabled={isSubmitting} className="w-full rounded-md border p-2">
					{isSubmitting ? "Please wait..." : "Submit"}
				</button>
			</form>

			<div className="text-center text-sm">
				Don't have account?{" "}
				<button type="button" onClick={onSwitch} className="font-medium underline">
					Signup
				</button>
			</div>
		</div>
	);
}
