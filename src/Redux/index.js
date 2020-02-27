import { combineReducers } from 'redux';

export default () =>
  combineReducers({
    drawer: require('./DrawerRedux').reducer,
    user: require('./UserRedux').reducer,
  });
