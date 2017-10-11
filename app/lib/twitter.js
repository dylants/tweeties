import Twitter from 'twitter';

import { generateUsers } from '../config/mocks/generators';
import { getTwitterConfig } from './private-config';

const client = new Twitter(getTwitterConfig());

export function buildUsersUI(user) {
  return {
    avatar: user.profile_image_url_https || '',
    username: user.screen_name || '',
    name: user.name || '',
  };
}

export function usersSearch(username) {
  if (process.env.MOCK) {
    return Promise.resolve(generateUsers());
  }

  return new Promise((resolve, reject) =>
    client.get('/users/search', { q: username })
      .then((users) => {
        // limit the results to just the first 5 to avoid a huge list in the UI
        const trimmedUsers = users.slice(0, 5);
        const usersUI = trimmedUsers.map(user => buildUsersUI(user));
        return resolve(usersUI);
      })
      .catch(error => reject(error)),
  );
}
