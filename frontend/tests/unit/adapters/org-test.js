import { setupTest } from 'onboarding-exercise/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Adapter | org', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:org');
    assert.ok(adapter, 'adapter exists');
  });
});
