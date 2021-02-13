import { LOGIN_ON, LOGIN_OFF } from 'actions/login';

const initState: boolean = false;

export const loginReducer = (state = initState, action: DefaultAction) => {
  switch (action.type) {
    case LOGIN_ON:
      return true;
    case LOGIN_OFF:
      return false;
    default:
      return state;
  }
};
