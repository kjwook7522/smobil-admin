export const INIT_USER = 'INIT_USER';

export const initUser = user => ({
  type: INIT_USER,
  payload: user,
});
