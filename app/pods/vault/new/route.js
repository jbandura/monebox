import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  store: service(),
  currentUserProvider: service(),
  actions: {
    submit(formData) {
      const { name, state } =  formData.getProperties('name', 'state');
      const newVault = this.get('store').createRecord('vault', {
        name,
        startState: state,
        user: this.get('currentUserProvider.currentUser')
      });
      newVault.save().then(() => {
        this.transitionTo('dashboard');
      });
    }
  }
});
