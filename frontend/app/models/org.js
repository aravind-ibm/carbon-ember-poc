import Model, { attr } from '@ember-data/model';

export default class OrgModel extends Model {
  @attr('string') organization;
  @attr('string') location;
  @attr('string') industry;
  @attr('number') employees;
}
