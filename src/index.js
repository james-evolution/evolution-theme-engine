/*
 * ============================================================
 * index.js — Evolution Theme Engine public API
 * ============================================================
 * Re-exports every symbol that consumers are expected to use.
 * Import from 'evolution-theme-engine', never from internal paths.
 *
 * Named exports:
 *   ThemeProvider   — Wrap your app root with this.
 *   useTheme        — Hook: { theme, setTheme } from context.
 *   THEMES          — Map of built-in theme keys to data-theme values.
 *   registerTheme   — Runtime: inject a custom theme at run-time.
 *   ThemeSelector   — Standalone <select> dropdown component.
 *   ThemeNavBar     — Barebones navbar with ThemeSelector built in.
 * ============================================================
 */

export { ThemeProvider, useTheme, THEMES, registerTheme } from './context/ThemeContext.jsx';
export { ThemeSelector } from './components/ThemeSelector.jsx';
export { ThemeNavBar } from './components/ThemeNavBar.jsx';
