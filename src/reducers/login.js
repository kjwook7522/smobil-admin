import { LOGIN_ON, LOGIN_OFF } from "actions";

const initState = false;

export const login = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ON:
      return true;
    case LOGIN_OFF:
      return false;
    default:
      return state;
  }
};
