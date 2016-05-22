import Ember from 'ember';
import AuthenticatedRoute from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRoute, {
  store: service(),
  model() {
    return this.get('store').findAll('vault');
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('vaults', model);
  },

  actions: {
    transitionToNewVault() {
      this.transitionTo('vault.new');
    },

    transitionToEditVault(id) {
      this.transitionTo('vault.edit', id);
    },

    transitionToWithdraw(id) {
      this.transitionTo('vault.withdraw', id);
    }
  }
});
