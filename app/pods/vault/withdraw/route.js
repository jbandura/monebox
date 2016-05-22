import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  flashMessages: service(),
  model({ vault_id: vaultId }) {
    return this.store.findRecord('vault', vaultId);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('vault', model);
  },

  withdrawTask: task(function * (formData){
    const operation = this.store.createRecord('vault-operation', {
      type: 'withdrawal',
      amount: formData.amount,
      vault: this.modelFor('vault/withdraw'),
      user: this.get('currentUserProvider.currentUser')
    });
    yield operation.save();
    this.transitionTo('dashboard');
    this.get('flashMessages').success('Withdrawal was successful!');
  }).drop(),

  actions: {
    submit(formData) { this.get('withdrawTask').perform(formData); }
  }
});

