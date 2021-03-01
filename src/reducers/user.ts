import { INIT_USER, REMOVE_USER, DRIVER_CONFIRM, DRIVER_REJECT, ADMIN_CONFIRM, ADMIN_REJECT } from 'actions/user';

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
      return action.user
    case DRIVER_CONFIRM:
      return { ...state, isDriver: action.payload };
    case DRIVER_REJECT:
      return { ...state, isDriver: action.payload };
    case ADMIN_CONFIRM:
      return { ...state, isAdmin: action.payload };
    case ADMIN_REJECT:
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
};
