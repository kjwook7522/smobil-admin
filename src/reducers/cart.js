import { PLUS_CART_COUNT, MINUS_CART_COUNT, ADD_CART_ITEM, INIT_CART } from "actions";
import { DELETE_CART_ITEM } from "../actions/cart";

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

    case ADD_CART_ITEM:
      value = {
        values: [[Number(action.id), action.kind, action.name, 0]],
      };

      // google sheet update
      window.gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          valueInputOption: "RAW",
          insertDataOption: "INSERT_ROWS",
          range: `${sheetname}!A1`,
          resource: value,
        })
        .then(
          response => {
            console.log(`${response.result.updates.updatedRows} row updated`);
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );

      // local update
      updCart = state.slice();
      updCart.push([action.id, action.kind, action.name, 0]);
      return updCart;

    case DELETE_CART_ITEM:
      window.gapi.client.sheets.spreadsheets.values.clear({
        spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
        range: `${sheetname}!A8`,
      })
      .then(
        response => {
          console.log(response);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      )
      return state;

    default:
      return state;
  }
};
