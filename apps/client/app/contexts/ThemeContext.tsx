"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the theme types
export type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create the context provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("system");

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        document.getElementsByTagName("body").item(0)!.style.backgroundColor =
          "#171717";
      } else {
        document.documentElement.classList.remove("dark");
        document.getElementsByTagName("body").item(0)!.style.backgroundColor =
          "#ffffff";
      }
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.getElementsByTagName("body").item(0)!.style.backgroundColor =
        "#ffffff";
    } else {
      document.documentElement.classList.add("dark");
      document.getElementsByTagName("body").item(0)!.style.backgroundColor =
        "#171717";
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      toggleTheme(savedTheme as Theme);
    }
  }, []);

  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
