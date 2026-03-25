import { pageTitle } from 'ember-page-title';
import { HdsApplicationState } from '@hashicorp/design-system-components/components';

<template>
  {{pageTitle "Page Not Found"}}

  <div class="not-found-container">
    <HdsApplicationState @align="center" as |A|>
      <A.Header @title="404 - Page Not Found" />
      <A.Body
        @text="The page you are looking for doesn't exist or has been moved."
      />
      <A.Footer as |F|>
        <F.LinkStandalone
          @icon="arrow-left"
          @text="Go to Organization List"
          @route="org-list"
          @iconPosition="leading"
        />
      </A.Footer>
    </HdsApplicationState>
  </div>

  {{outlet}}
</template>
