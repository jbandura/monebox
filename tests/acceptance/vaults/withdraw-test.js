import { test } from 'qunit';
import moduleForAcceptance from 'moneybox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'moneybox/tests/helpers/ember-simple-auth';

function fillInAndBlur(selector, content) {
  fillIn(selector, content);
  triggerEvent(selector, 'blur');
  triggerEvent(selector, 'change');
}

let vault;

moduleForAcceptance('Acceptance | withdrawing funds from vault', {
  beforeEach() {
    authenticateSession(this.application);
    vault = server.create('vault', { name: 'Test Vault', startState: 1000, user_id: 1 });
  }
});

test('visiting withdraw page from dashboard', function(assert) {
  visit('/');
  andThen(() => click('.js-withdraw'));
  andThen(() => assert.equal(currentRouteName(), 'vault.withdraw'));
});

test('withdrawing money', function(assert) {
  assert.expect(7);
  server.post('/vault_operations', function(db, request) {
    const params = JSON.parse(request.requestBody).vault_operation;
    assert.equal(params.type, 'withdrawal');
    assert.equal(params.amount, 100);
    assert.equal(parseInt(params.vault_id), vault.id);
  });
  visit(`vault/${vault.id}/withdraw`);
  andThen(() => {
    assert.equal(currentRouteName(), 'vault.withdraw');
    assert.ok(
      find(`h1:contains('Withdraw from ${vault.name}')`).length,
      'vault name should be displayed properly'
    );
    fillInAndBlur('.js-amount input', 100);
    click('.js-submit');
    andThen(() => {
      assert.equal(currentRouteName(), 'dashboard');
      assert.ok(
        find('.alert-success').length,
        'success message should be displayed after withdrawing'
      );
    });
  });
});

