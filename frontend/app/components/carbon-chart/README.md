# CarbonChart Component

A reusable Ember component for rendering Carbon Charts with automatic data updates and proper lifecycle management.

## Features

- ✅ Supports 10 chart types (bar, line, pie, donut, area, scatter, grouped-bar, stacked-bar, radar, meter)
- ✅ Automatic data updates without recreation
- ✅ Proper cleanup to prevent memory leaks
- ✅ Deferred initialization for DOM readiness
- ✅ Fully reactive to data changes

## Installation

The component requires these dependencies (already installed):

```bash
npm install @carbon/charts ember-modifier ember-lifeline
```

## Basic Usage

```hbs
<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='bar'
/>
```

## Arguments

### @data (required)

Array of data objects. Format depends on chart type.

**Bar Chart Example:**

```javascript
[
  { group: 'Dataset', key: 'Item 1', value: 65000 },
  { group: 'Dataset', key: 'Item 2', value: 29123 },
  { group: 'Dataset', key: 'Item 3', value: 35213 },
];
```

**Line Chart Example:**

```javascript
[
  { group: 'Dataset 1', key: '2020', value: 10 },
  { group: 'Dataset 1', key: '2021', value: 15 },
  { group: 'Dataset 2', key: '2020', value: 20 },
  { group: 'Dataset 2', key: '2021', value: 25 },
];
```

**Pie/Donut Chart Example:**

```javascript
[
  { group: 'Category A', value: 25 },
  { group: 'Category B', value: 35 },
  { group: 'Category C', value: 40 },
];
```

### @options (required)

Chart configuration object. See [Carbon Charts documentation](https://carbon-design-system.github.io/carbon-charts/) for all options.

**Common Options:**

```javascript
{
  title: 'Chart Title',
  height: '400px',
  resizable: true,
  axes: {
    left: { mapsTo: 'value', title: 'Y Axis' },
    bottom: { mapsTo: 'key', scaleType: 'labels', title: 'X Axis' }
  },
  legend: {
    enabled: true,
    position: 'bottom'
  }
}
```

### @chartType (optional, default: 'bar')

String specifying the chart type.

**Available Types:**

- `'bar'` - Simple bar chart
- `'grouped-bar'` - Grouped bar chart
- `'stacked-bar'` - Stacked bar chart
- `'line'` - Line chart
- `'area'` - Area chart
- `'scatter'` - Scatter plot
- `'pie'` - Pie chart
- `'donut'` - Donut chart
- `'radar'` - Radar chart
- `'meter'` - Meter chart

## Complete Examples

### Example 1: Bar Chart

```javascript
// component.js
import Component from '@glimmer/component';

export default class MyChartComponent extends Component {
  get chartData() {
    return [
      { group: 'Sales', key: 'Q1', value: 65000 },
      { group: 'Sales', key: 'Q2', value: 29123 },
      { group: 'Sales', key: 'Q3', value: 35213 },
      { group: 'Sales', key: 'Q4', value: 51213 },
    ];
  }

  get chartOptions() {
    return {
      title: 'Quarterly Sales',
      axes: {
        left: { mapsTo: 'value', title: 'Revenue ($)' },
        bottom: { mapsTo: 'key', scaleType: 'labels', title: 'Quarter' },
      },
      height: '400px',
      resizable: true,
    };
  }
}
```

```hbs
{{! component.hbs }}
<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='bar'
/>
```

### Example 2: Line Chart with Multiple Series

```javascript
// component.js
get chartData() {
  return [
    { group: 'Product A', key: 'Jan', value: 10000 },
    { group: 'Product A', key: 'Feb', value: 15000 },
    { group: 'Product A', key: 'Mar', value: 12000 },
    { group: 'Product B', key: 'Jan', value: 8000 },
    { group: 'Product B', key: 'Feb', value: 9000 },
    { group: 'Product B', key: 'Mar', value: 11000 }
  ];
}

get chartOptions() {
  return {
    title: 'Product Sales Trend',
    axes: {
      left: { mapsTo: 'value', title: 'Sales' },
      bottom: { mapsTo: 'key', scaleType: 'labels', title: 'Month' }
    },
    height: '400px',
    curve: 'curveMonotoneX', // Smooth curves
    legend: {
      enabled: true,
      position: 'bottom'
    }
  };
}
```

```hbs
<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='line'
/>
```

### Example 3: Pie Chart

```javascript
// component.js
get chartData() {
  return [
    { group: 'Chrome', value: 65 },
    { group: 'Firefox', value: 15 },
    { group: 'Safari', value: 12 },
    { group: 'Edge', value: 8 }
  ];
}

get chartOptions() {
  return {
    title: 'Browser Market Share',
    height: '400px',
    resizable: true,
    pie: {
      labels: {
        enabled: true
      }
    }
  };
}
```

```hbs
<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='pie'
/>
```

### Example 4: Dynamic Data Updates

```javascript
// component.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DynamicChartComponent extends Component {
  @tracked selectedYear = 2024;

  get chartData() {
    // Data changes based on selectedYear
    return this.fetchDataForYear(this.selectedYear);
  }

  get chartOptions() {
    return {
      title: `Sales Data - ${this.selectedYear}`,
      axes: {
        left: { mapsTo: 'value', title: 'Revenue' },
        bottom: { mapsTo: 'key', scaleType: 'labels' }
      },
      height: '400px'
    };
  }

  @action
  changeYear(year) {
    this.selectedYear = year;
    // Chart automatically updates!
  }

  fetchDataForYear(year) {
    // Your data fetching logic
    return [...];
  }
}
```

```hbs
<select {{on 'change' (fn this.changeYear)}}>
  <option value='2023'>2023</option>
  <option value='2024' selected>2024</option>
  <option value='2025'>2025</option>
</select>

<CarbonChart
  @data={{this.chartData}}
  @options={{this.chartOptions}}
  @chartType='bar'
/>
```

## How It Works

1. **Initial Render**: Chart is created using `runTask()` to ensure DOM is ready
2. **Data Updates**: When `@data` changes, existing chart is updated (not recreated)
3. **Cleanup**: Chart is destroyed when component is destroyed using `registerDestructor()`

## Styling

The component includes Carbon Charts CSS automatically. You can add custom styles:

```css
.carbon-chart-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Performance Tips

- Use getters for `chartData` and `chartOptions` to ensure reactivity
- Avoid recreating data arrays unnecessarily
- Use `@cached` decorator for expensive computations

## Troubleshooting

**Chart not appearing?**

- Ensure container has height (set in options or CSS)
- Check browser console for errors
- Verify data format matches chart type

**Chart not updating?**

- Ensure data is tracked (`@tracked` or getter)
- Check that data reference changes (create new array)

**Memory leaks?**

- Component handles cleanup automatically
- Don't manually destroy charts

## Resources

- [Carbon Charts Documentation](https://carbon-design-system.github.io/carbon-charts/)
- [Carbon Charts GitHub](https://github.com/carbon-design-system/carbon-charts)
- [Ember Modifier Documentation](https://github.com/ember-modifier/ember-modifier)
