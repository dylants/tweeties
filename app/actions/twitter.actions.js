import {
  FETCH_DEFAULT_OPTIONS,
  checkHttpStatus,
  handleHttpError,
  localRequest,
} from '../lib/http';
import {
  SEARCHING_TWITTER_USERS,
  SEARCHING_TWITTER_USERS_ERROR,
  SEARCHING_TWITTER_USERS_SUCCESS,
} from '../constants/action-types';

function searchingTwitterUsers() {
  return {
    type: SEARCHING_TWITTER_USERS,
  };
}

function searchingTwitterUsersError(error) {
  return {
    type: SEARCHING_TWITTER_USERS_ERROR,
    error,
  };
}

function searchingTwitterUsersSuccess(users) {
  return {
    type: SEARCHING_TWITTER_USERS_SUCCESS,
    users,
  };
}

export function searchTwitterUsers(username) {
  return (dispatch) => {
    dispatch(searchingTwitterUsers());

    const uri = `/api/twitter/users/search?username=${username}`;
    const options = Object.assign({}, FETCH_DEFAULT_OPTIONS, {
      method: 'GET',
    });

    return localRequest(uri, options)
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => dispatch(searchingTwitterUsersSuccess(response)))
      .catch(error => handleHttpError(dispatch, error, searchingTwitterUsersError));
  };
}
