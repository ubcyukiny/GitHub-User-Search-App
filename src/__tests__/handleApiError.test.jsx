import { vi } from "vitest";
import toast from "react-hot-toast";
import handleApiError from "../utils/handleApiError";

describe("handleApiError", () => {
  it("should call toast.error with the given fallback message", () => {
    const spy = vi.spyOn(toast, "error");
    handleApiError(
      new Error("Something went wrong"),
      "Fallback message",
      "123",
    );
    expect(spy).toHaveBeenCalledWith(
      "Network error. Please check your connection.",
      expect.objectContaining({ id: "123" }),
    );
  });
});
