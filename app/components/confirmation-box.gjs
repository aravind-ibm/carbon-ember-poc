import Component from '@glimmer/component';
import {
  HdsModal,
  HdsButton,
} from '@hashicorp/design-system-components/components';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { action } from '@ember/object';

export default class ConfirmationBox extends Component {
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
        <M.Footer as |F|>
          <HdsButton
            type="button"
            @text="Close"
            {{on "click" @handleConfirmation}}
          />
        </M.Footer>
      </HdsModal>
    {{/if}}
  </template>
}
