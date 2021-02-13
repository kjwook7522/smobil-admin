import { DRIVER_CONFIRM, DRIVER_REJECT } from 'actions/driver';

const initState: boolean = false;

export const driverReducer = (state = initState, action: DefaultAction): boolean => {
  switch (action.type) {
    case DRIVER_CONFIRM:
      return true;
    case DRIVER_REJECT:
      return false;
    default:
      return state;
  }
};
