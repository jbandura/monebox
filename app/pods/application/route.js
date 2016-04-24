import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  session: service(),

  actions: {
    logout() {
      return this.get('session').invalidate();
    }
  }
});