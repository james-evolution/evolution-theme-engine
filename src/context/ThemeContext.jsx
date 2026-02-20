/*
 * ============================================================
 * ThemeContext.jsx — Evolution Theme Engine
 * ============================================================
 * This file is the heart of the theme engine. It provides:
 *
 *   THEMES           — A map of human-readable keys to the exact
 *                      string values used as the `data-theme`
 *                      attribute on <html>. These strings must
 *                      match selectors in themes.css exactly.
 *
 *   ThemeProvider    — A React context provider that:
 *                      • Reads the persisted theme from localStorage
 *                        on first render (no flash on reload).
 *                      • Sets `data-theme` on <html> whenever the
 *                        theme changes so CSS kicks in site-wide.
 *                      • Exposes `theme` and `setTheme` to all
 *                        descendant components via context.
 *
 *   useTheme         — Convenience hook. Call inside any component
 *                      wrapped by ThemeProvider to read or change
 *                      the active theme.
 *
 *   registerTheme    — Runtime utility. Injects a new [data-theme]
 *                      CSS block at runtime so consumers can add
 *                      custom themes without editing themes.css.
 *
 * Data flow:
 *   User picks theme → setTheme() → React state updates
 *   → useEffect fires → data-theme attribute set on <html>
 *   → CSS [data-theme="..."] block takes effect site-wide.
 * ============================================================
 */

import { createContext, useContext, useState, useEffect } from 'react';

/*
 * THEMES maps a friendly JS key to the exact string written
 * into the HTML `data-theme` attribute. Add an entry here and
 * a matching [data-theme="..."] block in themes.css to create
 * a new built-in theme.
 */
export const THEMES = {
  light:    'light',
  dark:     'dark',
  forest:   'forest',
  tron:     'tron',
  midnight: 'midnight',
};

const ThemeContext = createContext({
  theme: THEMES.light,
  setTheme: () => {},
});

/*
 * ThemeProvider wraps your application root (e.g. in index.jsx).
 *
 * It reads the user's last-saved theme from localStorage so the
 * correct theme is applied before the first paint, preventing a
 * flash back to the default Light theme on page refresh.
 *
 * Props:
 *   children        — React subtree to receive theme context.
 *   defaultTheme    — (optional) Override the fallback when no
 *                     localStorage value exists. Defaults to 'light'.
 *   storageKey      — (optional) localStorage key used to persist
 *                     the selected theme. Defaults to 'etn-theme'.
 */
export function ThemeProvider({
  children,
  defaultTheme = THEMES.light,
  storageKey = 'etn-theme',
}) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  /*
   * Sync the `data-theme` attribute on <html> whenever theme changes.
   * This is what triggers the CSS variable overrides in themes.css.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /*
   * setTheme updates React state AND persists to localStorage so
   * the selection survives page refreshes and new tabs.
   */
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/*
 * useTheme — convenience hook.
 * Returns { theme, setTheme } from the nearest ThemeProvider.
 * Must be called inside a component that is a descendant of ThemeProvider.
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/*
 * registerTheme — runtime theme registration.
 *
 * Dynamically injects a new [data-theme="name"] CSS block into the
 * document <head> at runtime. This lets consumers define custom themes
 * in JavaScript without modifying themes.css.
 *
 * Parameters:
 *   name  (string)  — The theme key, e.g. 'ocean'. This value is used
 *                     as the data-theme attribute value.
 *   vars  (object)  — A plain object mapping CSS variable names to values.
 *                     Keys should NOT include the leading '--'.
 *
 * Example:
 *   registerTheme('ocean', {
 *     'color-bg':          '#0a1628',
 *     'color-text':        '#e0f0ff',
 *     'color-primary':     '#00b4d8',
 *     'color-on-primary':  '#0a1628',
 *     'color-card-bg':     '#0d2137',
 *     'color-card-border': '#1a3a5c',
 *     'color-divider':     '#1a3a5c',
 *     'color-link':        '#90e0ef',
 *     'color-hover-bg':    'rgba(0,180,216,0.1)',
 *     'color-code-bg':     '#070f1a',
 *     'color-code-text':   '#e0f0ff',
 *   });
 *
 * After calling registerTheme, add the key to your own THEMES-like object
 * and pass it to <ThemeSelector> via the `themes` prop to surface it in
 * the UI.
 */
export function registerTheme(name, vars) {
  const existingId = `etn-theme-${name}`;
  const existing = document.getElementById(existingId);
  if (existing) existing.remove();

  const declarations = Object.entries(vars)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  const css = `[data-theme="${name}"] {\n${declarations}\n}`;

  const styleEl = document.createElement('style');
  styleEl.id = existingId;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}
