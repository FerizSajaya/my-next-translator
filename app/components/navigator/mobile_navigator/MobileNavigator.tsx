import MobileNavigatorItem from "./MobileNavigatorItem";
import { navigatorItems } from "@/app/enums/navigator.enum";

export default function MobileNavigator() {
	return (
		<div className="flex md:hidden justify-center items-center gap-2 xs:gap-4 sm:gap-6 h-12">
			{navigatorItems.map(({ id, href, title }) => (
				<MobileNavigatorItem key={id} href={href} title={title} />
			))}
		</div>
	);
}
