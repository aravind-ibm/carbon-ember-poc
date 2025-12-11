import { pageTitle } from 'ember-page-title';
import {
  HdsAppFrame,
  HdsAppHeader,
  HdsAppSideNav
} from '@hashicorp/design-system-components/components';

<template>
  {{pageTitle "Onboarding Exercise"}}

  {{outlet}}

  <HdsAppFrame as |Frame| >
    <Frame.Header>
      <HdsAppHeader></HdsAppHeader>
    </Frame.Header>
    <Frame.Sidebar>
      <HdsAppSideNav></HdsAppSideNav>
    </Frame.Sidebar>
    <Frame.Main>
    </Frame.Main>
    <Frame.Footer>
    </Frame.Footer>
  </HdsAppFrame>
</template>
