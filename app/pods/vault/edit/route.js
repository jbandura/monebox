import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  currentUserProvider: service(),
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
      vault.setProperties({
        startState: formData.get('state'),
        name: formData.get('name'),
        user: this.get('currentUserProvider.currentUser')
      });
      vault.save().then(() => {
        this.transitionTo('dashboard');
      });
    },

    delete() {
      let vault = this.modelFor('vault/edit');
      vault.destroyRecord().then(() => {
        this.transitionTo('dashboard');
      });
    }
  }
});
