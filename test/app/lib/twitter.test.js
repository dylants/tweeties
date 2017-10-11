import _ from 'lodash';

const MODULE_PATH = '../../../app/lib/twitter';

class mockTwitter {
  get() { // eslint-disable-line class-methods-use-this
    return Promise.resolve([{
      name: 'My Name',
      screen_name: 'My Screen Name',
      profile_image_url_https: 'https://foo.com',
    }]);
  }
}

describe('the twitter library', () => {
  let twitterLib;

  beforeEach(() => {
    jest.resetModules();

    jest.mock('../../../app/lib/private-config', () => ({
      getTwitterConfig() {},
    }));
    jest.mock('twitter', () => mockTwitter);

    twitterLib = require(MODULE_PATH);
  });

  describe('buildUsersUI', () => {
    it('should work with valid data', () => {
      expect(
        twitterLib.buildUsersUI({
          name: 'My Name',
          screen_name: 'My Screen Name',
          profile_image_url_https: 'https://foo.com',
        }),
      ).toEqual({
        avatar: 'https://foo.com',
        username: '@My Screen Name',
        name: 'My Name',
      });
    });

    it('should work with invalid data', () => {
      expect(
        twitterLib.buildUsersUI({}),
      ).toEqual({
        avatar: '',
        username: '',
        name: '',
      });
    });
  });

  describe('usersSearch', () => {
    describe('in NON-mock mode', () => {
      it('should work', () =>
        twitterLib.usersSearch()
          .then((users) => {
            expect(users).toEqual([{
              avatar: 'https://foo.com',
              username: '@My Screen Name',
              name: 'My Name',
            }]);
          }),
      );

      describe('when returning a lot of users', () => {
        beforeEach(() => {
          const mockUsers = _.times(10, () => ({
            name: 'My Name',
            screen_name: 'My Screen Name',
            profile_image_url_https: 'https://foo.com',
          }));

          class mockMoreTwitter {
            get() { // eslint-disable-line class-methods-use-this
              return Promise.resolve(mockUsers);
            }
          }

          jest.resetModules();

          jest.mock('twitter', () => mockMoreTwitter);

          twitterLib = require(MODULE_PATH);
        });

        it('should return the limited set', () =>
          twitterLib.usersSearch()
            .then((users) => {
              expect(users.length).toEqual(5);
              expect(users[0]).toEqual({
                avatar: 'https://foo.com',
                username: '@My Screen Name',
                name: 'My Name',
              });
            }),
        );
      });

      describe('when returning no users', () => {
        beforeEach(() => {
          const mockUsers = [];

          class mockMoreTwitter {
            get() { // eslint-disable-line class-methods-use-this
              return Promise.resolve(mockUsers);
            }
          }

          jest.resetModules();

          jest.mock('twitter', () => mockMoreTwitter);

          twitterLib = require(MODULE_PATH);
        });

        it('should return an empty array', () =>
          twitterLib.usersSearch()
            .then((users) => {
              expect(users).toEqual([]);
            }),
        );
      });
    });

    describe('in mock mode', () => {
      beforeEach(() => {
        jest.resetModules();

        process.env.MOCK = true;
        jest.mock('twitter', () => mockTwitter);

        twitterLib = require(MODULE_PATH);
      });

      afterEach(() => {
        delete process.env.MOCK;
      });

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
});
