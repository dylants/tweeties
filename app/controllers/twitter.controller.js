import { usersSearch } from '../lib/twitter';

export function searchUsers(req, res) {
  const { username } = req.query;

  return usersSearch(username)
    .then(users => res.send(users))
    .catch(error => res.send(500, error));
}
