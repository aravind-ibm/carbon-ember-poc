import { module, test } from 'qunit';
import { setupTest } from 'onboarding-exercise/tests/helpers';

module('Unit | Service | org-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:org-data');
    assert.ok(service);
  });
});
