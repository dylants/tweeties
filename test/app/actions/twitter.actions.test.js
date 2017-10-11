import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../app/constants/action-types';

const httpLib = require('../../../app/lib/http');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const MODULE_PATH = '../../../app/actions/twitter.actions';

describe('twitter actions', () => {
  let twitterActions;

  beforeEach(() => {
    twitterActions = require(MODULE_PATH);
  });

  describe('searchTwitterUsers', () => {
    let store;

    beforeEach(() => {
      store = mockStore();
    });

    describe('when the status is 200', () => {
      let uri;
      let options;

      beforeEach(() => {
        httpLib.localRequest = jest.fn((_uri, _options) => {
          uri = _uri;
          options = _options;
          return Promise.resolve({
            status: 200,
            json: () => ([{ a: 1 }]),
          });
        });

        twitterActions = require(MODULE_PATH);
      });

      it('should dispatch properly', () =>
        store.dispatch(twitterActions.searchTwitterUsers('me'))
        .then(() => {
          expect(uri).toEqual('/api/twitter/users/search?username=me');
          expect(options).toEqual({
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json',
              'Content-Type':
              'application/json',
            },
          });
          expect(store.getActions()).toEqual([{
            type: types.SEARCHING_TWITTER_USERS,
          }, {
            type: types.SEARCHING_TWITTER_USERS_SUCCESS,
            users: [{ a: 1 }],
          }]);
        }),
      );
    });

    describe('when the status is 500', () => {
      beforeEach(() => {
        httpLib.localRequest = jest.fn(() =>
          Promise.reject('bad!'),
        );
        twitterActions = require(MODULE_PATH);
      });

      it('should dispatch properly', () =>
        store.dispatch(twitterActions.searchTwitterUsers('me'))
        .then(() => {
          expect(store.getActions()).toEqual([{
            type: types.SEARCHING_TWITTER_USERS,
          }, {
            type: types.SEARCHING_TWITTER_USERS_ERROR,
            error: 'bad!',
          }]);
        }),
      );
    });
  });

  describe('clearTwitterUsers', () => {
    let store;

    beforeEach(() => {
      store = mockStore();
    });

    it('should dispatch properly', () =>
      store.dispatch(twitterActions.clearTwitterUsers())
      .then(() => {
        expect(store.getActions()).toEqual([{
          type: types.CLEAR_TWITTER_USERS,
        }]);
      }),
    );
  });
});
