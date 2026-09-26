import DesktopNavigator from "./desktop_navigator/DesktopNavigator";
import MobileNavigator from "./mobile_navigator/MobileNavigator";
import UserSettings from "./UserSettings";

export default function Navigator() {
	return (
		<div className="relative flex justify-center md:justify-start items-center w-full h-18 p-3 font-mono border-t md:border-b border-gray-200">
			<MobileNavigator />

			<DesktopNavigator />

			<UserSettings />
		</div>
	);
}
