import '@carbon/charts/styles.css';
import Component from '@glimmer/component';
import {
  SimpleBarChart,
  GroupedBarChart,
  StackedBarChart,
  LineChart,
  ScatterChart,
  PieChart,
  DonutChart,
  AreaChart,
  RadarChart,
  MeterChart,
} from '@carbon/charts';
import { modifier } from 'ember-modifier';
import { runTask } from 'ember-lifeline';
import { registerDestructor } from '@ember/destroyable';
import { service } from '@ember/service';

// Map chart type strings to chart classes
const CHART_TYPES = {
  bar: SimpleBarChart,
  'grouped-bar': GroupedBarChart,
  'stacked-bar': StackedBarChart,
  line: LineChart,
  scatter: ScatterChart,
  pie: PieChart,
  donut: DonutChart,
  area: AreaChart,
  radar: RadarChart,
  meter: MeterChart,
};

export default class CarbonChartComponent extends Component {
  @service theme;

  chart = null;

  setupChart = modifier((element, [data, options, chartType]) => {
    // Merge theme into options
    const themedOptions = {
      ...options,
      theme: this.theme.carbonChartsTheme,
    };

    // If chart exists, update data and theme
    if (this.chart) {
      this.chart.model.setData(data);
      this.chart.model.setOptions(themedOptions);
      return;
    }

    // Schedule chart creation for next run loop cycle
    runTask(this, () => {
      if (!element) return;

      // Get the chart class based on type
      const ChartClass = CHART_TYPES[chartType] || SimpleBarChart;

      try {
        this.chart = new ChartClass(element, { data, options: themedOptions });
      } catch (e) {
        console.error(`Carbon ${chartType} chart initialization failed`, e);
      }
    });

    // Clean up using @ember/destroyable pattern
    registerDestructor(this, () => {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    });
  });
}
