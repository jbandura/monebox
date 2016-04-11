import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  expenses: [],

  actions: {
    addExpense() {
      this.get('expenses').pushObject({
        name: this.get('expenseName')
      });
    }
  }
});
