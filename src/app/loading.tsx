export default function Loading() {
	return (
		<main className="flex items-center justify-center size-full">
			<div className="flex flex-col items-center gap-3">
				<div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

				<p className="text-sm text-gray-500">Loading...</p>
			</div>
		</main>
	);
}
