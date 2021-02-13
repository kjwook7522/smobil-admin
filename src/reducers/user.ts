import { INIT_USER } from 'actions/user';
import { User } from 'firebaseApp';

const initState: User | null = null;

export const userReducer = (state = initState, action: UserAction) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    default:
      return state;
  }
};
