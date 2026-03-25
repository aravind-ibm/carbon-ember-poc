import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import {
  HdsButton,
  HdsLayoutFlex,
  HdsFormSelectField,
} from '@hashicorp/design-system-components/components';

export default class FilterSortControls extends Component {
  @action
  handleIndustryChange(event) {
    const value = event?.target?.value ?? event;
    if (this.args.onIndustryChange) {
      this.args.onIndustryChange(value);
    }
  }

  isSelected = (industry) => {
    return industry === this.args.selectedIndustry;
  };

  get isFilterActive() {
    return this.args.selectedIndustry !== 'All Industries';
  }

  <template>
    <div class="filter-sort-container">
      <HdsLayoutFlex @align="end" @gap="16" @justify="start">
        {{! Industry Filter }}
        <div class="width">
          <HdsFormSelectField
            name="industry-filter"
            @value={{@selectedIndustry}}
            {{on "change" this.handleIndustryChange}}
            as |F|
          >
            <F.Label>Filter by Industry</F.Label>
            <F.Options>
              {{#each @industries as |industry|}}
                <option
                  value={{industry}}
                  selected={{if (this.isSelected industry) "selected"}}
                >{{industry}}</option>
              {{/each}}
            </F.Options>
          </HdsFormSelectField>
        </div>
        {{! Clear Filters Button }}
        <HdsButton
          @text="Clear"
          @icon="x"
          @color="tertiary"
          @size="small"
          @iconPosition="leading"
          disabled={{unless this.isFilterActive "disabled"}}
          {{on "click" @onClearFilters}}
        />
      </HdsLayoutFlex>
    </div>
  </template>
}
