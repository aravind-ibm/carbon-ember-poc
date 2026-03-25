import Component from '@glimmer/component';

export default class OrgGraphComponent extends Component {
  get normalizedOrgList() {
    return (this.args.orgList ?? []).map((org) => ({
      ...org,
      employeeCount: Number(org.employeeCount ?? org.employees) || 0,
    }));
  }

  hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  seededScore(seed, min = 40, max = 95) {
    const hash = this.hashString(seed);
    const range = max - min + 1;
    return min + (hash % range);
  }

  // Bar Chart Data
  get barChartData() {
    return this.normalizedOrgList.map((org) => ({
      group: 'Employee Count',
      key: org.organization,
      value: org.employeeCount,
    }));
  }

  // Bar Chart Options
  get barChartOptions() {
    return {
      title: 'Organizations by Employee Count',
      axes: {
        left: { mapsTo: 'value', title: 'Employee Count' },
        bottom: { mapsTo: 'key', scaleType: 'labels', title: 'Organization' },
      },
      height: '400px',
      resizable: true,
    };
  }

  // Pie Chart Data
  get pieChartData() {
    return this.normalizedOrgList.map((org) => ({
      group: org.organization,
      value: org.employeeCount,
    }));
  }

  // Pie Chart Options
  get pieChartOptions() {
    return {
      title: 'Organizations by Employee Count',
      height: '400px',
      resizable: true,
      pie: {
        alignment: 'center',
      },
      legend: {
        enabled: true,
        alignment: 'center',
      },
      tooltip: {
        showTotal: true,
        valueFormatter: (value) => `${value} employees`,
      },
      toolbar: {
        enabled: true,
        numberOfIcons: 3,
        controls: [
          {
            type: 'Make fullscreen',
          },
          {
            type: 'Export as CSV',
          },
          {
            type: 'Export as PNG',
          },
        ],
      },
    };
  }

  get radarChartData() {
    const metrics = [
      'Growth Potential',
      'Innovation Index',
      'Retention Health',
      'Market Reach',
      'Delivery Maturity',
    ];

    return [...this.normalizedOrgList]
      .sort((a, b) => b.employeeCount - a.employeeCount)
      .slice(0, 5)
      .flatMap((org) => {
        const seedBase = `${org.id ?? org.organization}-${org.industry ?? ''}-${org.location ?? ''}`;

        return metrics.map((metric) => ({
          group: org.organization,
          key: metric,
          value: this.seededScore(`${seedBase}-${metric}`),
        }));
      });
  }

  get radarChartOptions() {
    return {
      title: 'Organization Capability Profile (Top 5 by Size)',
      height: '400px',
      radar: {
        axes: {
          angle: 'key',
          value: 'value',
        },
        alignment: 'center',
      },
      legend: {
        enabled: true,
        position: 'bottom',
        alignment: 'center',
      },
      tooltip: {
        valueFormatter: (value) => `${value}/100`,
      },
      toolbar: {
        enabled: true,
        numberOfIcons: 2,
        controls: [
          {
            type: 'Show as data-table',
          },
          {
            type: 'Export as PNG',
          },
        ],
      },
    };
  }

  get meterChartData() {
    const totalEmployees = this.normalizedOrgList.reduce(
      (sum, org) => sum + org.employeeCount,
      0
    );
    const growthTargetPercent = this.seededScore(
      `${this.normalizedOrgList.length}-headcount-target`,
      12,
      30
    );
    const utilizationPercent = totalEmployees
      ? Math.round(
          (100 * totalEmployees) /
            (totalEmployees * (1 + growthTargetPercent / 100))
        )
      : 0;

    return [
      {
        group: 'Headcount Utilization',
        value: utilizationPercent,
      },
    ];
  }

  get meterChartOptions() {
    return {
      title: 'Current Headcount Utilization vs Growth Target',
      height: '220px',
      meter: {
        peak: 100,
        status: {
          ranges: [
            { range: [0, 50], status: 'danger' },
            { range: [51, 75], status: 'warning' },
            { range: [76, 100], status: 'success' },
          ],
        },
      },
      tooltip: {
        valueFormatter: (value) => `${value}%`,
      },
      toolbar: {
        enabled: true,
        numberOfIcons: 1,
        controls: [
          {
            type: 'Export as PNG',
          },
        ],
      },
    };
  }
}
