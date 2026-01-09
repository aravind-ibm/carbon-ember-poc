import Component from '@glimmer/component';
import {
  HdsLayoutFlex,
  HdsApplicationState,
} from '@hashicorp/design-system-components/components';
import OrgTable from './org-table';
import OrgGraph from './org-graph';
import Search from './org-list-header';
import { inject as service } from '@ember/service';

export default class OrgList extends Component {
  @service orgData;

  <template>
    <HdsLayoutFlex @gap="8" @direction="column">
      <Search />
      {{#if this.orgData.filteredOrgData.length}}
        <OrgTable @orgList={{this.orgData.filteredOrgData}} />
        <OrgGraph @orgList={{this.orgData.filteredOrgData}} />
      {{else}}
        <div class="application-state-wrapper">
          <HdsApplicationState @align="left" @isAutoCentered={{false}} as |A|>
            <A.Header @title="No organizations found" />
            <A.Body
              @text="{{if
                this.orgData.searchTerm
                'No organizations match your search criteria.'
                "You haven't created any organizations yet."
              }}"
            />
            {{#unless this.orgData.searchTerm}}
              <A.Footer as |F|>
                <F.LinkStandalone
                  @icon="plus"
                  @text="Create Organization"
                  @route="create-org"
                  @iconPosition="leading"
                />
              </A.Footer>
            {{/unless}}
          </HdsApplicationState>
        </div>
      {{/if}}
    </HdsLayoutFlex>
  </template>
}
