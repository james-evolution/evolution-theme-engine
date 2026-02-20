# Evolution Theme Engine

A plug-and-play React theme engine built on CSS custom properties. It ships with five polished built-in themes, a standalone theme-selector dropdown, and an optional barebones navbar — all wired together through React Context with automatic `localStorage` persistence.

## Features

- **Five built-in themes** — Light, Dark, Forest, Tron, Midnight
- **CSS variable-based** — every color in your UI traces back to a single `--color-*` variable, so a theme change affects the entire page instantly
- **localStorage persistence** — the user's chosen theme survives page refreshes and new tabs automatically
- **No flash on reload** — the theme is applied before the first paint by setting `data-theme` on `<html>` at initialisation
- **Two integration options** — use the standalone `ThemeSelector` dropdown wherever you like, or drop in `ThemeNavBar` for a ready-made header with the selector already inside
- **Runtime theme registration** — call `registerTheme()` to inject a custom theme at runtime without editing any CSS files
- **Zero UI-framework dependency** — no Bootstrap, no MUI, no Tailwind required

---

## Installation

```bash
npm install @evolution-james/evolution-theme-engine
```

> **Peer dependencies:** React 17+ and ReactDOM 17+ must already be installed in your project.

---

## Quick Start

### 1. Wrap your app with `ThemeProvider`

`ThemeProvider` is the context source. Everything else in this package must be rendered inside it.

```jsx
// src/index.jsx (or src/main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@evolution-james/evolution-theme-engine';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

### 2. Choose your integration style

---

## Integration Option A — Standalone `ThemeSelector`

Use this when you already have your own navbar or header and just want to drop the theme-switcher inside it.

```jsx
import { ThemeSelector } from '@evolution-james/evolution-theme-engine';

function MyHeader() {
  return (
    <header>
      <span>My App</span>
      {/* Render the selector wherever you like */}
      <ThemeSelector />
    </header>
  );
}
```

`ThemeSelector` reads and writes the theme through context — you don't pass anything to it unless you want to customise the available options (see [Props reference](#themenavbar-props)).

---

## Integration Option B — `ThemeNavBar`

Use this when you want a complete, ready-made navbar with the theme selector pre-rendered inside it.

**Multi-page app** (standard `<a>` tags, full navigation):

```jsx
import { ThemeNavBar } from '@evolution-james/evolution-theme-engine';

