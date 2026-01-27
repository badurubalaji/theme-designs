# Angular Material Theme Designs

A collection of **6 prebuilt, directly-reusable themes** for Angular Material components. Each theme is a standalone CSS file that can be imported into any Angular application.

## 🎨 Available Themes

| Theme | Style | CSS Output |
|-------|-------|------------|
| **Material** | Material Design 3 | `material-theme.css` |
| **Neumorphism** | Soft UI shadows | `neumorphism-theme.css` |
| **Glassmorphism** | Frosted glass | `glassmorphism-theme.css` |
| **Crystal** | Gem-like | `crystal-theme.css` |
| **Flat** | Zero elevation | `flat-theme.css` |
| **Minimal** | Maximum whitespace | `minimal-theme.css` |

## 🚀 Quick Start

### Option 1: Runtime Theme Switching
Copy the compiled CSS files and load them dynamically:
```typescript
// Load theme at runtime
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'material-theme.css';
document.head.appendChild(link);
```

### Option 2: Build-time Theme Import
Copy the `src/styles/themes/` folder and import one theme:
```scss
// In styles.scss - choose ONE:
@use 'styles/themes/material';
@use 'styles/themes/neumorphism';
@use 'styles/themes/glassmorphism';
@use 'styles/themes/crystal';
@use 'styles/themes/flat';
@use 'styles/themes/minimal';
```

## 📁 Project Structure

```
src/styles/themes/
├── _palettes.scss       # M3 color palettes
├── _tokens.scss         # Design tokens
├── _elevation.scss      # Shadow mixins
│
├── material.scss        # Material Design 3
├── neumorphism.scss     # Soft UI
├── glassmorphism.scss   # Frosted glass
├── crystal.scss         # Gem transparency
├── flat.scss            # Zero shadows
└── minimal.scss         # Maximum whitespace
```

## 🌙 Dark Mode

All themes support dark mode:
```typescript
// Toggle via class
document.documentElement.classList.add('dark-theme');

// Or via data attribute
document.documentElement.setAttribute('data-theme', 'dark');
```

## 📋 Copy-Paste Templates

The demo includes ready-to-use code snippets for:
- Buttons
- Cards
- Form Fields
- Tables
- Sidenav
- Dialogs

## 🏃 Running the Demo

```bash
npm install
ng serve
```

Open the displayed URL to see all themes with:
- Sidenav navigation
- Stats dashboard cards
- Data table with actions
- All Material components
- Copy-paste template snippets

## 📦 Build Output

```
dist/theme-designs/
├── main.js                 # App bundle (~192 kB gzipped)
├── material-theme.css      # 23.96 kB
├── neumorphism-theme.css   # 22.76 kB
├── glassmorphism-theme.css # 22.02 kB
├── crystal-theme.css       # 21.25 kB
├── flat-theme.css          # 20.23 kB
└── minimal-theme.css       # 27.67 kB
```

## 📜 License

MIT License
