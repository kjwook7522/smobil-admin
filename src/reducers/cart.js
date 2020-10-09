import { PLUS_COUNT, MINUS_COUNT, INIT_LIST } from "actions";

const initState = [];

export const myCart = (state = initState, action) => {
  const sheetname = "driver1";

  let prodIdx;
  let prodCount;
  let updCart;
  let value;

  switch (action.type) {
    case INIT_LIST:
      return [...action.data];
    case PLUS_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      value = {
        values: [[prodCount + 1]],
      };

      // local update
      updCart = state.slice();
      updCart[prodIdx][3] = prodCount + 1;
      break;

    case MINUS_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      value = {
        values: [[prodCount - 1]],
      };

      // local update
      updCart = state.slice();
      updCart[prodIdx][3] = prodCount - 1;
      break;

    default:
      return state;
  }

  // google sheet update
  window.gapi.client.sheets.spreadsheets.values
  .update({
    spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
    range: `${sheetname}!D${prodIdx + 2}`,
    valueInputOption: "RAW",
    resource: value,
  })
  .then(
    response => {
      console.log(`${response.result.updatedCells} cell updated`);
    },
    reason => {
      console.log(reason.result.error.message);
    }
  );

  return updCart;
};
