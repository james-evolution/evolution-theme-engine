"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeNavBar = ThemeNavBar;
var _ThemeSelector = require("./ThemeSelector.js");
require("../styles/themes.css");
var _jsxRuntime = require("react/jsx-runtime");
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

var DEFAULT_LINKS = [{
  label: 'Home',
  href: '#'
}, {
  label: 'About',
  href: '#'
}, {
  label: 'Docs',
  href: '#'
}];
function ThemeNavBar(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'My App' : _ref$title,
    _ref$links = _ref.links,
    links = _ref$links === void 0 ? DEFAULT_LINKS : _ref$links,
    themes = _ref.themes,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("nav", {
    className: "etn-navbar".concat(className ? " ".concat(className) : ''),
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "etn-navbar-brand",
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
      className: "etn-navbar-links",
      children: links.map(function (_ref2) {
        var label = _ref2.label,
          href = _ref2.href;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: href,
            className: "etn-navbar-link",
            children: label
          })
        }, label);
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeSelector.ThemeSelector, {
      themes: themes
    })]
  });
}