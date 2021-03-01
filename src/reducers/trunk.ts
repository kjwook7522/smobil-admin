import { INIT_TRUNK, PLUS_TRUNK_PROD, MINUS_TRUNK_PROD } from 'actions/trunk';
import { updateTrunkProd } from 'common/service/trunkService';

const initState: ProductionList = [];

export const trunkReducer = (state = initState, action: TrunkInitAction | TrunkCountAction): ProductionList => {
  const copyState = state.slice();
  let prodIdx = 0;
  let count = 0;

  switch (action.type) {
    case INIT_TRUNK:
      return action.trunkList;

    case PLUS_TRUNK_PROD:
      prodIdx = copyState.findIndex(prod => prod.id === action.id);
      count = copyState[prodIdx].count;
      copyState[prodIdx].count += 1;

      updateTrunkProd(action.uid, action.id, count + 1);

      return copyState;

    case MINUS_TRUNK_PROD:
      prodIdx = copyState.findIndex(prod => prod.id === action.id);
      count = copyState[prodIdx].count;
      copyState[prodIdx].count -= 1;

      updateTrunkProd(action.uid, action.id, count - 1);

      return copyState;

    default:
      return state;
  }
};
