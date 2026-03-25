import Service, { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';

export default class OrgDataService extends Service {
  @service store;

  @tracked orgData = [];
  @tracked isEditModeEnabled = false;
  @tracked isDeleteModeEnabled = false;
  @tracked activeOrgId = null;
  @tracked searchTerm = '';
  @tracked isLoading = false;
  @tracked error = null;

  constructor() {
    super(...arguments);
    this.loadOrganizations();
  }

  // Load all organizations from API
  @action
  async loadOrganizations() {
    this.isLoading = true;
    this.error = null;
    try {
      const orgs = await this.store.findAll('org', { reload: true });
      // Convert to plain array to ensure reactivity
      this.orgData = orgs.map((org) => {
        return {
          id: org.id || org.get('id'), // Try both ways to get ID
          organization: org.organization,
          location: org.location,
          employees: org.employees,
          industry: org.industry,
          employeeCount: org.employees, // Add employeeCount for table
        };
      });
    } catch (error) {
      console.error('Failed to load organizations:', error);
      this.error = 'Failed to load organizations';
    } finally {
      this.isLoading = false;
    }
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
    // Return the plain object from orgData array, not the Ember Data record
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
  async saveEditedOrg(orgData) {
    this.isLoading = true;
    this.error = null;
    try {
      const org = await this.store.findRecord('org', this.activeOrgId);

      // Update properties
      org.organization = orgData.organization;
      org.location = orgData.location;
      org.employees = Number(orgData.employeeCount) || 0; // Convert to number and use employeeCount
      org.industry = orgData.industry;

      // Save to API
      await org.save();

      // Reload the list
      await this.loadOrganizations();

      this.updateSearchTerm('');
      this.toggleEditMode();
    } catch (error) {
      console.error('Failed to update organization:', error);
      this.error = 'Failed to update organization';
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async saveNewOrg(newOrgData) {
    this.isLoading = true;
    this.error = null;
    try {
      // Create new record
      const newOrg = this.store.createRecord('org', {
        organization: newOrgData.organization,
        location: newOrgData.location,
        employees: Number(newOrgData.employeeCount) || 0, // Convert to number and use employeeCount
        industry: newOrgData.industry,
      });

      // Save to API
      await newOrg.save();

      // Reload the list
      await this.loadOrganizations();

      this.updateSearchTerm('');
    } catch (error) {
      console.error('Failed to create organization:', error);
      this.error = 'Failed to create organization';
    } finally {
      this.isLoading = false;
    }
  }

  @action
  async deleteOrgById(id) {
    this.isLoading = true;
    this.error = null;
    try {
      const org = await this.store.findRecord('org', id);
      await org.destroyRecord();

      // Reload the list
      await this.loadOrganizations();

      this.updateSearchTerm('');
    } catch (error) {
      console.error('Failed to delete organization:', error);
      this.error = 'Failed to delete organization';
    } finally {
      this.isLoading = false;
    }
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
