/*
 * ============================================================
 * ThemeNavBar.jsx — Evolution Theme Engine
 * ============================================================
 * An optional, barebones navigation bar with the ThemeSelector
 * component already rendered inside it.
 *
 * This is the "batteries included" option — import ThemeNavBar
 * if you want a ready-made header without wiring up ThemeSelector
 * yourself. Under the hood it simply renders <ThemeSelector />,
 * so everything still flows through ThemeContext.
 *
 * The navbar is intentionally minimal and styled purely via
 * CSS variables (no Bootstrap, no third-party UI libraries).
 * Customize it by passing props or overriding .etn-navbar CSS
 * classes in your own stylesheet.
 *
 * Props:
 *   title       (string)         — Brand/title text shown on the
 *                                  left side of the navbar.
 *                                  Defaults to 'My App'.
 *   links       (Array<object>)  — Navigation links rendered to
 *                                  the right of the title. Each
 *                                  entry: { label, href }.
 *                                  Defaults to a few placeholder
 *                                  links.
 *   themes      (object)         — Forwarded to <ThemeSelector>.
 *                                  Defaults to all 5 built-in themes.
 *   className   (string)         — Extra class(es) added to the
 *                                  root <nav> element alongside
 *                                  'etn-navbar'.
 *   style       (object)         — Inline styles for the root <nav>.
 *
 * Usage:
 *   import { ThemeNavBar } from 'evolution-theme-engine';
 *
 *   <ThemeNavBar
 *     title="My Cool App"
 *     links={[
 *       { label: 'Home',  href: '/' },
 *       { label: 'About', href: '/about' },
 *     ]}
 *   />
 * ============================================================
 */

import { ThemeSelector } from './ThemeSelector.jsx';
import '../styles/themes.css';

const DEFAULT_LINKS = [
  { label: 'Home',  href: '#' },
  { label: 'About', href: '#' },
  { label: 'Docs',  href: '#' },
];

export function ThemeNavBar({
  title = 'My App',
  links = DEFAULT_LINKS,
  themes,
  className = '',
  style = {},
}) {
  return (
    <nav
      className={`etn-navbar${className ? ` ${className}` : ''}`}
      style={style}
    >
      {/* Left side: brand/title */}
      <span className="etn-navbar-brand">{title}</span>

      {/* Center: navigation links */}
      <ul className="etn-navbar-links">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="etn-navbar-link">
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: ThemeSelector dropdown */}
      <ThemeSelector themes={themes} />
    </nav>
  );
}
