import { module, test } from 'qunit';
import { setupRenderingTest } from 'onboarding-exercise/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { setupRouter } from 'ember-router-helpers/test-support';
import NavBar from 'onboarding-exercise/components/nav-bar';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);
  setupRouter(hooks);

  test('it renders the navigation title', async function (assert) {
    await render(<template><NavBar /></template>);

    assert.dom('[data-test-title]').hasText('ORG BOARD');
  });

  test('it renders navigation links', async function (assert) {
    await render(<template><NavBar /></template>);

    // Test that navigation links are present
    assert.dom('[data-test-link="org-list"]').hasText('Org List');
    assert.dom('[data-test-link="create-org"]').hasText('Add Org');

    // Test that links have correct icons
    assert.dom('[data-test-link="org-list"] .hds-icon').exists();
    assert.dom('[data-test-link="create-org"] .hds-icon').exists();
  });

  test('navigation links have correct routes', async function (assert) {
    await render(<template><NavBar /></template>);

    // Test route attributes (this would need the actual HDS component structure)
    assert.dom('[data-test-link="org-list"]').hasAttribute('href', '/org-list');
    assert
      .dom('[data-test-link="create-org"]')
      .hasAttribute('href', '/create-org');
  });
});
