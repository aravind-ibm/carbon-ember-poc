import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class OrgListIndexController extends Controller {
  @service orgData;
  @service router;

  // Query parameters that will be reflected in the URL
  queryParams = ['page', 'limit', 'sortBy', 'sortOrder', 'industry'];

  @tracked page = 1;
  @tracked limit = 5;
  @tracked sortBy = ''; // No default sort
  @tracked sortOrder = 'asc'; // 'asc' or 'desc'
  @tracked industry = 'All Industries'; // Filter by industry

  constructor() {
    super(...arguments);
  }

  // Available industries for filtering
  get availableIndustries() {
    if (
      !this.orgData ||
      !this.orgData.orgData ||
      !Array.isArray(this.orgData.orgData)
    ) {
      return ['All Industries'];
    }
    const industries = this.orgData.orgData.map((org) => org.industry);
    const uniqueIndustries = [...new Set(industries)].filter(Boolean).sort();
    const result = ['All Industries', ...uniqueIndustries];
    return result;
  }

  // Get filtered data based on search and industry filter
  get filteredData() {
    if (
      !this.orgData.filteredOrgData ||
      !Array.isArray(this.orgData.filteredOrgData)
    ) {
      return [];
    }

    let data = this.orgData.filteredOrgData; // Already filtered by search

    // Apply industry filter (skip if "All Industries" is selected)
    if (this.industry && this.industry !== 'All Industries') {
      data = data.filter((org) => org.industry === this.industry);
    }

    return data;
  }

  // Get sorted data
  get sortedData() {
    const data = [...this.filteredData];

    // Only sort if sortBy is specified
    if (this.sortBy) {
      data.sort((a, b) => {
        let aValue = a[this.sortBy];
        let bValue = b[this.sortBy];

        // Handle numeric sorting for employeeCount
        if (this.sortBy === 'employeeCount') {
          aValue = Number(aValue) || 0;
          bValue = Number(bValue) || 0;
        } else {
          // String sorting (case-insensitive)
          aValue = String(aValue || '').toLowerCase();
          bValue = String(bValue || '').toLowerCase();
        }

        if (aValue < bValue) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }

  // Pagination calculations
  get totalItems() {
    return this.sortedData.length;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit) || 1;
  }

  get startIndex() {
    return (this.page - 1) * this.limit;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.limit, this.totalItems);
  }

  // Get paginated data
  get paginatedData() {
    return this.sortedData.slice(this.startIndex, this.endIndex);
  }

  get hasPreviousPage() {
    return this.page > 1;
  }

  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get pageInfo() {
    if (this.totalItems === 0) {
      return 'No organizations';
    }
    return `Showing ${this.startIndex + 1}-${this.endIndex} of ${this.totalItems}`;
  }
  get queryFunction() {
    return (page, size) => {
      return { page, size };
    };
  }

  // Actions
  @action
  goToPage(pageNumber) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
    }
  }

  @action
  nextPage() {
    if (this.hasNextPage) {
      this.page += 1;
    }
  }

  @action
  previousPage() {
    if (this.hasPreviousPage) {
      this.page -= 1;
    }
  }

  @action
  changeLimit(event) {
    // HDS components pass the event object
    const value = event?.target?.value ?? event;
    this.limit = Number(value);
    this.page = 1; // Reset to first page when changing limit
  }

  @action
  changeSortBy(event) {
    // HDS components pass the event object
    const value = event?.target?.value ?? event;
    this.sortBy = value;
    this.page = 1; // Reset to first page when changing sort
  }

  @action
  changeSortOrder(event) {
    // HDS components pass the event object
    const value = event?.target?.value ?? event;
    this.sortOrder = value;
    this.page = 1; // Reset to first page when changing sort order
  }

  @action
  changeIndustryFilter(event) {
    // HDS components pass the event object
    const value = event?.target?.value ?? event;
    this.industry = value;
    this.page = 1; // Reset to first page when changing filter
  }

  @action
  clearFilters() {
    this.industry = 'All Industries';
    this.sortBy = '';
    this.sortOrder = 'asc';
    this.page = 1;
    this.orgData.updateSearchTerm('');
  }
}
