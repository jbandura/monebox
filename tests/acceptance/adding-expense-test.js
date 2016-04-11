import { test } from 'qunit';
import moduleForAcceptance from 'coms2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'coms2/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | adding expense', {
  beforeEach() {
    authenticateSession(this.application);
    visit('/');
  }
});

test('visiting / takes us to dashboard if authenticated', function(assert) {
  assert.equal(currentRouteName(), 'dashboard');
});

test('adding expense', function(assert) {
  fillIn('.js-expense-name', 'Test Expense');
  click('.js-add-expense');

  andThen(() => {
    assert.equal(find('.js-expenses tr').length, 1, 'expense is added');
  });
});

