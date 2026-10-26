import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import Error from "./error";

const { mockReplace } = vi.hoisted(() => ({
	mockReplace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		replace: mockReplace,
	}),
}));

const error = new globalThis.Error("Test error");
const reset = vi.fn();

describe("Error", () => {
	const reset = vi.fn();

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		cleanup();
		vi.clearAllTimers();
		vi.useRealTimers();
		vi.clearAllMocks();
	});

	it("renders the error message and retry button", () => {
		render(<Error error={error} reset={reset} />);

		expect(
			screen.getByRole("heading", {
				name: "Something went wrong",
			}),
		).toBeInTheDocument();

		expect(screen.getByText("An unexpected error occurred. You will be redirected to the home page in 10 seconds.")).toBeInTheDocument();

		expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
	});

	it("calls reset when the retry button is clicked", () => {
		render(<Error error={error} reset={reset} />);

		fireEvent.click(screen.getByRole("button", { name: "Try again" }));

		expect(reset).toHaveBeenCalledTimes(1);
		expect(mockReplace).not.toHaveBeenCalled();
	});

	it("redirects to the home page after 10 seconds", () => {
		render(<Error error={error} reset={reset} />);

		act(() => {
			vi.advanceTimersByTime(9_999);
		});

		expect(mockReplace).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(mockReplace).toHaveBeenCalledTimes(1);
		expect(mockReplace).toHaveBeenCalledWith("/");
	});

	it("clears the timeout when the component unmounts", () => {
		const { unmount } = render(<Error error={error} reset={reset} />);

		unmount();

		act(() => {
			vi.advanceTimersByTime(10_000);
		});

		expect(mockReplace).not.toHaveBeenCalled();
	});
});
