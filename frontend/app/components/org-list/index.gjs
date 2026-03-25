import Component from '@glimmer/component';
import {
  HdsLayoutFlex,
  HdsApplicationState,
} from '@hashicorp/design-system-components/components';
import OrgTable from './org-table';
import OrgGraph from './org-graph';
import Search from './org-list-header';
import Pagination from './pagination';
import FilterSortControls from './filter-sort-controls';
import { inject as service } from '@ember/service';

export default class OrgList extends Component {
  @service orgData;

  queryFunction = (page, pageSize) => {
    return {
      page: page,
      limit: pageSize,
    };
  };

  <template>
    <HdsLayoutFlex @gap="16" @direction="column">
      <Search />

      {{#if this.orgData.orgData}}
        {{#if this.orgData.orgData.length}}
          <FilterSortControls
            @industries={{@availableIndustries}}
            @selectedIndustry={{@industry}}
            @sortBy={{@sortBy}}
            @sortOrder={{@sortOrder}}
            @onIndustryChange={{@changeIndustryFilter}}
            @onSortByChange={{@changeSortBy}}
            @onSortOrderChange={{@changeSortOrder}}
            @onClearFilters={{@clearFilters}}
          />

          {{#if @totalItems}}
            <OrgTable @orgList={{@paginatedData}} />

            <Pagination
              key={{@page}}
              @currentPage={{@page}}
              @totalPages={{@totalPages}}
              @totalItems={{@totalItems}}
              @limit={{@limit}}
              @hasPrevious={{@hasPreviousPage}}
              @hasNext={{@hasNextPage}}
              @onGoToPage={{@goToPage}}
              @onPrevious={{@previousPage}}
              @onNext={{@nextPage}}
              @onChangeLimit={{@changeLimit}}
              @route="org-list.index"
              @queryFunction={{this.queryFunction}}
            />

            <OrgGraph @orgList={{@sortedData}} />
          {{else}}
            <div class="application-state-wrapper">
              <HdsApplicationState
                @align="left"
                @isAutoCentered={{false}}
                as |A|
              >
                <A.Header @title="No organizations found" />
                <A.Body @text="No organizations match your filter criteria." />
              </HdsApplicationState>
            </div>
          {{/if}}
        {{else}}
          <div class="application-state-wrapper">
            <HdsApplicationState @align="left" @isAutoCentered={{false}} as |A|>
              <A.Header @title="No organizations found" />
              <A.Body @text="You haven't created any organizations yet." />
              <A.Footer as |F|>
                <F.LinkStandalone
                  @icon="plus"
                  @text="Create Organization"
                  @route="create-org"
                  @iconPosition="leading"
                />
              </A.Footer>
            </HdsApplicationState>
          </div>
        {{/if}}
      {{/if}}
    </HdsLayoutFlex>
  </template>
}
