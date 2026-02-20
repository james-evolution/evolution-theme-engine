/*
 * ============================================================
 * ThemeSelector.jsx — Evolution Theme Engine
 * ============================================================
 * A standalone, dependency-free <select> dropdown that lets
 * users switch between themes.
 *
 * This component has NO required props — it reads the current
 * theme and setter from ThemeContext via useTheme(). All you
 * need to do is render it anywhere inside a <ThemeProvider>.
 *
 * Props:
 *   themes      (object)  — Map of { label: themeKey } entries
 *                           displayed in the dropdown.
 *                           Defaults to all 5 built-in themes.
 *   className   (string)  — Extra CSS class(es) added to the
 *                           <select> element alongside the
 *                           default 'etn-theme-selector' class.
 *   style       (object)  — Inline styles applied to the select.
 *
 * Usage:
 *   import { ThemeSelector } from 'evolution-theme-engine';
 *
 *   // Standalone — render anywhere inside ThemeProvider:
 *   <ThemeSelector />
 *
 *   // With custom theme list:
 *   <ThemeSelector
 *     themes={{ 'Light': 'light', 'Dark': 'dark', 'Ocean': 'ocean' }}
 *   />
 * ============================================================
 */

import { useTheme } from '../context/ThemeContext.jsx';
import '../styles/themes.css';

/*
 * DEFAULT_THEMES is what shows up in the dropdown when no
 * `themes` prop is passed. Keys are display labels; values
 * are the data-theme attribute strings defined in themes.css.
 */
const DEFAULT_THEMES = {
  'Light Theme':    'light',
  'Dark Theme':     'dark',
  'Forest':         'forest',
  'Tron':           'tron',
  'Midnight':       'midnight',
};

export function ThemeSelector({ themes = DEFAULT_THEMES, className = '', style = {} }) {
  const { theme, setTheme } = useTheme();

  return (
    <select
      className={`etn-theme-selector${className ? ` ${className}` : ''}`}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      aria-label="Select theme"
      style={style}
    >
      {Object.entries(themes).map(([label, value]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
