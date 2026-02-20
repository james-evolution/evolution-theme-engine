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
 *   titleHref   (string)         — If provided, wraps the brand
 *                                  text in a link pointing to this
 *                                  URL. Omit to render a plain <span>.
 *   links       (Array<object>)  — Navigation links rendered to
 *                                  the right of the title. Each
 *                                  entry: { label, href, onClick? }.
 *                                  If onClick is provided, the default
 *                                  browser navigation is prevented and
 *                                  onClick is called instead — use this
 *                                  for programmatic SPA navigation.
 *                                  Defaults to a few placeholder links.
 *   renderLink  (function)       — Optional render prop for full
 *                                  control over link rendering. Useful
 *                                  for React Router: pass a function
 *                                  ({ href, children, className }) =>
 *                                  ReactNode and return a <Link>
 *                                  component. Applied to both the
 *                                  title link and all nav links.
 *   themes      (object)         — Forwarded to <ThemeSelector>.
 *                                  Defaults to all 5 built-in themes.
 *   className   (string)         — Extra class(es) added to the
 *                                  root <nav> element alongside
 *                                  'etn-navbar'.
 *   style       (object)         — Inline styles for the root <nav>.
 *
 * Usage — plain HTML (multi-page app):
 *   <ThemeNavBar
 *     title="My Cool App"
 *     titleHref="/"
 *     links={[
 *       { label: 'Home',  href: '/' },
 *       { label: 'About', href: '/about' },
 *     ]}
 *   />
 *
 * Usage — React Router (SPA, no page refreshes):
 *   import { Link } from 'react-router-dom';
 *
 *   <ThemeNavBar
 *     title="My Cool App"
 *     titleHref="/"
 *     links={[
 *       { label: 'Home',  href: '/' },
 *       { label: 'About', href: '/about' },
 *     ]}
 *     renderLink={(props) => (
 *       <Link to={props.href} className={props.className}>{props.children}</Link>
 *     )}
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
  titleHref,
  links = DEFAULT_LINKS,
  themes,
  className = '',
  style = {},
  renderLink,
}) {
  return (
    <nav
      className={`etn-navbar${className ? ` ${className}` : ''}`}
      style={style}
    >
      {/* Left side: brand/title — link if titleHref is set, plain span otherwise */}
      {titleHref ? (
        renderLink ? (
          renderLink({ href: titleHref, children: title, className: 'etn-navbar-brand' })
        ) : (
          <a href={titleHref} className="etn-navbar-brand">{title}</a>
        )
      ) : (
        <span className="etn-navbar-brand">{title}</span>
      )}

      {/* Center: navigation links */}
      <ul className="etn-navbar-links">
        {links.map(({ label, href, onClick }) => (
          <li key={label}>
            {renderLink ? (
              renderLink({ href, children: label, className: 'etn-navbar-link' })
            ) : (
              <a
                href={href}
                className="etn-navbar-link"
                onClick={onClick ? (e) => { e.preventDefault(); onClick(e); } : undefined}
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Right side: ThemeSelector dropdown */}
      <ThemeSelector themes={themes} />
    </nav>
  );
}
