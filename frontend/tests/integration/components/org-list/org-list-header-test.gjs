import { module, test } from 'qunit';
import { setupRenderingTest } from 'onboarding-exercise/tests/helpers';
import { render } from '@ember/test-helpers';
import OrgListHeader from 'onboarding-exercise/components/org-list/org-list-header';

module('Integration | Component | org-list/org-list-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Updating values is achieved using autotracking, just like in app code. For example:
    // class State { @tracked myProperty = 0; }; const state = new State();
    // and update using state.myProperty = 1; await rerender();
    // Handle any actions with function myAction(val) { ... };

    await render(<template><OrgListHeader /></template>);

    assert.dom().hasText('');

    // Template block usage:
    await render(
      <template>
        <OrgListHeader>
          template block text
        </OrgListHeader>
      </template>
    );

    assert.dom().hasText('template block text');
  });
});
