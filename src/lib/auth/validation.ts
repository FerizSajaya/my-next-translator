import { z } from "zod";

export const signInSchema = z.object({
	email: z.email("ایمیل معتبر نیست").trim().toLowerCase(),

	password: z.string().min(1, "رمز عبور الزامی است"),
});

export const signUpSchema = z
	.object({
		name: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

		email: z.email("ایمیل معتبر نیست").trim().toLowerCase(),

		password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد").max(100, "رمز عبور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

		confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "تکرار رمز عبور با رمز عبور یکسان نیست",
	});
