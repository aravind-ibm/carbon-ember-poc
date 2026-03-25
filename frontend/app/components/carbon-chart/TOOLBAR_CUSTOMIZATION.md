# Carbon Charts Toolbar Customization Guide

## Overview

Carbon Charts provides a built-in toolbar that can be customized to show different controls. The toolbar appears in the top-right corner of each chart.

## Basic Toolbar Configuration

Add the `toolbar` property to your chart options:

```javascript
get chartOptions() {
  return {
    title: 'My Chart',
    height: '400px',
    toolbar: {
      enabled: true,
      numberOfIcons: 3,
      controls: [
        { type: 'Make fullscreen' },
        { type: 'Export as CSV' },
        { type: 'Export as PNG' }
      ]
    }
  };
}
```

## Toolbar Properties

### `enabled` (boolean)

- **Default**: `false`
- **Description**: Enable or disable the toolbar
- **Example**: `enabled: true`

### `numberOfIcons` (number)

- **Default**: `3`
- **Description**: Maximum number of icons to display before showing overflow menu
- **Example**: `numberOfIcons: 2`

### `controls` (array)

- **Description**: Array of control objects defining which buttons appear
- **Required**: Yes (if toolbar is enabled)

## Available Control Types

### 1. Make fullscreen

Allows users to view the chart in fullscreen mode.

```javascript
{
  type: 'Make fullscreen';
}
```

**Use case**: Best for detailed charts that benefit from larger viewing area

### 2. Export as CSV

Exports chart data as a CSV file.

```javascript
{
  type: 'Export as CSV';
}
```

**Use case**: When users need to analyze data in spreadsheet applications
**Note**: Only works with charts that have tabular data (bar, line, scatter, etc.)

### 3. Export as PNG

Exports chart as a PNG image.

```javascript
{
  type: 'Export as PNG';
}
```

**Use case**: For reports, presentations, or documentation

### 4. Export as JPG

Exports chart as a JPG image.

```javascript
{
  type: 'Export as JPG';
}
```

**Use case**: When smaller file sizes are needed

### 5. Show as table

Toggles between chart and table view.

```javascript
{
  type: 'Show as table';
}
```

**Use case**: When users need to see exact values

### 6. Reset zoom

Resets chart zoom to default view (for zoomable charts).

```javascript
{
  type: 'Reset zoom';
}
```

**Use case**: Charts with zoom functionality enabled

## Complete Examples

### Example 1: Full Toolbar (All Options)

```javascript
get chartOptions() {
  return {
    title: 'Sales Dashboard',
    height: '400px',
    toolbar: {
      enabled: true,
      numberOfIcons: 5,
      controls: [
        { type: 'Make fullscreen' },
        { type: 'Show as table' },
        { type: 'Export as CSV' },
        { type: 'Export as PNG' },
        { type: 'Export as JPG' }
      ]
    }
  };
}
```

### Example 2: Minimal Toolbar (Export Only)

```javascript
get chartOptions() {
  return {
    title: 'Quick Stats',
    height: '300px',
    toolbar: {
      enabled: true,
      numberOfIcons: 2,
      controls: [
        { type: 'Export as PNG' },
        { type: 'Export as CSV' }
      ]
    }
  };
}
```

### Example 3: Fullscreen Only

```javascript
get chartOptions() {
  return {
    title: 'Detailed Analysis',
    height: '400px',
    toolbar: {
      enabled: true,
      numberOfIcons: 1,
      controls: [
        { type: 'Make fullscreen' }
      ]
    }
  };
}
```

### Example 4: No Toolbar (Default)

```javascript
get chartOptions() {
  return {
    title: 'Simple Chart',
    height: '400px',
    // No toolbar property = toolbar disabled
  };
}
```

## Chart-Specific Recommendations

### Bar Charts

```javascript
toolbar: {
  enabled: true,
  numberOfIcons: 3,
  controls: [
    { type: 'Make fullscreen' },
    { type: 'Export as CSV' },
    { type: 'Export as PNG' }
  ]
}
```

### Pie/Donut Charts

```javascript
toolbar: {
  enabled: true,
  numberOfIcons: 2,
  controls: [
    { type: 'Make fullscreen' },
    { type: 'Export as PNG' }
  ]
}
```

**Note**: CSV export doesn't make sense for pie charts

### Line Charts

```javascript
toolbar: {
  enabled: true,
  numberOfIcons: 4,
  controls: [
    { type: 'Make fullscreen' },
    { type: 'Show as table' },
    { type: 'Export as CSV' },
    { type: 'Export as PNG' }
  ]
}
```

### Meter Charts

```javascript
toolbar: {
  enabled: true,
  numberOfIcons: 1,
  controls: [
    { type: 'Export as PNG' }
  ]
}
```

**Note**: Meter charts are simple, so minimal toolbar is sufficient

### Radar Charts

```javascript
toolbar: {
  enabled: true,
  numberOfIcons: 2,
  controls: [
    { type: 'Make fullscreen' },
    { type: 'Export as PNG' }
  ]
}
```

## Styling the Toolbar

### Custom Toolbar Colors

```css
/* Toolbar button styling */
.cds--toolbar-action {
  color: #0f62fe;
}

.cds--toolbar-action:hover {
  background-color: #e5f6ff;
}

/* Toolbar container */
.cds--chart-toolbar {
  background-color: transparent;
  padding: 8px;
}
```

### Hide Toolbar on Small Screens

```css
@media (max-width: 640px) {
  .cds--chart-toolbar {
    display: none;
  }
}
```

## Disabling Specific Controls Conditionally

```javascript
import Component from '@glimmer/component';

export default class MyChartComponent extends Component {
  get chartOptions() {
    const controls = [{ type: 'Make fullscreen' }];

    // Only add export if user has permission
    if (this.args.canExport) {
      controls.push({ type: 'Export as CSV' });
      controls.push({ type: 'Export as PNG' });
    }

    return {
      title: 'Conditional Toolbar',
      height: '400px',
      toolbar: {
        enabled: true,
        numberOfIcons: controls.length,
        controls,
      },
    };
  }
}
```

## Troubleshooting

### Toolbar Not Appearing

1. Ensure `enabled: true` is set
2. Check that `controls` array is not empty
3. Verify chart has sufficient height (toolbar needs space)

### Export Not Working

1. CSV export requires data in correct format
2. PNG/JPG export requires browser support for canvas
3. Check browser console for errors

### Fullscreen Issues

1. Ensure container has proper CSS (see main README)
2. Check for conflicting CSS that prevents fullscreen
3. Browser must support Fullscreen API

## Best Practices

1. **Don't overwhelm users**: Keep toolbar simple (2-4 controls max)
2. **Match chart type**: Only include relevant exports (e.g., no CSV for pie charts)
3. **Consider mobile**: Toolbar may be hidden on small screens
4. **Test exports**: Verify CSV and image exports work correctly
5. **Accessibility**: Toolbar controls are keyboard accessible by default

## Resources

- [Carbon Charts Documentation](https://carbon-design-system.github.io/carbon-charts/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
