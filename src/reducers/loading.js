import { LOADING_ON, LOADING_OFF } from "actions";

const initState = true;

export const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_ON:
      return true;
    case LOADING_OFF:
      return false;
    default:
      return state;
  }
};
