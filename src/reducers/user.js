import { INIT_USER } from 'actions';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    default:
      return state;
  }
};
