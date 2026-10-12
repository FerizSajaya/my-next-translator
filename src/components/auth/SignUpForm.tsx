"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/src/lib/auth/validation";
import { SignUpFormProps, SignUpInput } from "@/src/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/src/lib/users/signupUser";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignUpForm({ onSwitch }: SignUpFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
	});

	const { name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError } = errors;

	const { mutate: handleUserSignup, isPending } = useMutation({
		mutationFn: signupUser,
		onSuccess: () => {
			toast.success("User signup successfully!");

			router.refresh();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to signup user!");
		},
	});

	const onSubmit = async (data: SignUpInput) => {
		handleUserSignup(data);
	};

	return (
		<div className="w-full max-w-md p-6 space-y-6 border rounded-xl">
			<div>
				<h1 className="text-2xl font-bold">Signup</h1>

				<p className="mt-2 text-sm text-muted-foreground">Fill the form to have a new account!</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="name">Name</label>

					<input id="name" {...register("name")} className="w-full mt-1 p-2 border rounded-md" />

					{nameError && <p className="mt-1 text-sm text-red-500">{nameError.message}</p>}
				</div>

				<div>
					<label htmlFor="email">Email</label>

					<input id="email" type="email" {...register("email")} className="w-full mt-1 p-2 border rounded-md" />

					{emailError && <p className="mt-1 text-sm text-red-500">{emailError.message}</p>}
				</div>

				<div>
					<label htmlFor="password">Password</label>

					<div className="relative mt-1">
						<input id="password" type={showPassword ? "text" : "password"} {...register("password")} className="w-full p-2 pe-10 border rounded-md" />

						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute top-1/2 -translate-y-1/2 inset-e-2 text-muted-foreground"
							aria-label={showPassword ? "Hide password" : "Show password"}>
							{showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
						</button>
					</div>

					{passwordError && <p className="mt-1 text-sm text-red-500">{passwordError.message}</p>}
				</div>

				<div>
					<label htmlFor="confirmPassword">Confirm password</label>

					<div className="relative mt-1">
						<input id="confirmPassword" type={showPassword ? "text" : "password"} {...register("confirmPassword")} className="w-full p-2 pe-10 border rounded-md" />

						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute top-1/2 -translate-y-1/2 inset-e-2 text-muted-foreground"
							aria-label={showPassword ? "Hide confirm password" : "Show confirm password"}>
							{showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
						</button>
					</div>

					{confirmPasswordError && <p className="mt-1 text-sm text-red-500">{confirmPasswordError.message}</p>}
				</div>

				<button type="submit" disabled={isPending} className="w-full p-2 border rounded-md">
					{isPending ? "Please wait..." : "Submit"}
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
