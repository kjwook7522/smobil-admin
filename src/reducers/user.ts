import { INIT_USER, REMOVE_USER } from 'actions/user';

const initState: User = {
  uid: '',
  email: '',
  displayName: '',
  isLogin: false,
  isDriver: false,
  isAdmin: false,
};

export const userReducer = (state = initState, action: UserAction & DefaultAction): User => {
  switch (action.type) {
    case INIT_USER:
      return action.user;
    case REMOVE_USER:
      return action.user;
    default:
      return state;
  }
};
