import { test } from 'qunit';
import moduleForAcceptance from 'coms2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'coms2/tests/helpers/ember-simple-auth';

function fillInAndBlur(selector, content) {
  fillIn(selector, content);
  triggerEvent(selector, 'blur');
  triggerEvent(selector, 'change');
}

moduleForAcceptance('Acceptance | creating vault', {
  beforeEach() {
    authenticateSession(this.application);
    server.create('vault', { name: 'Test Vault', state: 1000});
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

moduleForAcceptance('Acceptance | editing vault', {
  beforeEach() {
    authenticateSession(this.application);
    const vault = server.create('vault', { name: 'Test Vault', state: 1000});
    visit(`vault/${vault.id}/edit/`);
  }
});


test('edit vault form has all data filled in', function(assert) {
  const actualName = find('.js-vault-name input').val().trim();
  const actualState = find('.js-start-state input').val().trim();

  assert.equal(actualName, 'Test Vault');
  assert.equal(actualState, '1000');
});

