import _ from 'lodash';
import faker from 'faker';

export function generateOptions() {
  return _.times(_.random(1, 5), String).map(() => ({
    avatar: faker.internet.avatar(),
    username: `@${faker.internet.userName()}`,
    name: faker.name.findName(),
  }));
}
