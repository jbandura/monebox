import Ember from 'ember';
import AuthenticatedRoute from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRoute);
