import { generateNewState } from '../lib/state';
import {
  SEARCHING_TWITTER_USERS,
  SEARCHING_TWITTER_USERS_ERROR,
  SEARCHING_TWITTER_USERS_SUCCESS,
} from '../constants/action-types';

const initialState = {
  loading: true,
  error: null,
  users: [],
};

export default function twitterReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCHING_TWITTER_USERS:
      return generateNewState(state, {
        loading: true,
        error: null,
        users: [],
      });
    case SEARCHING_TWITTER_USERS_ERROR:
      return generateNewState(state, {
        loading: false,
        error: action.error,
      });
    case SEARCHING_TWITTER_USERS_SUCCESS:
      return generateNewState(state, {
        loading: false,
        users: action.users,
      });
    default:
      return state;
  }
}
