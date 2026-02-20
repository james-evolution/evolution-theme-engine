"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSelector = ThemeSelector;
var _ThemeContext = require("../context/ThemeContext.js");
require("../styles/themes.css");
var _jsxRuntime = require("react/jsx-runtime");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /*
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
 */ /*
 * DEFAULT_THEMES is what shows up in the dropdown when no
 * `themes` prop is passed. Keys are display labels; values
 * are the data-theme attribute strings defined in themes.css.
 */
var DEFAULT_THEMES = {
  'Light Theme': 'light',
  'Dark Theme': 'dark',
  'Forest': 'forest',
  'Tron': 'tron',
  'Midnight': 'midnight'
};
function ThemeSelector(_ref) {
  var _ref$themes = _ref.themes,
    themes = _ref$themes === void 0 ? DEFAULT_THEMES : _ref$themes,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  var _useTheme = (0, _ThemeContext.useTheme)(),
    theme = _useTheme.theme,
    setTheme = _useTheme.setTheme;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("select", {
    className: "etn-theme-selector".concat(className ? " ".concat(className) : ''),
    value: theme,
    onChange: function onChange(e) {
      return setTheme(e.target.value);
    },
    "aria-label": "Select theme",
    style: style,
    children: Object.entries(themes).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        label = _ref3[0],
        value = _ref3[1];
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
        value: value,
        children: label
      }, value);
    })
  });
}