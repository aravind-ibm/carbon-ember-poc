import { pageTitle } from 'ember-page-title';
import {
  HdsAppFrame,
  HdsAppHeader,
  HdsAppSideNav,
} from '@hashicorp/design-system-components/components';

<template>
  {{pageTitle "Onboarding Exercise"}}

  {{outlet}}

  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader />
    </Frame.Header>
    <Frame.Sidebar>
      <HdsAppSideNav />
    </Frame.Sidebar>
    <Frame.Main />
    <Frame.Footer />
  </HdsAppFrame>
</template>
