import { Toaster } from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const ThemedToaster = () => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? "#1f2937" : "#f9fafb", // neutral-800 / gray-50
          color: isDark ? "#ffffff" : "#111827", // white / gray-900
          border: isDark ? "1px solid #374151" : "1px solid #e5e7eb", // gray-700 / gray-200
        },
      }}
    />
  );
};

export default ThemedToaster;
