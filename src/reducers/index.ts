import { combineReducers } from "redux";
import { myCart } from "./cart";
import { partList } from "./part";
import { loadingReducer } from "./loading";
import { loginReducer } from "./login";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  myCart,
  partList,
  loadingReducer,
  loginReducer,
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>