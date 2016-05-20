import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) {
    return `Vault ${i}`;
  },
  startState() { return faker.random.number(); }
});
