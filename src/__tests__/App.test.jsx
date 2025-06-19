import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import App from "../App";

// Mock ResizeObserver globally
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Mock matchMedia globally
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  };

describe("App", () => {
  test("renders GitHub Profile Visualizer layout", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/User Overview/i)).toBeInTheDocument();
  });
});
