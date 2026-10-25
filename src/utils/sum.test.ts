import { describe, it, expect } from "vitest";
import { sum } from "./sum";

describe("sum", () => {
	it("adds two positive numbers", () => {
		expect(sum(2, 3)).toBe(5);
	});

	it("handles one negative number", () => {
		expect(sum(-2, 3)).toBe(1);
	});

	it("handles two negative numbers", () => {
		expect(sum(-2, -3)).toBe(-5);
	});

	it("returns zero when both numbers are zero", () => {
		expect(sum(0, 0)).toBe(0);
	});
});
