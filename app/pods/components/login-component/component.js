import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  session: service(),
  user: null,
  password: null,
  actions: {
    login() {
      let { username, password } = this.getProperties('username', 'password');
      this.get('session').authenticate('authenticator:devise', username, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
