import { HdsAppSideNavList } from '@hashicorp/design-system-components/components';

<template>
  <HdsAppSideNavList as |Nav|>
    <Nav.Link @icon="dashboard" @text="ORG BOARD" @isActive={{true}} />
    <Nav.Link @text="Org List" @icon="list" @route="org-list" />
    <Nav.Link @text="Add Org" @icon="plus" @route="create-org" />
  </HdsAppSideNavList>
</template>
