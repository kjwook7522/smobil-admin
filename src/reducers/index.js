import { combineReducers } from "redux";
import { myCart } from "./cart";
import { partList } from "./part";

export default combineReducers({
  myCart,
  partList,
});
