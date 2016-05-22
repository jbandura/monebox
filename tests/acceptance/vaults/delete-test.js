import { test } from 'qunit';
import moduleForAcceptance from 'coms2/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'coms2/tests/helpers/ember-simple-auth';

function fillInAndBlur(selector, content) {
  fillIn(selector, content);
  triggerEvent(selector, 'blur');
  triggerEvent(selector, 'change');
}

let vault;

moduleForAcceptance('Acceptance | creating vault', {
  beforeEach() {
    authenticateSession(this.application);
    vault = server.create('vault', { name: 'Test Vault', startState: 1000, user_id: 1 });
    visit(`/vault/${vault.id}/edit`);
  }
});

test('when deleting vault:', function(assert) {
  server.delete('/vaults/:id', (db, req) => {
    assert.equal(req.params.id, vault.id, 'the delete action is called with proper id');
  });
  click('.js-delete');

  andThen(() => {
    assert.ok(find('.alert-success').length, 'success message is displayed');
  });
});

