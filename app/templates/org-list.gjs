import { pageTitle } from 'ember-page-title';
import OrgList from '../components/org-list';

<template>
  {{pageTitle "OrgList"}}
  {{outlet}}
  <OrgList />
</template>
