import { combineReducers, createStore } from 'redux';
import { userReducer } from 'reducers/user';
import { driverReducer } from 'reducers/driver';

const rootReducer = combineReducers({
  userReducer,
  driverReducer,
});

export const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>
