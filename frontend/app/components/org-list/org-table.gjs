import Component from '@glimmer/component';
import {
  HdsTable,
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import EditOrg from './edit-org';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const tableConfig = [
  { key: 'id', label: 'ID', isSortable: true },
  { key: 'organization', label: 'Organization', isSortable: true },
  { key: 'industry', label: 'Industry' },
  { key: 'employeeCount', label: 'Employee Count', isSortable: true },
  { key: 'location', label: 'Location' },
  { key: 'actions', label: 'Actions' },
];

export default class OrgTable extends Component {
  @service orgData;
  @service notification;
  @tracked isModalOpen = false;
  @action
  toggleMessageModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  @action
  deleteOrg(id) {
    this.orgData.deleteOrgById(id);
    this.notification.showToastMessageHandler(
      'Success',
      'Organization deleted successfully',
      'success'
    );
  }
  <template>
    <HdsTable @model={{@orgList}} @columns={{tableConfig}}>
      <:body as |B|>
        <B.Tr>
          <B.Td>
            <LinkTo
              @route="org-list.org"
              @model={{B.data.id}}
              class="org-id-link"
            >
              {{B.data.id}}
            </LinkTo>
          </B.Td>
          <B.Td>{{B.data.organization}}</B.Td>
          <B.Td>{{B.data.industry}}</B.Td>
          <B.Td>{{B.data.employeeCount}}</B.Td>
          <B.Td>{{B.data.location}}</B.Td>
          <B.Td>
            <HdsLayoutFlex @gap="16">
              <HdsButton
                @text="Edit Org"
                @icon="pencil-tool"
                @color="secondary"
                @isIconOnly={{true}}
                {{on "click" (fn this.orgData.toggleEditMode B.data.id)}}
              />
              <HdsButton
                @text="Delete Org"
                @icon="trash"
                @color="critical"
                @isIconOnly={{true}}
                {{on "click" (fn this.deleteOrg B.data.id)}}
              />
            </HdsLayoutFlex>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
    <EditOrg />
  </template>
}
