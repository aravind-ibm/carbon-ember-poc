import EmberRouter from '@embroider/router';
import config from 'onboarding-exercise/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('org-list', { path: '/org/' }, function () {
    this.route('org', { path: '/:org_id' });
  });
  this.route('create-org');
  this.route('not-found', { path: '/*' });
});
