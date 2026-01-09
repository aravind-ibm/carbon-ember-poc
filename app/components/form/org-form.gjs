import Component from '@glimmer/component';

import {
  HdsLayoutFlex,
  HdsFormTextInputField,
  HdsButton,
} from '@hashicorp/design-system-components/components';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { on } from '@ember/modifier';
import ConfirmationBox from '../confirmation-box';

export default class OrgForm extends Component {
  @service orgData;
  @service notification;
  @service router;
  fields = [
    { value: 'organizationValue', error: 'organizationError' },
    { value: 'industryValue', error: 'industryError' },
    { value: 'locationValue', error: 'locationError' },
    { value: 'employeeCountValue', error: null },
  ];
  @tracked title = 'Add New Organization';
  @tracked organizationValue = '';
  @tracked organizationError = false;
  @tracked industryValue = '';
  @tracked industryError = false;
  @tracked employeeCountValue = '0';
  @tracked locationValue = '';
  @tracked locationError = false;
  @action
  updateValue(event) {
    const { name, value } = event.target;
    this[name] = value;

    // Optional: Reset error state when user types
    if (name === 'organizationValue') {
      this.organizationError = this.validateOrgName(value);
    }
  }
  get showInvalidOrgError() {
    return this.validateOrgName(this.organizationValue);
  }
  get successMessage() {
    return this.orgData.activeOrgId
      ? 'Changes to the organization were saved successfully.'
      : 'The new organization has been saved successfully.';
  }
  // Simple validation example
  validateOrgName(value) {
    const lettersOnly = /^[A-Za-z\s]*$/;
    return !lettersOnly.test(value);
  }
  validateRequiredFields() {
    let isAllValid = true;

    this.fields.forEach((field) => {
      // Check if string is empty or just whitespace
      const rawValue = this[field.value];
      const value = String(rawValue ?? '');
      const isInvalid = value?.trim()?.length === 0;
      // Update the tracked error property
      if (!field.error) return;
      this[field.error] = isInvalid;

      if (isInvalid) {
        isAllValid = false;
      }
    });

    return isAllValid;
  }
  @action
  editSubmitAction() {
    const editedData = {
      organization: this.organizationValue,
      industry: this.industryValue,
      employeeCount: this.employeeCountValue,
      location: this.locationValue,
    };
    this.orgData.saveEditedOrg(editedData);
    this.notification.showToastMessageHandler(
      'Success',
      'Organization saved successfully',
      'success'
    );
  }
  @action
  saveSubmitAction() {
    const newdData = {
      organization: this.organizationValue,
      industry: this.industryValue,
      employeeCount: this.employeeCountValue,
      location: this.locationValue,
    };
    this.orgData.saveNewOrg(newdData);
    this.router.transitionTo('org-list');
    this.notification.showToastMessageHandler(
      'Success',
      'Organization added successfully',
      'success'
    );
  }
  @action
  handleSave() {
    const isAllValid = this.validateRequiredFields();
    if (!isAllValid) return;
    if (this.orgData.activeOrgId) {
      this.editSubmitAction();
    } else {
      this.saveSubmitAction();
    }
  }

  @action
  reset() {
    this.fields.forEach((field) => {
      if (field.value === 'employeeCountValue') {
        this[field.value] = 0;
      } else {
        this[field.value] = '';
      }
      if (!field.error) return;
      this[field.error] = false;
    });
  }

  constructor() {
    super(...arguments); // Required to access this.args

    if (this.orgData.activeOrgId) {
      const org = this.orgData.getOrgById();
      this.title = 'Edit Organization';
      this.organizationValue = org.organization ?? '';
      this.industryValue = org.industry ?? '';
      this.employeeCountValue = org.employeeCount ?? 0;
      this.locationValue = org.location ?? '';
      this.orgData;
    }
  }
  <template>
    <h2 class="form-title">{{this.title}}</h2>
    <form>

      <HdsLayoutFlex @gap="16" @direction="column" class="form-layout">
        <HdsFormTextInputField
          @type="text"
          @value={{this.organizationValue}}
          @isInvalid={{this.organizationError}}
          name="organizationValue"
          {{on "input" this.updateValue}}
          @isRequired={{true}}
          as |F|
        >
          <F.Label>Org Name</F.Label>
          {{#if this.showInvalidOrgError}}
            <F.Error>The provided org name is invalid. It should contain only
              letters</F.Error>
          {{/if}}
        </HdsFormTextInputField>
        <HdsFormTextInputField
          @type="text"
          @value={{this.industryValue}}
          name="industryValue"
          {{on "input" this.updateValue}}
          @isInvalid={{this.industryError}}
          @isRequired={{true}}
          as |F|
        >
          <F.Label>Industry</F.Label>
        </HdsFormTextInputField>
        <HdsFormTextInputField
          @type="text"
          @value={{this.employeeCountValue}}
          name="employeeCountValue"
          {{on "input" this.updateValue}}
          @isRequired={{true}}
          as |F|
        >
          <F.Label>Employee Count</F.Label>
        </HdsFormTextInputField>
        <HdsFormTextInputField
          @type="text"
          @value={{this.locationValue}}
          name="locationValue"
          @isInvalid={{this.locationError}}
          {{on "input" this.updateValue}}
          @isRequired={{true}}
          as |F|
        >
          <F.Label>Location</F.Label>
        </HdsFormTextInputField>
        <HdsLayoutFlex @gap="16">
          <HdsButton @text="Save Org" {{on "click" this.handleSave}} />
          <HdsButton
            @text="Reset"
            {{on "click" this.reset}}
            @color="secondary"
          />
        </HdsLayoutFlex>
      </HdsLayoutFlex>
    </form>

    {{!-- <ConfirmationBox
      @isModalOpen={{this.isModalOpen}}
      @closeModal={{this.toggleMessageModal}}
      @handleConfirmation={{this.toggleMessageModal}}
      @title=""
      @message={{this.successMessage}}
    /> --}}
  </template>
}
