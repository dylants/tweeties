import * as twitterLib from '../../../app/lib/twitter';

describe('the twitter library', () => {
  describe('usersSearch', () => {
    it('should work', () =>
      twitterLib.usersSearch()
        .then((users) => {
          expect(users).toBeTruthy();
          expect(users.length).toBeGreaterThan(0);

          const user = users[0];
          expect(user.avatar).toBeTruthy();
          expect(user.username).toBeTruthy();
          expect(user.name).toBeTruthy();
        }),
    );
  });
});
