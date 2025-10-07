import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getStorageItem, setStorageItem } from "../utils/localStorage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  bgPalette: string[];
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  bgPalette: ["#f0f0f0", "#1a202c", "#166534"],
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isDark, setIsDark] = useState(false);
  const [bgPalette, setBgPalette] = useState(["#f0f0f0", "#1a202c", "#166534"]);

  const updateDOMTheme = useCallback((newTheme: Theme) => {
    const darkMode = newTheme === "dark";

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }

    setIsDark(darkMode);
    setBgPalette(
      darkMode
        ? ["#2b4539", "#61dca3", "#61b3dc"]
        : ["#f0f0f0", "#1a202c", "#166534"]
    );
  }, []);

  useEffect(() => {
    const result = getStorageItem<Theme>("theme", "light");
    let initialTheme: Theme = "light";

    if (
      result.success &&
      result.data &&
      (result.data === "light" || result.data === "dark")
    ) {
      initialTheme = result.data;
    } else {
      try {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        initialTheme = prefersDark ? "dark" : "light";
      } catch (error) {
        console.warn("Error detecting system theme preference:", error);
        initialTheme = "light";
      }

      if (!result.success) {
        console.warn("Error loading theme from storage:", result.error);
      }
    }

    setTheme(initialTheme);
    updateDOMTheme(initialTheme);
  }, [updateDOMTheme]);
  useEffect(() => {
    updateDOMTheme(theme);

    const result = setStorageItem("theme", theme);
    if (!result.success) {
      console.warn("Error saving theme to localStorage:", result.error);
    }
  }, [theme, updateDOMTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        toggleTheme,
        bgPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
