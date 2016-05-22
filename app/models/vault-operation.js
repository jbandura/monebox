import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  type: attr('string'),
  amount: attr('number'),
  vault: belongsTo('vault'),
  user: belongsTo('user')
});
