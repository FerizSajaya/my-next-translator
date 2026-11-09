import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveProfileTabsProps } from "@/src/types/profile.interface";

export default function ResponsiveProfileTabsSkeleton({ visibleTabs }: ResponsiveProfileTabsProps) {
	return (
		<div className="flex flex-col md:flex-row size-full">
			{/* Tabs Skeleton */}
			<div className="w-full md:w-max md:h-full border-b md:border-b-0 md:border-e border-gray-200">
				<div className="flex flex-row md:flex-col gap-2 p-2">
					{visibleTabs.map(({ id }) => (
						<Skeleton key={id} className="w-20 md:w-28 h-9 rounded-md" />
					))}
				</div>
			</div>

			{/* Profile Content Skeleton */}
			<section className="flex flex-col items-center gap-2 w-full p-2">
				<div className="flex justify-between items-center w-full max-w-md p-4 border rounded-xl border-gray-200 dark:border-gray-500">
					<div className="flex items-center gap-3 min-w-0">
						{/* Avatar */}
						<Skeleton className="shrink-0 size-12 rounded-full" />

						{/* User Info */}
						<div className="flex flex-col gap-2 min-w-0">
							<Skeleton className="w-28 h-4" />

							<Skeleton className="w-40 max-w-full h-3" />
						</div>
					</div>

					{/* Sign Out Button */}
					<Skeleton className="shrink-0 w-20 h-9 rounded-md" />
				</div>
			</section>
		</div>
	);
}
