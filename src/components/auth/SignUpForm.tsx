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
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpForm({ onSwitch }: SignUpFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
	});

	const password = watch("password");

	const confirmPassword = watch("confirmPassword");

	const { name: nameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError } = errors;

	const { mutate: handleUserSignup, isPending } = useMutation({
		mutationFn: signupUser,
		onSuccess: () => {
			toast.success("Signed up successfully!");

			router.refresh();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to signup!");
		},
	});

	const onSubmit = async (data: SignUpInput) => {
		handleUserSignup(data);
	};

	const handleCancel = () => {
		reset();
		setShowPassword(false);
	};

	return (
		<div className="w-full max-w-md p-6 space-y-6 border rounded-lg">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FieldGroup>
					<FieldLegend className="mx-auto mb-4 font-mono font-bold text-2xl!">Signup</FieldLegend>

					<Field>
						<FieldLabel htmlFor="name" className="font-mono">
							Name
						</FieldLabel>

						<Input id="name" {...register("name")} placeholder="Enter your full name" />

						{nameError && <FieldDescription className="text-xs text-red-500">{nameError.message}</FieldDescription>}
					</Field>

					<Field>
						<FieldLabel htmlFor="email" className="font-mono">
							Email
						</FieldLabel>

						<Input id="email" {...register("email")} placeholder="Enter your email address" />

						{emailError && <FieldDescription className="text-xs text-red-500">{emailError.message}</FieldDescription>}
					</Field>

					<Field className="relative">
						<FieldLabel htmlFor="password" className="font-mono">
							Password
						</FieldLabel>

						<Input
							id="password"
							{...register("password")}
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
							className="w-full p-2 pe-10 border rounded-md"
						/>

						{password && (
							<Button
								variant="ghost"
								type="button"
								size="icon"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute top-6.75 inset-e-0 size-8! text-muted-foreground"
								aria-label={showPassword ? "Hide password" : "Show password"}>
								{showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
							</Button>
						)}

						{passwordError && <FieldDescription className="text-xs text-red-500">{passwordError.message}</FieldDescription>}
					</Field>

					<Field className="relative">
						<FieldLabel htmlFor="confirmPassword" className="font-mono">
							Confirm Password
						</FieldLabel>

						<Input
							id="confirmPassword"
							{...register("confirmPassword")}
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password again"
							className="w-full p-2 pe-10 border rounded-md"
						/>

						{confirmPassword && (
							<Button
								variant="ghost"
								type="button"
								size="icon"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute top-6.75 inset-e-0 size-8! text-muted-foreground"
								aria-label={showPassword ? "Hide confirm password" : "Show confirm password"}>
								{showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
							</Button>
						)}

						{confirmPasswordError && <FieldDescription className="text-xs text-red-500">{confirmPasswordError.message}</FieldDescription>}
					</Field>

					<Field orientation="horizontal" className="mt-4">
						<Button variant="default" type="submit" disabled={isPending}>
							Submit
							{isPending && <LoaderCircleIcon data-icon="inline-end" className="animate-spin" />}
						</Button>

						<Button variant="outline" type="button" onClick={handleCancel}>
							Cancel
						</Button>
					</Field>

					<FieldSeparator />
				</FieldGroup>
			</form>

			<div className="text-center text-sm">
				Already have account?{" "}
				<Button variant="ghost" type="button" onClick={onSwitch} className="p-0 font-medium underline">
					Signin
				</Button>
			</div>
		</div>
	);
}
