import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  cssNamespace: 'c-vault-listing',
  classNameBindings: ['cssNamespace'],
  actions: {
    newVault() {
      this.attrs.newVaultAction();
    }
  }
});
