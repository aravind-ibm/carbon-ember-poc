import {
  HdsModal,
  HdsButton,
} from '@hashicorp/design-system-components/components';
import { on } from '@ember/modifier';

<template>
  {{#if @isModalOpen}}
    <HdsModal id="basic-modal" @onClose={{@closeModal}} as |M|>
      {{#if @title}}
        <M.Header>
          {{@title}}
        </M.Header>
      {{/if}}
      <M.Body>
        <div class="hds-typography-body-300 hds-foreground-primary">
          {{@message}}
        </div>
      </M.Body>
      <M.Footer>
        <HdsButton
          type="button"
          @text="Close"
          @color="secondary"
          {{on "click" @closeModal}}
          {{on "click" @handleConfirmation}}
        />
      </M.Footer>
    </HdsModal>
  {{/if}}
</template>
