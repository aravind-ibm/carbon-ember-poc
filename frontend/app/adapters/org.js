import RESTAdapter from '@ember-data/adapter/rest';

export default class OrgAdapter extends RESTAdapter {
  host = 'http://localhost:3000';
  namespace = 'api';

  // Customize the URL for organizations
  pathForType() {
    return 'organizations';
  }

  // Add headers if needed
  get headers() {
    return {
      'Content-Type': 'application/json',
    };
  }
}
