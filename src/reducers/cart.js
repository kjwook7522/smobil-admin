import { PLUS_CART_COUNT, MINUS_CART_COUNT, INIT_CART } from "actions";

const initState = [];

export const myCart = (state = initState, action) => {
  const sheetname = "driver1";

  let prodIdx;
  let prodCount;
  let updCart;
  let value;

  switch (action.type) {
    case INIT_CART:
      return [...action.data];
    case PLUS_CART_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      value = {
        values: [[prodCount + 1]],
      };

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

      // local update
      updCart = state.slice();
      updCart[prodIdx][3] = prodCount + 1;
      return updCart;

    case MINUS_CART_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][3]);

      value = {
        values: [[prodCount - 1]],
      };

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

      // local update
      updCart = state.slice();
      updCart[prodIdx][3] = prodCount - 1;
      return updCart;

    default:
      return state;
  }
};
