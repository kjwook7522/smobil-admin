export const INIT_USER = 'INIT_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const DRIVER_CONFIRM = 'DRIVER_CONFIRM';
export const DRIVER_REJECT = 'DRIVER_REJECT';
export const ADMIN_CONFIRM = 'ADMIN_CONFIRM';
export const ADMIN_REJECT = 'ADMIN_REJECT';

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
    isDriver: false,
    isAdmin: false,
  },
});

export const driverConfirm = (): DefaultAction => ({
  type: DRIVER_CONFIRM,
  payload: true,
});

export const driverReject = (): DefaultAction => ({
  type: DRIVER_REJECT,
  payload: false,
});

export const adminConfirm = (): DefaultAction => ({
  type: ADMIN_CONFIRM,
  payload: true,
});

export const adminReject = (): DefaultAction => ({
  type: ADMIN_REJECT,
  payload: false,
});
