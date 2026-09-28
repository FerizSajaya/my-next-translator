import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Geist } from "next/font/google";
import { cn } from "cn";
import NavigatorWrapper from "../components/navigator/NavigatorWrapper";
import { Toaster } from "sonner";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const roboto = Roboto({
	variable: "--font-roboto-sans",
	subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Translator",
		description: "A modern translation application",
	};
}

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" dir="ltr" className={cn("antialiased", geist.variable, roboto.variable, roboto_mono.variable, "font-sans")}>
			<body className="flex flex-col md:flex-col-reverse w-screen h-screen overflow-hidden">
				{children}

				<Toaster position="top-center" richColors closeButton />

				<NavigatorWrapper />
			</body>
		</html>
	);
}
