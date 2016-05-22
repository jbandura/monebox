import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  type: 'withdrawal',
  amount: 200
});
