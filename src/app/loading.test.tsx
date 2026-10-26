import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading", () => {
	it("renders the loading message", () => {
		render(<Loading />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders the main landmark", () => {
		render(<Loading />);

		expect(screen.getByRole("main")).toBeInTheDocument();
	});

	it("renders the spinner with the correct classes", () => {
		const { container } = render(<Loading />);

		const spinner = container.querySelector(".animate-spin");

		expect(spinner).toBeInTheDocument();
	});
});
