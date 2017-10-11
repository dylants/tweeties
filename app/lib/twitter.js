import { generateUsers } from '../config/mocks/generators';

export function usersSearch() {
  return Promise.resolve(generateUsers());
}
