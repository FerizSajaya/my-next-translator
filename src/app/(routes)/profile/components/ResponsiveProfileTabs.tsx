"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveProfileTabsProps } from "@/src/types/profile.interface";
import ResponsiveProfileTabsSkeleton from "./ResponsiveProfileTabsSkeleton";

export default function ResponsiveProfileTabs({ visibleTabs, children }: ResponsiveProfileTabsProps) {
	const [orientation, setOrientation] = useState<"horizontal" | "vertical" | null>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");

		const updateOrientation = () => {
			setOrientation(mediaQuery.matches ? "vertical" : "horizontal");
		};

		updateOrientation();

		mediaQuery.addEventListener("change", updateOrientation);

		return () => {
			mediaQuery.removeEventListener("change", updateOrientation);
		};
	}, []);

	if (!orientation) return <ResponsiveProfileTabsSkeleton visibleTabs={visibleTabs} />;

	return (
		<Tabs defaultValue="account" orientation={orientation} className="size-full gap-0">
			<div className="w-full md:w-max md:h-full md:p-3 md:pe-0 border-b md:border-b-0 md:border-e border-gray-200">
				<TabsList variant="line" className="w-full md:w-max gap-2">
					{visibleTabs.map(({ id, value, title }) => (
						<TabsTrigger key={id} value={value} className="pe-3 cursor-pointer">
							{title}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			{children}
		</Tabs>
	);
}
