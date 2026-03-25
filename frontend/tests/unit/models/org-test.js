import { setupTest } from 'onboarding-exercise/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | org', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('org', {});
    assert.ok(model, 'model exists');
  });
});
