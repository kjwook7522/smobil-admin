import { User } from 'firebaseApp';

export const INIT_USER = 'INIT_USER';

export const initUser = (user: User): UserAction => ({
  type: INIT_USER,
  payload: user,
});
