import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState(getSystemTheme());

  useEffect(() => {
    const handleSystemChange = (e) => {
      if (theme === "system") {
        setResolvedTheme(e.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleSystemChange);

    return () => {
      media.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const sysTheme = getSystemTheme();
      setResolvedTheme(sysTheme);
      document.documentElement.classList.toggle("dark", sysTheme === "dark");
    } else {
      setResolvedTheme(theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
