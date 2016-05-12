import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  cssNamespace: 'c-vault-item',
  classNames: ['js-vault'],
  classNameBindings: ['cssNamespace'],

  actions: {
    editVaultAction(id) {
      this.attrs.editVaultAction(id);
    }
  }
});
