"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ThemeSwitch() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";

	return (
		<div className="flex justify-between items-center w-full">
			<h4 className="text-base font-semibold">{`Theme (${resolvedTheme})`}</h4>

			<div className="flex items-center gap-3">
				<SunIcon size={20} className="text-muted-foreground" />

				<Switch id="theme-switch" checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} aria-label="Toggle dark mode" />

				<MoonIcon size={20} className="text-muted-foreground" />
			</div>
		</div>
	);
}
