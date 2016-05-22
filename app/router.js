import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard', { path: '/'});
  this.route('vault', function() {
    this.route('new');
    this.route('edit', { path: ':vault_id/edit'});
    this.route('withdraw', { path: ':vault_id/withdraw' });
  });
  this.route('login');
});

export default Router;
