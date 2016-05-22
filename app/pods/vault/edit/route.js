import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  currentUserProvider: service(),
  flashMessages: service(),
  model(params) {
    return this.store.findRecord('vault', params.vault_id);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('vault', model);
  },

  saveVaultTask: task(function * (formData) {
    try {
      let vault = this.modelFor('vault/edit');
      vault.setProperties({
        startState: formData.get('state'),
        name: formData.get('name'),
        user: this.get('currentUserProvider.currentUser')
      });
      yield vault.save();
      this.transitionTo('dashboard');
      this.get('flashMessages').success('Vault has been saved!');
    } catch(e) {
      this.get('flashMessages').danger('There has been an error. Please try again later.');
    }
  }).drop(),

  deleteVaultTask: task(function * () {
    try {
      let vault = this.modelFor('vault/edit');
      yield vault.destroyRecord();
      this.transitionTo('dashboard');
      this.get('flashMessages').success('Vault has been removed!');
    } catch(e) {
      this.get('flashMessages').danger('There has been an error. Please try again later.');
    }
  }).drop(),

  actions: {
    save(formData) {
      this.get('saveVaultTask').perform(formData);
    },

    delete() {
      this.get('deleteVaultTask').perform();
    }
  }
});
