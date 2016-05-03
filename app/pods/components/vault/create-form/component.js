import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  isValid: false,
  formData: computed('vault', function() {
    if(this.get('vault')) {
      return Ember.Object.create(
        this.get('vault').getProperties('name', 'state')
      );
    }
    return Ember.Object.create({
      name: null,
      state: 0
    });
  }),
  rules: {
    vaultName: 'required',
    startState: 'numeric'
  },

  actions: {
    submit(formData) {
      this.attrs.onSubmit(formData);
    },

    valueChanged(name, value) {
      const data = this.get('formData');
      data.set(name, value);
      this.set('formData', data);
    }
  }
});
