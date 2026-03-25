import { HdsToast } from '@hashicorp/design-system-components/components';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { fn } from '@ember/helper';

export default class Notification extends Component {
  @service notification;

  <template>
    <div class="toast-container">
      {{#each this.notification.toasts as |toast|}}
        <div class="toast-item">
          <HdsToast
            @color={{toast.color}}
            @icon={{false}}
            @onDismiss={{fn this.notification.dismissToast toast.id}}
            as |T|
          >
            <T.Title>{{toast.title}}</T.Title>
            <T.Description>{{toast.message}}</T.Description>
          </HdsToast>
        </div>
      {{/each}}
    </div>
  </template>
}
