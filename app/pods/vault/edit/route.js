import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('vault', params.vault_id);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('vault', model);
  },

  actions: {
    save() {
    }
  }
});
