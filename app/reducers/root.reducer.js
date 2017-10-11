import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import twitterReducer from './twitter.reducer';

export default combineReducers({
  routing,
  twitterState: twitterReducer,
});
