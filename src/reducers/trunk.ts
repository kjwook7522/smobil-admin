import { INIT_TRUNK, PLUS_TRUNK_PROD, MINUS_TRUNK_PROD } from 'actions/trunk';
import { addTrunkProd, removeTrunkProd, updateTrunkProd } from 'common/service/trunkService';

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
      if (prodIdx < 0) {
        const result = addTrunkProd(action.uid, action.id);
        console.log(result);
      } else {
        count = copyState[prodIdx].count;
        copyState[prodIdx].count += 1;
        updateTrunkProd(action.uid, action.id, count + 1);
      }

      return copyState;

    case MINUS_TRUNK_PROD:
      prodIdx = copyState.findIndex(prod => prod.id === action.id);
      count = copyState[prodIdx].count;
      copyState[prodIdx].count -= 1;

      // if count becomes zero, then delete production
      if (count === 1) {
        copyState.splice(prodIdx, 1);
        removeTrunkProd(action.uid, action.id);
      } else {
        updateTrunkProd(action.uid, action.id, count - 1);
      }

      return copyState;

    default:
      return state;
  }
};
