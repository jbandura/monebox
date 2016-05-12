import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) {
    return `Vault ${i}`;
  },
  state() { return faker.random.number(); }
});
