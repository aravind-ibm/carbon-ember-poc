import { array } from '@ember/helper';
import {
  HdsLayoutFlex,
  HdsPaginationNumbered,
} from '@hashicorp/design-system-components/components';

<template>
  <div class="pagination-container">
    <HdsLayoutFlex
      @alignItems="center"
      @justifyContent="space-between"
      @gap="16"
      @wrap="wrap"
    >

      <HdsPaginationNumbered
        @currentPage={{@currentPage}}
        @currentPageSize={{@limit}}
        @totalItems={{@totalItems}}
        @onPageChange={{@onGoToPage}}
        @onPageSizeChange={{@onChangeLimit}}
        @pageSizes={{array 5 10 20 50}}
        @showSizeSelector={{true}}
        @ariaLabel="Pagination"
        @route={{@route}}
        @queryFunction={{@queryFunction}}
      />
    </HdsLayoutFlex>
  </div>
</template>
