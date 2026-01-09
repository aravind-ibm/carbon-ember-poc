import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import {
  getStoredOrgs,
  updateOrg,
  createOrg,
  deleteOrg,
} from '../helpers/local-storage';

export default class OrgDataService extends Service {
  @tracked orgData = [];
  @tracked isEditModeEnabled = false;
  @tracked isDeleteModeEnabled = false;
  @tracked activeOrgId = null;
  @tracked searchTerm = '';
  constructor() {
    super(...arguments);
    this.orgData = getStoredOrgs();
  }
  get filteredOrgData() {
    const query = this.searchTerm.toLowerCase().trim();

    if (!query) {
      return this.orgData;
    }

    return this.orgData.filter((org) => {
      return (
        org.organization?.toLowerCase().includes(query) ||
        org.location?.toLowerCase().includes(query)
      );
    });
  }
  getOrgById(id) {
    return this.orgData.find((org) => org.id === id);
  }
  @action
  toggleEditMode(id = null) {
    this.isEditModeEnabled = !this.isEditModeEnabled;
    if (this.isEditModeEnabled) {
      this.activeOrgId = id;
    } else {
      this.activeOrgId = null;
    }
  }
  @action
  saveEditedOrg(orgData) {
    this.orgData = updateOrg(this.activeOrgId, orgData);
    this.updateSearchTerm('');
    this.toggleEditMode();
  }
  @action
  saveNewOrg(newOrgData) {
    this.orgData = createOrg(newOrgData);
    this.updateSearchTerm('');
  }

  @action
  deleteOrgById(id) {
    this.orgData = deleteOrg(id);
    this.updateSearchTerm('');
  }

  @action
  searchHandler(event) {
    const value = event.target.value;
    debounce(this, this.updateSearchTerm, value, 300);
  }
  @action
  updateSearchTerm(value) {
    this.searchTerm = value;
  }
}
