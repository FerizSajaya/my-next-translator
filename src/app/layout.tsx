import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Geist } from "next/font/google";
import { cn } from "cn";
import NavigatorWrapper from "@/src/components/navigator/NavigatorWrapper";
import { Toaster } from "sonner";
import QueryProvider from "@/src/providers/QueryProvider";
import { ThemeProvider } from "@/src/components/ThemeProvider";

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
			<body className="w-screen h-screen pb-18 md:pb-0 md:pt-18 overflow-x-hidden cursor-default">
				<QueryProvider>
					<ThemeProvider>
						{children}

						<Toaster position="top-center" richColors closeButton />

						<NavigatorWrapper />
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
