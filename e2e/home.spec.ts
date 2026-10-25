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
			name: /get started today/i,
		}),
	).toHaveAttribute("href", "/profile");

	await expect(
		page.getByRole("link", {
			name: /get started for free/i,
		}),
	).toHaveAttribute("href", "/words");
});
