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
    save(formData) {
      let vault = this.modelFor('vault/edit');
      vault.setProperties(
        formData.getProperties('name', 'state')
      );
      vault.save().then(() => {
        this.transitionTo('dashboard');
      });
    }
  }
});
