import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center gap-4 size-full p-6 text-center">
			<p className="text-6xl font-bold">404</p>

			<h1 className="text-2xl font-semibold">Page not found</h1>

			<p className="text-sm text-gray-500">The page you are looking for does not exist.</p>

			<Link href="/" className="rounded-md bg-black px-4 py-2 text-sm text-white">
				Go to home
			</Link>
		</main>
	);
}
