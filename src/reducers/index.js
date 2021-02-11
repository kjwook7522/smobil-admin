import { combineReducers } from "redux";
import { myCart } from "./cart";
import { partList } from "./part";
import { loading } from "./loading";
import { loginReducer } from "./login";
import { userReducer } from "./user";

export default combineReducers({
  myCart,
  partList,
  loading,
  loginReducer,
  userReducer,
});
