import Component from '@glimmer/component';
import { HdsModal } from '@hashicorp/design-system-components/components';
import { inject as service } from '@ember/service';
import OrgForm from '../form/org-form';

export default class EditOrg extends Component {
  @service orgData;
  constructor() {
    super(...arguments);
  }

  <template>
    {{#if this.orgData.isEditModeEnabled}}
      <HdsModal
        id="basic-modal"
        @isDismissDisabled={{true}}
        @onClose={{this.orgData.toggleEditMode}}
        as |M|
      >
        <M.Header @onDismiss={{this.orgData.toggleEditMode}}>
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
