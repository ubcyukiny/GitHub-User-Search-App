import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/ui/SearchBar";
import { describe, it, expect, vi } from "vitest";

describe("SearchBar", () => {
  it("calls onSearch with valid username", () => {
    const mockSearch = vi.fn();
    render(
      <SearchBar
        onSearch={mockSearch}
        error={null}
        setError={() => {}}
        inputValue={"ken123"}
        setInputValue={() => {}}
      />,
    );

    fireEvent.click(screen.getByText(/search/i));
    expect(mockSearch).toHaveBeenCalledWith("ken123");
  });
});
