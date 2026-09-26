import { navigatorItems } from "@/src/enums/navigator.enum";
import DesktopNavigatorItem from "./DesktopNavigatorItem";

export default function DesktopNavigator() {
	return (
		<div className="hidden md:flex justify-center items-center gap-4 h-12 rounded-full bg-gray-100">
			{navigatorItems.map(({ id, href, title }) => (
				<DesktopNavigatorItem key={id} href={href} title={title} />
			))}
		</div>
	);
}
