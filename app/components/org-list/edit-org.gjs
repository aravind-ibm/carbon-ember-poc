import Component from '@glimmer/component';
import {
  HdsModal,
  HdsButton,
} from '@hashicorp/design-system-components/components';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import OrgForm from '../form/org-form';

export default class EditOrg extends Component {
  @service orgData;
  constructor() {
    super(...arguments);
    // Logic must live inside a method like the constructor
    // console.log('edit mode status:', this.args.isEditModeEnabled);
  }

  <template>
    {{#if this.orgData.isEditModeEnabled}}
      <HdsModal
        id="basic-modal"
        @onClose={{this.orgData.toggleEditMode}}
        as |M|
      >
        <M.Header>
          Edit Org
        </M.Header>
        <M.Body>
          <div class="hds-typography-body-300 hds-foreground-primary">

            <OrgForm />
          </div>
        </M.Body>
      </HdsModal>
    {{/if}}
  </template>
}
