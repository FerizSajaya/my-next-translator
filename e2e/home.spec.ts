import { features } from "@/src/enums/home.enums";
import { test, expect } from "@playwright/test";

test("home page renders and navigation works", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveURL("/");

	await expect(page.locator("body")).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Translation made simple",
		}),
	).toBeVisible();

	await expect(
		page.getByRole("link", {
			name: "Get started today",
		}),
	).toHaveAttribute("href", "/profile");

	await expect(
		page.getByRole("link", {
			name: "Get started for free",
		}),
	).toHaveAttribute("href", "/words");
});

test("shows Learn more when hovering over each feature card", async ({ page }) => {
	await page.goto("/");

	const featureTitles = features.map(({ title }) => title);

	for (const title of featureTitles) {
		const heading = page.getByRole("heading", {
			name: title,
			exact: true,
		});

		const featureCard = heading.locator("..");

		const learnMore = featureCard.getByText("Learn more", {
			exact: true,
		});

		await expect(learnMore).toHaveCSS("opacity", "0");

		await featureCard.hover();

		await expect(learnMore).toHaveCSS("opacity", "1");
	}
});
