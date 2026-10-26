import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
	it("renders the main sections", () => {
		render(<NotFound />);

		expect(screen.getByRole("main")).toBeInTheDocument();

		expect(screen.getByText("404")).toBeInTheDocument();

		expect(
			screen.getByRole("heading", {
				name: "Page not found!",
			}),
		).toBeInTheDocument();

		expect(screen.getByText("The page you are looking for does not exist...")).toBeInTheDocument();
	});

	it("renders the link", () => {
		render(<NotFound />);

		expect(
			screen.getByRole("link", {
				name: "Go to home",
			}),
		).toHaveAttribute("href", "/");
	});
});
