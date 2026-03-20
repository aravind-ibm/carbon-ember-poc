import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class OrgListIndexRoute extends Route {
  @service store;
  @service orgData;

  async model() {
    // Load organizations from API via Ember Data
    return this.store.findAll('org', { reload: true });
  }

  async afterModel() {
    // Reload organizations in the service to ensure UI is in sync
    await this.orgData.loadOrganizations();
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }
}
