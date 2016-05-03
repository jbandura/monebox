import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  store: service(),
  actions: {
    submit(formData) {
      const newVault = this.get('store').createRecord(
        'vault',
        formData.getProperties('name', 'state')
      );
      newVault.save().then(() => {
        this.transitionTo('dashboard');
      });
    }
  }
});
