import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { features, steps } from "@/src/enums/home.enums";
import HomePage from "./page";

describe("HomePage", () => {
	it("renders the main sections", () => {
		render(<HomePage />);

		expect(
			screen.getByRole("heading", {
				name: "Translation made simple",
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", {
				name: /endless possibilities/i,
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole("heading", {
				name: "Ready to connect with the world?",
			}),
		).toBeInTheDocument();
	});

	it("renders the main navigation links", () => {
		render(<HomePage />);

		expect(
			screen.getByRole("link", {
				name: /get started today/i,
			}),
		).toHaveAttribute("href", "/profile");

		expect(
			screen.getByRole("link", {
				name: /get started for free/i,
			}),
		).toHaveAttribute("href", "/words");
	});

	it("renders all feature cards", () => {
		render(<HomePage />);

		const featuresSection = document.querySelector("#features");
        
		const stepsSection = document.querySelector("#how-it-works");

		expect(featuresSection?.querySelectorAll("article")).toHaveLength(features.length);

		expect(stepsSection?.querySelectorAll("article")).toHaveLength(steps.length);
	});
});
