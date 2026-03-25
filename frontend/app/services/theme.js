import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ThemeService extends Service {
  @tracked currentTheme = 'light';

  constructor() {
    super(...arguments);
    // Load theme from localStorage or system preference
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('app-theme');

    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }

    this.applyTheme();
  }

  @action
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('app-theme', this.currentTheme);
  }

  @action
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.currentTheme = theme;
      this.applyTheme();
      localStorage.setItem('app-theme', theme);
    }
  }

  applyTheme() {
    // Set data-theme attribute on document root for CSS variable switching
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  get isDark() {
    return this.currentTheme === 'dark';
  }

  get isLight() {
    return this.currentTheme === 'light';
  }

  // Carbon Charts theme configuration
  get carbonChartsTheme() {
    return this.currentTheme === 'dark' ? 'g100' : 'white';
  }
}
