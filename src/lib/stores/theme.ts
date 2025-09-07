import { writable } from "svelte/store";
import { browser } from "$app/environment";

export type Theme = "light" | "dark" | "system";

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>("system");

  return {
    subscribe,
    set,
    toggle: () => {
      update((current) => {
        if (current === "light") return "dark";
        if (current === "dark") return "light";
        return getSystemTheme() === "dark" ? "light" : "dark";
      });
    },
    init: () => {
      if (!browser) return;

      const stored = localStorage.getItem("theme") as Theme;
      if (stored) {
        set(stored);
      }

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", () => {
        update((current) => (current === "system" ? "system" : current));
      });
    },
  };
}

function getSystemTheme(): "light" | "dark" {
  if (!browser) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getResolvedTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

export const theme = createThemeStore();

// Auto-save to localStorage
if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem("theme", value);
    const resolvedTheme = getResolvedTheme(value);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    const favicon = document.getElementById("favicon-svg");
    if (favicon) {
      favicon.setAttribute("href", resolvedTheme === "dark" ? "/icon-dark.svg" : "/icon-light.svg");
    }
  });
}
