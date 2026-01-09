import { pageTitle } from 'ember-page-title';
import {
  HdsAppFrame,
  HdsAppHeader,
  HdsAppSideNav,
} from '@hashicorp/design-system-components/components';
import NavBar from '../components/nav-bar';

<template>
  <HdsAppFrame as |Frame|>
    <Frame.Header>
      <HdsAppHeader />
    </Frame.Header>
    <Frame.Sidebar>
      <HdsAppSideNav>
        <NavBar />
      </HdsAppSideNav>
    </Frame.Sidebar>
    <Frame.Main>
      <div class="main-container">
        {{outlet}}
      </div>
    </Frame.Main>
    <Frame.Footer />
  </HdsAppFrame>
</template>
