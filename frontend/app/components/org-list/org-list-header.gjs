import Component from '@glimmer/component';
import {
  HdsFormTextInputField,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';
import { inject as service } from '@ember/service';
import { on } from '@ember/modifier';

export default class OrgListHeader extends Component {
  @service orgData;
  <template>
    <div class="search-wrapper">
      <HdsLayoutFlex @gap="16" @justify="start">
        <HdsFormTextInputField
          @type="search"
          @value={{this.orgData.searchTerm}}
          name="search"
          placeholder="Enter 3 characters to start searching for org name or location"
          {{on "input" this.orgData.searchHandler}}
        />

      </HdsLayoutFlex>
    </div>
  </template>
}
