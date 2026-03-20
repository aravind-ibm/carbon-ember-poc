import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
  LinearScale
);

export default class OrgGraph extends Component {
  // This modifier runs when the <canvas> element is inserted into the DOM
  renderChart = modifier((element) => {
    const list = this.args.orgList ?? [];

    const chart = new ChartJS(element, {
      type: 'bar',
      data: {
        labels: list.map((org) => org.organization),
        datasets: [
          {
            label: 'Employee Count',
            data: list.map((org) => org.employeeCount),
            backgroundColor: '#2563eb',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    // Cleanup when the component is destroyed
    return () => chart.destroy();
  });

  <template>
    <div class="graph-container">
      {{! We use a standard canvas and attach the modifier }}
      <canvas {{this.renderChart}}></canvas>
    </div>
  </template>
}
