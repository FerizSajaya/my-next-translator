import { getCurrentUser } from "@/src/lib/auth/session";
import { navigatorItems } from "@/src/enums/navigator.enum";
import MobileNavigatorItem from "./MobileNavigatorItem";

export default async function MobileNavigator() {
	const user = await getCurrentUser();

	const visibleNavigatorItems = navigatorItems.filter(({ roles }) => {
		if (!roles) return true;

		return user ? roles.includes(user.role) : false;
	});

	return (
		<div className="hidden md:flex justify-center items-center gap-4 h-12 rounded-full bg-gray-100">
			{visibleNavigatorItems.map(({ id, href, title }) => (
				<MobileNavigatorItem key={id} href={href} title={title} />
			))}
		</div>
	);
}
