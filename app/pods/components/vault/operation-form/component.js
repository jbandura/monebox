import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  currentUserProvider: service(),
  formData: { amount: null },

  actions: {
    amountUpdated(val) {
      const formData = this.get('formData');
      this.set('formData', Object.assign({}, formData, { amount: val}));
    },

    submit(formData) {
      this.get('onSave')(formData);
    }
  }
});
