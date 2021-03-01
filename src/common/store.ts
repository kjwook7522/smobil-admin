import { combineReducers, createStore } from 'redux';
import { userReducer } from 'reducers/user';
import { driverReducer } from 'reducers/driver';
import { trunkReducer } from 'reducers/trunk';
import { storageReducer } from 'reducers/storage';

const rootReducer = combineReducers({
  userReducer,
  driverReducer,
  trunkReducer,
  storageReducer,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
