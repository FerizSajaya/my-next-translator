"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/src/lib/auth/validation";
import { SignUpFormProps, SignUpInput } from "@/src/types/auth.interface";

export default function SignUpForm({ onSwitch }: SignUpFormProps) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (data: SignUpInput) => {
		try {
			const response = await fetch("/api/auth/signup", {
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

			console.log("Signup successful:", result);

			router.refresh();
		} catch (error) {
			console.error("Signup request failed:", error);
		}
	};

	return (
		<div className="w-full max-w-md space-y-6 rounded-xl border p-6">
			<div>
				<h1 className="text-2xl font-bold">Signup</h1>

				<p className="mt-2 text-sm text-muted-foreground">Fill the form to signup a new account!</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="name">Name</label>

					<input id="name" {...register("name")} className="mt-1 w-full rounded-md border p-2" />

					{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
				</div>

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

				<div>
					<label htmlFor="confirmPassword">Confirm password</label>

					<input id="confirmPassword" type="password" {...register("confirmPassword")} className="mt-1 w-full rounded-md border p-2" />

					{errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
				</div>

				<button type="submit" disabled={isSubmitting} className="w-full rounded-md border p-2">
					{isSubmitting ? "Please wait..." : "Submit"}
				</button>
			</form>

			<div className="text-center text-sm">
				Already have account?{" "}
				<button type="button" onClick={onSwitch} className="font-medium underline">
					Signin
				</button>
			</div>
		</div>
	);
}
