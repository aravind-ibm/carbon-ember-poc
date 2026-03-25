# Carbon Charts Theme Guide - Light/Dark Mode

## Overview

This guide explains how to use the light/dark theme system integrated with Carbon Charts in your Ember application.

## Features

✅ Automatic theme detection from system preferences  
✅ Manual theme toggle with persistent storage  
✅ Seamless Carbon Charts theme integration  
✅ Smooth transitions between themes  
✅ Accessible theme toggle button

## Quick Start

The theme system is already integrated! Just use the theme toggle button in the navigation sidebar.

### Theme Toggle Button

The theme toggle button is located in the navigation sidebar and allows users to switch between light and dark modes.

```hbs
{{! Already added to nav-bar.gjs }}
<ThemeToggle />
```

## How It Works

### 1. Theme Service

The `theme` service manages the application theme state:

```javascript
// app/services/theme.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ThemeService extends Service {
  @tracked currentTheme = 'light'; // 'light' or 'dark'

  // Methods
  toggleTheme()      // Switch between light and dark
  setTheme(theme)    // Set specific theme

  // Getters
  isDark             // Returns true if dark mode
  isLight            // Returns true if light mode
  carbonChartsTheme  // Returns 'white' or 'g100' for Carbon Charts
}
```

### 2. Carbon Charts Integration

The `CarbonChart` component automatically applies the current theme:

```javascript
// app/components/carbon-chart/index.js
export default class CarbonChartComponent extends Component {
  @service theme;

  setupChart = modifier((element, [data, options, chartType]) => {
    const themedOptions = {
      ...options,
      theme: this.theme.carbonChartsTheme, // 'white' or 'g100'
    };
    // Chart creation with theme...
  });
}
```

## Carbon Charts Theme Values

Carbon Charts supports these theme values:

- **`white`** - Light theme (default)
- **`g10`** - Light gray theme
- **`g90`** - Dark gray theme
- **`g100`** - Dark theme (used for dark mode)

Our implementation uses:

- Light mode → `white`
- Dark mode → `g100`

## Using Themes in Your Components

### Example 1: Basic Usage

Charts automatically use the current theme - no extra code needed!

```hbs
{{! Your chart will automatically use the current theme }}
<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='bar'
/>
```

### Example 2: Accessing Theme in Component

```javascript
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class MyComponent extends Component {
  @service theme;

  get chartOptions() {
    return {
      title: 'My Chart',
      height: '400px',
      // Theme is automatically applied by CarbonChart component
      // But you can access it if needed:
      // theme: this.theme.carbonChartsTheme
    };
  }

  get isDarkMode() {
    return this.theme.isDark;
  }
}
```

### Example 3: Conditional Styling Based on Theme

```javascript
get customStyles() {
  return this.theme.isDark
    ? 'background: #1f2937; color: #f9fafb;'
    : 'background: #ffffff; color: #111827;';
}
```

```hbs
<div style={{this.customStyles}}>
  Content that adapts to theme
</div>
```

## CSS Variables

The theme system uses CSS custom properties for consistent styling:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 5%);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 10%);
}

[data-theme='dark'] {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border-color: #374151;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 20%);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 30%);
}
```

### Using CSS Variables

```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
}
```

## Theme Persistence

The theme preference is automatically saved to `localStorage`:

```javascript
// Saved as 'app-theme'
localStorage.getItem('app-theme'); // 'light' or 'dark'
```

On app load, the theme is restored from:

1. localStorage (if previously set)
2. System preference (if no saved preference)

## Customizing the Theme Toggle

### Change Button Style

```css
/* app/styles/app.css */
.theme-toggle-btn {
  /* Customize appearance */
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
}
```

### Change Button Position

```hbs
{{! Move to different location }}
<div class='header'>
  <ThemeToggle />
</div>
```

### Custom Toggle Component

```javascript
// app/components/my-theme-toggle.gjs
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

export default class MyThemeToggle extends Component {
  @service theme;

