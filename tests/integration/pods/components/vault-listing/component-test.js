import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vault-listing', 'Integration | Component | vault listing', {
  integration: true,
  setup() {
    const vaults = [{ name: "Vault 1" }, { name: "Vault 2" }];
    this.set('vaults', vaults);
  }
});

test('it passes proper data to vault-item components', function(assert) {
  this.registry.register('template:components/vault-item', hbs`
    <div class="js-item">{{vault.name}}</div>
  `);
  this.render(hbs`{{vault-listing vaults=vaults}}`);
  const vault1 = this.$('.js-item:nth(0)').text().trim();
  const vault2 = this.$('.js-item:nth(1)').text().trim();
  assert.equal(vault1, 'Vault 1');
  assert.equal(vault2, 'Vault 2');
});

test('it shows proper amount of vaults', function(assert) {
  this.render(hbs`{{vault-listing vaults=vaults}}`);
  assert.equal(this.$('.js-vault').length, 2);
});

test('it firest proper action when add vault clicked', function(assert) {
  assert.expect(1);
  this.set('newVaultAction', () => {
    assert.ok(true, 'action called');
  });
  this.render(hbs`{{vault-listing
    vaults=vaults
    newVaultAction=(action newVaultAction)
  }}`);
  this.$('.js-create-vault').trigger('click');
});
