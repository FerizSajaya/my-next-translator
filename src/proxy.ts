import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	const session = request.cookies.get("session")?.value;

	const pathname = request.nextUrl.pathname;

	const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/translations");

	if (isProtectedRoute && !session) return NextResponse.redirect(new URL("/settings", request.url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/translations/:path*"],
};
