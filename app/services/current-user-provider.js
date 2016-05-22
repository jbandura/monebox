import Ember from 'ember';

const {
  Service,
  computed,
  inject: { service }
} = Ember;

export default Service.extend({
  store: service(),
  session: service(),
  currentUser: computed('session.data', function() {
    const userData = this.get('session.data').authenticated.user;
    return this.get('store').createRecord(
      'user',
      JSON.parse(userData).user
    );
  })
});
