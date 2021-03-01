export const INIT_USER = 'INIT_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const initUser = (user: User): UserAction => ({
  type: INIT_USER,
  user,
});

export const removeUser = (): UserAction => ({
  type: REMOVE_USER,
  user: {
    uid: '',
    email: '',
    displayName: '',
    isLogin: false,
    isDriver: false,
    isAdmin: false,
  },
});