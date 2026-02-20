"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THEMES = void 0;
exports.ThemeProvider = ThemeProvider;
exports.registerTheme = registerTheme;
exports.useTheme = useTheme;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /*
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
 */ /*
 * THEMES maps a friendly JS key to the exact string written
 * into the HTML `data-theme` attribute. Add an entry here and
 * a matching [data-theme="..."] block in themes.css to create
 * a new built-in theme.
 */
var THEMES = exports.THEMES = {
  light: 'light',
  dark: 'dark',
  forest: 'forest',
  tron: 'tron',
  midnight: 'midnight'
};
var ThemeContext = /*#__PURE__*/(0, _react.createContext)({
  theme: THEMES.light,
  setTheme: function setTheme() {}
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
function ThemeProvider(_ref) {
  var children = _ref.children,
    _ref$defaultTheme = _ref.defaultTheme,
    defaultTheme = _ref$defaultTheme === void 0 ? THEMES.light : _ref$defaultTheme,
    _ref$storageKey = _ref.storageKey,
    storageKey = _ref$storageKey === void 0 ? 'etn-theme' : _ref$storageKey;
  var _useState = (0, _react.useState)(function () {
      return localStorage.getItem(storageKey) || defaultTheme;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    theme = _useState2[0],
    setThemeState = _useState2[1];

  /*
   * Sync the `data-theme` attribute on <html> whenever theme changes.
   * This is what triggers the CSS variable overrides in themes.css.
   */
  (0, _react.useEffect)(function () {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /*
   * setTheme updates React state AND persists to localStorage so
   * the selection survives page refreshes and new tabs.
   */
  var setTheme = function setTheme(newTheme) {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ThemeContext.Provider, {
    value: {
      theme: theme,
      setTheme: setTheme
    },
    children: children
  });
}

/*
 * useTheme — convenience hook.
 * Returns { theme, setTheme } from the nearest ThemeProvider.
 * Must be called inside a component that is a descendant of ThemeProvider.
 */
function useTheme() {
  return (0, _react.useContext)(ThemeContext);
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
function registerTheme(name, vars) {
  var existingId = "etn-theme-".concat(name);
  var existing = document.getElementById(existingId);
  if (existing) existing.remove();
  var declarations = Object.entries(vars).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    return "  --".concat(key, ": ").concat(value, ";");
  }).join('\n');
  var css = "[data-theme=\"".concat(name, "\"] {\n").concat(declarations, "\n}");
  var styleEl = document.createElement('style');
  styleEl.id = existingId;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
}