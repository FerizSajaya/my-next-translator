import Navigator from "./Navigator";
import UserProfile from "./UserProfile";

export default function NavigatorWrapper() {
	return (
		<div className="relative flex justify-center md:justify-start items-center w-full h-18 p-3 font-mono border-t md:border-b border-gray-200 dark:border-gray-500">
			<Navigator />

			<UserProfile />
		</div>
	);
}
