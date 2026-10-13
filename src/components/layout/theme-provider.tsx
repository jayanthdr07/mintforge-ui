"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.dataset.theme = theme;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
  root.style.colorScheme = theme;
}

function getThemeSnapshot(): Theme {
  try {
    const saved = window.localStorage.getItem("mintforge-theme");
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

function subscribeTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleStorage = (e: StorageEvent) => {
    if (e.key === "mintforge-theme") {
      callback();
    }
  };

  const handleMedia = () => {
    try {
      if (!window.localStorage.getItem("mintforge-theme")) {
        callback();
      }
    } catch {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("mintforge-theme-change", callback);
  mediaQuery.addEventListener("change", handleMedia);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("mintforge-theme-change", callback);
    mediaQuery.removeEventListener("change", handleMedia);
  };
}

const noopSubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      window.localStorage.setItem("mintforge-theme", newTheme);
    } catch {
      // ignore
    }
    applyTheme(newTheme);
    window.dispatchEvent(new Event("mintforge-theme-change"));
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}