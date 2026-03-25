import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { HdsButton } from '@hashicorp/design-system-components/components';

export default class ThemeToggleComponent extends Component {
  @service theme;

  <template>
    <HdsButton
      @text={{if this.theme.isDark "Light" "Dark"}}
      @icon={{if this.theme.isDark "sun" "moon"}}
      @color="secondary"
      {{on "click" this.theme.toggleTheme}}
      aria-label={{if
        this.theme.isDark
        "Switch to light mode"
        "Switch to dark mode"
      }}
      class="theme-toggle-hds-btn"
    />
  </template>
}
