import { PLUS_PART_COUNT, MINUS_PART_COUNT, INIT_PART } from "actions";

const initState = [];

export const partList = (state = initState, action) => {
  const sheetname = action.part;

  let prodIdx;
  let prodCount;
  let updPart;
  let value;

  switch (action.type) {
    case INIT_PART:
      return [...action.data];
    case PLUS_PART_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][2]);

      value = {
        values: [[prodCount + 1]],
      };

      // google sheet update
      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          range: `${sheetname}!C${prodIdx + 2}`,
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
      updPart = state.slice();
      updPart[prodIdx][2] = prodCount + 1;
      return updPart;

    case MINUS_PART_COUNT:
      prodIdx = state.findIndex(item => item[0] === action.id);
      prodCount = Number(state[prodIdx][2]);

      value = {
        values: [[prodCount - 1]],
      };

      // google sheet update
      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          range: `${sheetname}!C${prodIdx + 2}`,
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
      updPart = state.slice();
      updPart[prodIdx][2] = prodCount - 1;
      return updPart;

    default:
      return state;
  }
};