function App() {
  return (
    <>
      <ThemeNavBar
        title="My App"
        titleHref="/"
        links={[
          { label: 'Home',    href: '/' },
          { label: 'About',   href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      {/* rest of your app */}
    </>
  );
}
```

**Single-page app with React Router** (no page refreshes):

```jsx
import { Link } from 'react-router-dom';
import { ThemeNavBar } from '@evolution-james/evolution-theme-engine';

function App() {
  return (
    <>
      <ThemeNavBar
        title="My App"
        titleHref="/"
        links={[
          { label: 'Home',    href: '/' },
          { label: 'About',   href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
        renderLink={(props) => (
          <Link to={props.href} className={props.className}>{props.children}</Link>
        )}
      />
      {/* rest of your app */}
    </>
  );
}
```

`ThemeNavBar` is intentionally barebones — it applies `var(--color-*)` variables for all colors, which means it automatically adapts to whichever theme is active.

---

## Ensuring Themes Apply to Your Application

After adding `ThemeProvider` and either `ThemeSelector` or `ThemeNavBar`, you may notice that switching themes changes the navbar colors but nothing else in your app. **This is expected behaviour** — and easy to fix.

### How it works under the hood

The theme engine works by setting a `data-theme` attribute on the `<html>` element:

```html
<html data-theme="dark">
```

`themes.css` (automatically imported by the components) then activates a matching block of CSS variables:

```css
[data-theme="dark"] {
  --color-bg:   #212529;
  --color-text: #f8f9fa;
  /* … */
}
```

These variables are now available **globally** across your entire page. However, your own components only respond to theme changes if they **use those variables** in their CSS. If your styles are hardcoded colors (e.g. `background: white`), they will not change.

### Making your app theme-aware

The first thing to do is wire the page background and text color to the theme. Add this to your global stylesheet (e.g. `index.css` or `App.css`):

```css
/* Apply theme colors to the whole page */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

From there, use the CSS variables anywhere in your own component styles:

```css
.my-card {
  background-color: var(--color-card-bg);
  color: var(--color-text);
  border: 1px solid var(--color-card-border);
  box-shadow: 0 2px 8px var(--color-shadow);
}

.my-card-subtitle {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.my-button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.my-link {
  color: var(--color-link);
}

.my-input {
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-input-border);
  color: var(--color-text);
}

hr {
  border-color: var(--color-divider);
}
```

Because the variables are set on `<html>`, they cascade down to every element on the page — you just need to opt each style into using them.

---

## CSS Variable Reference

| Variable | Purpose |
|---|---|
| `--color-bg` | Page / app background |
| `--color-text` | Primary body text |
| `--color-text-muted` | Secondary / subtitle / caption text |
| `--color-card-bg` | Card / panel surface background |
| `--color-card-border` | Card / panel border color |
| `--color-btn-dark-bg` | Background for "dark" style buttons |
| `--color-btn-dark-text` | Text on "dark" style buttons |
| `--color-btn-light-bg` | Background for "light" style buttons |
| `--color-btn-light-text` | Text on "light" style buttons |
| `--color-divider` | Horizontal rules / separators |
| `--color-input-bg` | Form input / textarea background |
| `--color-input-border` | Form input / textarea border |
| `--color-shadow` | Box shadow color |
| `--color-primary` | Primary accent / brand color |
| `--color-on-primary` | Text rendered on top of `--color-primary` |
| `--color-link` | Hyperlink color |
| `--color-hover-bg` | Subtle hover-state background tint |
| `--color-code-bg` | Code block background |
| `--color-code-text` | Code block text color |

---

## How the Engine Works

```
User picks a theme
      │
      ▼
setTheme(newTheme)                  ← called by ThemeSelector's onChange
      │
      ├──▶  React state update      ← triggers re-render in ThemeProvider
      │
      └──▶  localStorage.setItem()  ← persists selection across sessions
                  │
                  ▼
      useEffect (inside ThemeProvider)
                  │
                  ▼
      document.documentElement
        .setAttribute('data-theme', newTheme)
                  │
                  ▼
      CSS picks up [data-theme="dark"] { … }
      and all --color-* variables update
      site-wide, instantly.
```

1. **`themes.css`** declares all `--color-*` variables per theme inside `[data-theme="name"]` blocks. The `:root` block (Light theme) comes first because `:root` and `[data-theme]` share equal CSS specificity — whichever appears later in the file wins.
2. **`ThemeProvider`** stores the active theme in React state, writes it to `localStorage` for persistence, and sets the `data-theme` attribute on `<html>` via `useEffect`.
3. **`useTheme()`** hook exposes `{ theme, setTheme }` to any component inside the provider.
4. **`ThemeSelector`** calls `setTheme` when the user picks a different option from the dropdown.

---

## Adding Your Own Themes

There are two ways to add a custom theme.

### Method 1 — Edit `themes.css` (recommended for permanent themes)

Copy any existing `[data-theme]` block in `themes.css`, change the selector name, and update the variable values:

```css
/* themes.css */
[data-theme="ocean"] {
  --color-bg:             #0a1628;
  --color-text:           #e0f0ff;
  --color-card-bg:        #0d2137;
  --color-card-border:    #1a3a5c;
  --color-btn-dark-bg:    #1a3a5c;
  --color-btn-dark-text:  #e0f0ff;
  --color-btn-light-bg:   #0d2137;
  --color-btn-light-text: #e0f0ff;
  --color-divider:        #1a3a5c;

  --color-primary:    #00b4d8;
  --color-on-primary: #0a1628;
  --color-link:       #90e0ef;
  --color-hover-bg:   rgba(0, 180, 216, 0.1);
  --color-code-bg:    #070f1a;
  --color-code-text:  #e0f0ff;
}
```

Then surface it in the UI by passing a custom `themes` prop to `ThemeSelector` or `ThemeNavBar`:

```jsx
const MY_THEMES = {
  'Light Theme': 'light',
  'Dark Theme':  'dark',
  'Ocean':       'ocean',
};

<ThemeSelector themes={MY_THEMES} />
// or
<ThemeNavBar themes={MY_THEMES} />
```

### Method 2 — `registerTheme()` (runtime injection, no file editing)

Call `registerTheme` once during app initialisation. It dynamically injects a `<style>` tag into `<head>`.

```jsx
import { registerTheme, THEMES } from '@evolution-james/evolution-theme-engine';

// Call before or after ThemeProvider mounts — works either way.
registerTheme('ocean', {
  'color-bg':             '#0a1628',
  'color-text':           '#e0f0ff',
  'color-primary':        '#00b4d8',
  'color-on-primary':     '#0a1628',
  'color-card-bg':        '#0d2137',
  'color-card-border':    '#1a3a5c',
  'color-divider':        '#1a3a5c',
  'color-btn-dark-bg':    '#1a3a5c',
  'color-btn-dark-text':  '#e0f0ff',
  'color-btn-light-bg':   '#0d2137',
  'color-btn-light-text': '#e0f0ff',
  'color-link':           '#90e0ef',
  'color-hover-bg':       'rgba(0,180,216,0.1)',
  'color-code-bg':        '#070f1a',
  'color-code-text':      '#e0f0ff',
});
```

> Note: keys in the `vars` object should omit the leading `--` — `registerTheme` adds it for you.

---

## API Reference

### `<ThemeProvider>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Required. Your app subtree. |
| `defaultTheme` | `string` | `'light'` | Fallback theme when localStorage has no saved value. |
| `storageKey` | `string` | `'etn-theme'` | localStorage key used to persist the selection. |

---

### `<ThemeSelector>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `themes` | `object` | All 5 built-in themes | Map of `{ 'Display Label': 'theme-key' }` shown in the dropdown. |
| `className` | `string` | `''` | Extra CSS classes added to the `<select>` (alongside `etn-theme-selector`). |
| `style` | `object` | `{}` | Inline styles for the `<select>`. |

---

### `<ThemeNavBar>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'My App'` | Brand text shown on the left of the navbar. |
| `titleHref` | `string` | `undefined` | If provided, the brand text becomes a link pointing to this URL. Omit to render a plain `<span>`. |
| `links` | `Array<{ label, href, onClick? }>` | Placeholder links | Navigation links rendered in the center. If an entry includes `onClick`, the default browser navigation is prevented and `onClick` is called instead — use this for SPA navigation (e.g. React Router's `navigate()`). |
| `renderLink` | `(props) => ReactNode` | `undefined` | Render prop for full control over link rendering. `props` contains `href`, `children`, and `className`. Applied to both the title link and all nav links. Use this for React Router: return `<Link to={props.href} className={props.className}>{props.children}</Link>`. Takes precedence over individual `onClick` handlers. |
| `themes` | `object` | All 5 built-in themes | Forwarded to the internal `<ThemeSelector>`. |
| `className` | `string` | `''` | Extra CSS classes added to the `<nav>` (alongside `etn-navbar`). |
| `style` | `object` | `{}` | Inline styles for the `<nav>`. |

---

### `useTheme()`

Returns `{ theme: string, setTheme: (newTheme: string) => void }`.

```jsx
import { useTheme } from '@evolution-james/evolution-theme-engine';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Active theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Go Dark</button>
    </div>
  );
}
```

---

### `THEMES`

A convenience object that maps friendly JS keys to their `data-theme` string values.

```js
import { THEMES } from '@evolution-james/evolution-theme-engine';

console.log(THEMES);
// {
//   light:    'light',
//   dark:     'dark',
//   forest:   'forest',
//   tron:     'tron',
//   midnight: 'midnight',
// }
```

---

### `registerTheme(name, vars)`

Injects a custom `[data-theme]` CSS block at runtime.

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Theme key (used as the `data-theme` value). |
| `vars` | `object` | CSS variable declarations. Keys omit the leading `--`. |

Calling `registerTheme` again with the same `name` replaces the previous injection.

---

## Built-in Themes

| Key | Name | Background | Primary Accent |
|---|---|---|---|
| `light` | Light | `#f8f9fa` | `#1976d2` (blue) |
| `dark` | Dark | `#212529` | `#90caf9` (light blue) |
| `forest` | Forest | `#1b2e22` | `#4caf70` (green) |
| `tron` | Tron | `#0f172a` | `#0ea5e9` (cyan) |
| `midnight` | Midnight | `#0b1016` | `#5ce1b5` (teal) |

---

## License

Copyright (c) 2026 Evolution Coding Academy (@evolution-james / @james-evolution)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify, merge, and distribute the Software in source or binary forms, subject to the following conditions:

1. Commercial Use Restriction: The Software may not be sold, sublicensed, or otherwise distributed as a standalone product, or as a substantially similar derivative, for direct commercial gain. You may not offer the Software, with or without modification, as a paid product or as part of a paid library, toolkit, or component collection.

2. Permitted Commercial Use: The Software may be used as part of a larger application, product, or service, including commercial products, provided that the Software is not the primary, sole, or core component being sold or licensed. The Software must not be the main value or selling point of the product.

3. Attribution: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

4. No Warranty: THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For questions or commercial licensing, contact: contact@evolutioncoding.net
