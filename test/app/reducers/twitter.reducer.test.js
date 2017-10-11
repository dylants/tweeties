import reducer from '../../../app/reducers/twitter.reducer';
import * as types from '../../../app/constants/action-types';

describe('the twitter reducer', () => {
  let state;

  it('should exist', () => {
    expect(reducer).toBeDefined();
  });

  it('should have the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: true,
      error: null,
      users: [],
    });
  });

  describe('in the initial state', () => {
    beforeEach(() => {
      state = {
        loading: true,
        error: null,
        users: [],
      };
    });

    it('should handle SEARCHING_TWITTER_USERS', () => {
      expect(
        reducer(state, {
          type: types.SEARCHING_TWITTER_USERS,
        }),
      ).toEqual({
        loading: true,
        error: null,
        users: [],
      });
    });
  });

  describe('in the loading state', () => {
    beforeEach(() => {
      state = {
        loading: true,
        error: null,
        users: [],
      };
    });

    it('should handle SEARCHING_TWITTER_USERS_ERROR', () => {
      expect(
        reducer(state, {
          type: types.SEARCHING_TWITTER_USERS_ERROR,
          error: 'bad',
        }),
      ).toEqual({
        loading: false,
        error: 'bad',
        users: [],
      });
    });

    it('should handle SEARCHING_TWITTER_USERS_SUCCESS', () => {
      expect(
        reducer(state, {
          type: types.SEARCHING_TWITTER_USERS_SUCCESS,
          users: [{ a: 1 }],
        }),
      ).toEqual({
        loading: false,
        error: null,
        users: [{ a: 1 }],
      });
    });
  });

  describe('when data is loaded', () => {
    beforeEach(() => {
      state = {
        loading: false,
        error: null,
        users: [{ a: 1 }],
      };
    });

    it('should handle SEARCHING_TWITTER_USERS', () => {
      expect(
        reducer(state, {
          type: types.SEARCHING_TWITTER_USERS,
        }),
      ).toEqual({
        loading: true,
        error: null,
        users: [],
      });
    });
  });
});
