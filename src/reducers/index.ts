import { combineReducers } from "redux";
import { myCart } from "./cart";
import { partList } from "./part";
import { loadingReducer } from "./loading";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { driverReducer } from "./driver";

export const rootReducer = combineReducers({
  myCart,
  partList,
  loadingReducer,
  loginReducer,
  userReducer,
  driverReducer,
});

export type RootState = ReturnType<typeof rootReducer>