  <template>
    <button {{on "click" this.theme.toggleTheme}}>
      {{if this.theme.isDark "🌙" "☀️"}}
    </button>
  </template>
}
```

## Advanced Usage

### Programmatic Theme Control

```javascript
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SettingsComponent extends Component {
  @service theme;

  @action
  setLightTheme() {
    this.theme.setTheme('light');
  }

  @action
  setDarkTheme() {
    this.theme.setTheme('dark');
  }

  @action
  toggleTheme() {
    this.theme.toggleTheme();
  }
}
```

### Listen to System Theme Changes

```javascript
// Add to theme service if needed
constructor() {
  super(...arguments);
  this.loadTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('app-theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
}
```

## Chart-Specific Theme Customization

### Override Theme for Specific Chart

```javascript
get chartOptions() {
  return {
    title: 'My Chart',
    height: '400px',
    theme: 'g10', // Force specific theme regardless of app theme
  };
}
```

### Theme-Specific Chart Options

```javascript
get chartOptions() {
  const baseOptions = {
    title: 'Sales Data',
    height: '400px',
  };

  if (this.theme.isDark) {
    return {
      ...baseOptions,
      // Dark mode specific options
      grid: {
        strokeColor: '#374151',
      },
    };
  }

  return baseOptions;
}
```

## Troubleshooting

### Charts Not Updating Theme

**Problem**: Charts don't change when toggling theme

**Solution**: Ensure the chart component is reactive to theme changes. The `setupChart` modifier should re-run when theme changes.

```javascript
// This should already be in place
setupChart = modifier((element, [data, options, chartType]) => {
  const themedOptions = {
    ...options,
    theme: this.theme.carbonChartsTheme, // Reactive to theme changes
  };

  if (this.chart) {
    this.chart.model.setOptions(themedOptions); // Update existing chart
  }
});
```

### Theme Not Persisting

**Problem**: Theme resets on page reload

**Solution**: Check localStorage is working:

```javascript
// In browser console
localStorage.getItem('app-theme'); // Should return 'light' or 'dark'
```

### Flashing on Page Load

**Problem**: Brief flash of wrong theme on load

**Solution**: Add inline script in `index.html` before body:

```html
<script>
  const theme =
    localStorage.getItem('app-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.add(`${theme}-theme`);
</script>
```

## Best Practices

1. **Use CSS Variables**: Always use CSS variables for colors to ensure consistency
2. **Test Both Themes**: Verify your UI works in both light and dark modes
3. **Respect User Preference**: Don't force a theme; let users choose
4. **Smooth Transitions**: Use CSS transitions for theme changes
5. **Accessible Contrast**: Ensure sufficient contrast in both themes

## Examples

### Complete Component with Theme Support

```javascript
// app/components/themed-dashboard.gjs
import Component from '@glimmer/component';
import { service } from '@ember/service';
import CarbonChart from './carbon-chart';

export default class ThemedDashboard extends Component {
  @service theme;

  get chartData() {
    return [
      { group: 'Sales', key: 'Q1', value: 65000 },
      { group: 'Sales', key: 'Q2', value: 29123 },
    ];
  }

  get chartOptions() {
    return {
      title: 'Quarterly Sales',
      height: '400px',
      axes: {
        left: { mapsTo: 'value' },
        bottom: { mapsTo: 'key', scaleType: 'labels' },
      },
      // Theme automatically applied by CarbonChart
    };
  }

  <template>
    <div class="dashboard">
      <h1>Dashboard ({{this.theme.currentTheme}} mode)</h1>

      <CarbonChart
        @data={{this.chartData}}
        @options={{this.chartOptions}}
        @chartType="bar"
      />
    </div>
  </template>
}
```

## Resources

- [Carbon Charts Themes](https://carbon-design-system.github.io/carbon-charts/?path=/docs/docs-tutorials-themes--docs)
- [Carbon Design System](https://carbondesignsystem.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
