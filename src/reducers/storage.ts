import { INIT_STORAGE, PLUS_STORAGE_PROD, MINUS_STORAGE_PROD } from 'actions/storage';
import { updateStorageProd } from 'common/service/storageService';

const initState: ProductionList = [];

export const storageReducer = (state = initState, action: StorageInitAction | StorageCountAction) => {
  const copyState = state.slice();
  let prodIdx = 0;
  let count = 0;

  switch (action.type) {
    case INIT_STORAGE:
      return action.storageList;

    case PLUS_STORAGE_PROD:
      // if page route main, then state is empty
      // so if state is empty, skip below
      if (copyState.length !== 0) {
        prodIdx = copyState.findIndex(prod => prod.id === action.id);
        count = copyState[prodIdx].count;
        copyState[prodIdx].count += 1;
      }

      updateStorageProd(action.id, count + 1);

      return copyState;

    case MINUS_STORAGE_PROD:
      prodIdx = copyState.findIndex(prod => prod.id === action.id);
      count = copyState[prodIdx].count;
      copyState[prodIdx].count -= 1;

      updateStorageProd(action.id, count - 1);

      return copyState;

    default:
      return state;
  }
};
