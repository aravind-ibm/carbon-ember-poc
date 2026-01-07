import { module, test } from 'qunit';
import { setupTest } from 'onboarding-exercise/tests/helpers';

module('Unit | Route | org-list', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:org-list');
    assert.ok(route);
  });
});
