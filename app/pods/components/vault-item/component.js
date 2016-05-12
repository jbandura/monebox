import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  cssNamespace: 'c-vault',
  classNames: ['js-vault', 'cssNamespace'],

  actions: {
    editVaultAction(id) {
      this.attrs.editVaultAction(id);
    }
  }
});
