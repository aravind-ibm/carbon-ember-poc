import { pageTitle } from 'ember-page-title';
import {
  HdsAppFrame
} from '@hashicorp/design-system-components/components';

<template>
  {{pageTitle "Onboarding Exercise"}}

  {{outlet}}

  <HdsAppFrame as |Frame|>
    <Frame.Header>
      {{! your "header" content goes here, this is just a mock placeholder }}
      header
    </Frame.Header>
    <Frame.Sidebar>
      sidebar
    </Frame.Sidebar>
    <Frame.Main>
      main
    </Frame.Main>
    <Frame.Footer>
      footer
    </Frame.Footer>
  </HdsAppFrame>
</template>
