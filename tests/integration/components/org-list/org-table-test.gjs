import { module, test } from 'qunit';
import { setupRenderingTest } from 'onboarding-exercise/tests/helpers';
import { render } from '@ember/test-helpers';
import OrgTable from 'onboarding-exercise/components/org-table';

module('Integration | Component | org-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Updating values is achieved using autotracking, just like in app code. For example:
    // class State { @tracked myProperty = 0; }; const state = new State();
    // and update using state.myProperty = 1; await rerender();
    // Handle any actions with function myAction(val) { ... };

    await render(<template><OrgTable /></template>);

    assert.dom().hasText('');

    // Template block usage:
    await render(<template>
      <OrgTable>
        template block text
      </OrgTable>
    </template>);

    assert.dom().hasText('template block text');
  });
});
