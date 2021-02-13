export const LOGIN_ON = 'LOGIN_ON';
export const LOGIN_OFF = 'LOGIN_OFF';

export const loginOn = (): DefaultAction => ({
  type: LOGIN_ON,
  payload: true,
});

export const loginOff = (): DefaultAction => ({
  type: LOGIN_OFF,
  payload: false,
});
