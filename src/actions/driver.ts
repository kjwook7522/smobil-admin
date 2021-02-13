export const DRIVER_CONFIRM = 'DRIVER_CONFIRM';
export const DRIVER_REJECT = 'DRIVER_REJECT';

export const driverConfirm = (): DefaultAction => ({
  type: DRIVER_CONFIRM,
  payload: true,
});

export const driverReject = (): DefaultAction => ({
  type: DRIVER_REJECT,
  payload: false,
});
