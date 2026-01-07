import Component from '@glimmer/component';
import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';
import OrgTable from './org-table';
import OrgGraph from './org-graph';
import Search from './org-list-header';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class OrgList extends Component {
  @service orgData;

  <template>
    <HdsLayoutFlex @gap="8" @direction="column">
      <Search />
      <OrgTable @orgList={{this.orgData.filteredOrgData}} />
      <OrgGraph @orgList={{this.orgData.filteredOrgData}} /></HdsLayoutFlex>
  </template>
}
