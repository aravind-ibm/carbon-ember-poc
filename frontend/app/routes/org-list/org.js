import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OrgListOrgRoute extends Route {
  @service orgData;

  model(params) {
    const org = this.orgData.getOrgById(params.org_id);
    return org;
  }
}
