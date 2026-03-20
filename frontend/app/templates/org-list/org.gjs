import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';
import {
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

<template>
  {{pageTitle "Organization Details"}}

  <div class="org-detail-container">
    <HdsLayoutFlex @direction="column" @gap="24">
      <div class="org-detail-header">
        <LinkTo @route="org-list.index" class="back-to-list-link">
          <HdsButton
            @text="Back to List"
            @icon="arrow-left"
            @color="secondary"
            @size="medium"
          />
        </LinkTo>
        <h1 class="org-detail-title">Organization Details</h1>
      </div>

      {{#if @model}}
        <div class="org-detail-card">
          <div class="org-detail-content">
            <HdsLayoutFlex @direction="column" @gap="16">
              <div class="org-detail-field">
                <strong class="org-detail-label">ID:</strong>
                <span class="org-detail-value">{{@model.id}}</span>
              </div>

              <div class="org-detail-field">
                <strong class="org-detail-label">Organization:</strong>
                <span class="org-detail-value">{{@model.organization}}</span>
              </div>

              <div class="org-detail-field">
                <strong class="org-detail-label">Industry:</strong>
                <span class="org-detail-value">{{@model.industry}}</span>
              </div>

              <div class="org-detail-field">
                <strong class="org-detail-label">Employee Count:</strong>
                <span class="org-detail-value">{{@model.employeeCount}}</span>
              </div>

              <div class="org-detail-field">
                <strong class="org-detail-label">Location:</strong>
                <span class="org-detail-value">{{@model.location}}</span>
              </div>
            </HdsLayoutFlex>
          </div>
        </div>
      {{else}}
        <div class="org-detail-card">
          <p class="org-not-found">Organization not found</p>
        </div>
      {{/if}}
    </HdsLayoutFlex>
  </div>
</template>
