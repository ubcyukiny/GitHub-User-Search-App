import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import ThemedToaster from "./components/ui/ThemedToaster";
import { ThemeProvider } from "./context/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
        <ThemedToaster />
        <SpeedInsights />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
