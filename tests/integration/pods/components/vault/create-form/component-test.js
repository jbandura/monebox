import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vault/create-form', 'Integration | Component | vault/create-form', {
  integration: true
});

function fillIn(context, selector, value) {
  context.$(selector).val(value);
  context.$(selector).trigger('blur');
  context.$(selector).trigger('change');
}

test('vault name should be required', function(assert){
  this.render(hbs`{{vault/create-form}}`);
  fillIn(this, '.js-vault-name input', ' ');
  const classNames = $('.js-vault-name').attr('class').split(' ');
  assert.ok(classNames.indexOf('has-error') !== -1);
});

test('vault startState should be numeric', function(assert) {
  this.render(hbs`{{vault/create-form}}`);
  fillIn(this, '.js-start-state input', 'foo');
  const classNames = $('.js-start-state').attr('class').split(' ');
  assert.ok(classNames.indexOf('has-error') !== -1);
});

test('creating new vault fires appropriate action', function(assert) {
  assert.expect(2);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  const newVaultName = 'testVault';
  const newVaultState = '0';

  this.set('onSubmitAction', (formData) => {
    assert.equal(formData.name, newVaultName);
    assert.equal(formData.state, newVaultState);
  });

  this.render(hbs`{{vault/create-form
    onSubmit=(action onSubmitAction)
  }}`);

  fillIn(this, '.js-vault-name input', newVaultName);
  fillIn(this, '.js-start-state input', newVaultState);

  this.$('.js-submit').trigger('click');
});

test('invalid vault cannot be saved', function(assert) {
  this.render(hbs`{{vault/create-form}}`);
  fillIn(this, '.js-vault-name input', ' ');
  fillIn(this, '.js-start-state input', 'foo');

  assert.ok(this.$('.js-submit').is(':disabled'));
});
