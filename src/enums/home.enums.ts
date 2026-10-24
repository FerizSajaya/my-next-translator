import { Globe2Icon, LanguagesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";

export const features = [
	{
		icon: LanguagesIcon,
		title: "Accurate Translations",
		description: "Translate words, sentences, and longer texts while keeping the original meaning.",
		color: "bg-indigo-50 text-indigo-600",
	},
	{
		icon: ZapIcon,
		title: "Fast & Effortless",
		description: "Get translations in seconds with a clean and straightforward experience.",
		color: "bg-amber-50 text-amber-600",
	},
	{
		icon: Globe2Icon,
		title: "Multiple Languages",
		description: "Break language barriers and communicate with people around the world.",
		color: "bg-emerald-50 text-emerald-600",
	},
	{
		icon: ShieldCheckIcon,
		title: "Your Workspace",
		description: "Keep your translation workflow organized in one convenient place.",
		color: "bg-violet-50 text-violet-600",
	},
];

export const steps = [
	{
		number: "01",
		title: "Enter your text",
		description: "Type or paste the text you want to translate.",
	},
	{
		number: "02",
		title: "Choose languages",
		description: "Select the source and target languages.",
	},
	{
		number: "03",
		title: "Get your translation",
		description: "View your translated text and continue with ease.",
	},
];
