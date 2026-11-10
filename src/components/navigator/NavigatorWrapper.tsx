import Navigator from "./Navigator";
import UserProfile from "./UserProfile";

export default function NavigatorWrapper() {
	return (
		<div className="fixed bottom-0 md:top-0 left-0 right-0 flex justify-center md:justify-start items-center w-full h-18 md:px-2 font-mono border-t md:border-b border-gray-200 dark:border-gray-500 bg-zinc-100 shadow-md z-999">
			<Navigator />

			<UserProfile />
		</div>
	);
}
