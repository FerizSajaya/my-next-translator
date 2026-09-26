import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Geist } from "next/font/google";
import NavigatorWrapper from "./components/navigator/NavigatorWrapper";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
		<html lang="en" dir="ltr" className={cn("antialiased", roboto.variable, roboto_mono.variable, "font-sans", geist.variable)}>
			<body className="flex flex-col md:flex-col-reverse w-screen h-screen overflow-hidden">
				{children}

				<NavigatorWrapper />
			</body>
		</html>
	);
}
