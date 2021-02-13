import { LOADING_ON, LOADING_OFF } from 'actions/loading';

const initState: boolean = true;

export const loadingReducer = (state = initState, action: DefaultAction) => {
  switch (action.type) {
    case LOADING_ON:
      return true;
    case LOADING_OFF:
      return false;
    default:
      return state;
  }
};
