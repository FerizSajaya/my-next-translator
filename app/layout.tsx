import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import Navigator from "./components/Navigator";

import "./globals.css";

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
		<html lang="en" dir="ltr" className={`${roboto.variable} ${roboto_mono.variable} antialiased`}>
			<body className="flex flex-col md:flex-col-reverse w-screen h-screen overflow-hidden">
				{children}

				<Navigator />
			</body>
		</html>
	);
}
