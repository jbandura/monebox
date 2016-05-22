import { test } from 'qunit';
import moduleForAcceptance from 'coms2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'coms2/tests/helpers/ember-simple-auth';
import Ember from 'ember';

function fillInAndBlur(selector, content) {
  fillIn(selector, content);
  triggerEvent(selector, 'blur');
  triggerEvent(selector, 'change');
}

const currentUserStub = (userStub) => {
  return Ember.Service.extend({
    currentUser: userStub
  });
};

function stubCurrentUser(app, userStub) {
  app.register('service:mock-current-user-provider', currentUserStub(userStub));
  app.inject('route', 'currentUserProvider', 'service:mock-current-user-provider');
}

moduleForAcceptance('Acceptance | creating vault', {
  beforeEach() {
    stubCurrentUser(this.application, { id: 1, email: 'testuser@email.com' });
    authenticateSession(this.application);
    server.create('vault', { name: 'Test Vault', state: 1000, user_id: 1 });
    visit('/');
  }
});

test('visiting / takes us to dashboard if authenticated', function(assert) {
  assert.equal(currentRouteName(), 'dashboard');
});

test('clicking add new vault button takes us to new vault creation', function(assert) {
  click('.js-create-vault');

  andThen(() => {
    assert.equal(currentRouteName(), 'vault.new');
  });
});

test('adding new vault', function(assert) {
  click('.js-create-vault');

  andThen(() => {
    assert.equal(currentRouteName(), 'vault.new');
    fillInAndBlur('.js-vault-name input', 'Test Vault');
    fillInAndBlur('.js-start-state input', '1000');

    click('.js-submit');

    andThen(() => {
      assert.equal(currentRouteName(), 'dashboard');
      const newVault = find('.js-vault').last();
      const vaultName = newVault.find('.js-vault-name').text().trim();

      assert.equal(vaultName, 'Test Vault');
    });
  });
});

test('clicking edit takes user to edit vault form', function(assert) {
  click(find('.js-vault').last().find('.js-edit-vault'));

  andThen(() => {
    assert.equal(currentRouteName(), 'vault.edit');
  });
});

