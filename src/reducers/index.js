import { combineReducers } from "redux";
import { myCart } from "./cart";
import { partList } from "./part";
import { loading } from "./loading";
import { login } from "./login";

export default combineReducers({
  myCart,
  partList,
  loading,
  login,
});
