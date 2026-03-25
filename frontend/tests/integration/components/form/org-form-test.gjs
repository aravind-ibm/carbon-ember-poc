import { module, test } from 'qunit';
import { setupRenderingTest } from 'onboarding-exercise/tests/helpers';
import { render } from '@ember/test-helpers';
import OrgForm from 'onboarding-exercise/components/form/org-form';

module('Integration | Component | form/org-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Updating values is achieved using autotracking, just like in app code. For example:
    // class State { @tracked myProperty = 0; }; const state = new State();
    // and update using state.myProperty = 1; await rerender();
    // Handle any actions with function myAction(val) { ... };

    await render(<template><OrgForm /></template>);

    assert.dom().hasText('');

    // Template block usage:
    await render(<template>
      <OrgForm>
        template block text
      </OrgForm>
    </template>);

    assert.dom().hasText('template block text');
  });
});
