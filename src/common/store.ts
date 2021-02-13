import { combineReducers, createStore } from 'redux';
import { userReducer } from 'reducers/user';
import { loadingReducer } from 'reducers/loading';
import { loginReducer } from 'reducers/login';
import { driverReducer } from 'reducers/driver';

const rootReducer = combineReducers({
  userReducer,
  loadingReducer,
  loginReducer,
  driverReducer,
});

export const store = createStore(rootReducer);
