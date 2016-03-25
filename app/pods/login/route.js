import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  session: service(),
  actions: {
    login() {
      let { identification, password } = { identification: 'admin@coms.local', password: '12345678' };
      this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
