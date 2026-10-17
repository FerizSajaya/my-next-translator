"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/lib/auth/validation";
import { SignInFormProps, SignInInput } from "@/src/types/auth.interface";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signinUser } from "@/src/lib/users/signinUser";

export default function SignInForm({ onSwitch }: SignInFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
	});

	const password = watch("password");

	const { email: emailError, password: passwordError } = errors;

	const { mutate: handleSigninUser, isPending } = useMutation({
		mutationFn: signinUser,
		onSuccess: () => {
			toast.success("Signed in successfully!");

			router.refresh();
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to signin!");
		},
	});

	const onSubmit = async (data: SignInInput) => {
		handleSigninUser(data);
	};

	const handleCancel = () => {
		reset();
		setShowPassword(false);
	};

	return (
		<div className="w-full max-w-md p-6 space-y-6 border rounded-lg">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<FieldGroup>
					<FieldLegend className="mx-auto mb-4 font-mono font-bold text-2xl!">Signin</FieldLegend>

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
				Don't have account?{" "}
				<Button variant="ghost" type="button" onClick={onSwitch} className="p-0 font-medium underline">
					Signup
				</Button>
			</div>
		</div>
	);
}
