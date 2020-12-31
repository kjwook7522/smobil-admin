import { updateSheetSingleValue } from 'common';
import { PLUS_PART_COUNT, MINUS_PART_COUNT, INIT_PART } from 'actions';

const initState = [];

export const partList = (state = initState, action) => {
  const sheetname = 'storage';

  let prodIdx;
  let prodCount;
  let updPart;

  switch (action.type) {
    case INIT_PART:
      return [...action.data];
    case PLUS_PART_COUNT:
      if (!state.length) {
        return state;
      }
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      // google sheet update
      updateSheetSingleValue(`${sheetname}!D${prodIdx + 2}`, prodCount + 1).then(
        response => {
          console.log(`${response.result.updatedCells} cell updated`);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );

      // local update
      updPart = state.slice();
      updPart[prodIdx][3] = prodCount + 1;
      return updPart;

    case MINUS_PART_COUNT:
      if (!state.length) {
        return state;
      }
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      // google sheet update
      updateSheetSingleValue(`${sheetname}!D${prodIdx + 2}`, prodCount - 1).then(
        response => {
          console.log(`${response.result.updatedCells} cell updated`);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );

      // local update
      updPart = state.slice();
      updPart[prodIdx][3] = prodCount - 1;
      return updPart;

    default:
      return state;
  }
};
