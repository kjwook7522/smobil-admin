export const LOGIN_ON = 'LOGIN_ON';
export const LOGIN_OFF = 'LOGIN_OFF';

export const setLogin = isLogin => {
  if (isLogin) {
    return {
      type: LOGIN_ON,
    };
  } else {
    return {
      type: LOGIN_OFF,
    };
  }
};

export const loginOn = () => ({
  type: LOGIN_ON,
  payload: true,
});

export const loginOff = () => ({
  type: LOGIN_OFF,
  payload: false,
});
