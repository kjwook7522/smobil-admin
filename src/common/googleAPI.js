import { spreadsheetId } from 'common';

export const writeLog = logData => {
  const sheetname = 'log';

  const nowDate = new Date().toString();
  logData.push(nowDate);
  const value = {
    values: [logData],
  };

  window.gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId,
      range: `${sheetname}`,
      valueInputOption: 'RAW',
      resource: value,
    })
    .then(
      response => {
        console.log(response);
      },
      reason => {
        console.log(reason.result.error.message);
      }
    );
};

export const getSheetValues = range => {
  const result = window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return result;
};

export const updateSheetSingleValue = (range, value) => {
  const result = window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: {
      values: [[value]],
    },
  });

  return result;
};

export const updateSheetMultipleValues = (range, values) => {
  const result = window.gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: { values },
  });

  return result;
};

export const appendSheetValues = (range, values) => {
  const result = window.gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: { values },
  });

  return result;
};

export const addNewSheet = sheetname => {
  const body = {
    requests: [
      {
        addSheet: {
          properties: {
            title: sheetname,
          },
        },
      },
    ],
  };
  const result = window.gapi.client.sheets.spreadsheets.batchUpdate(
    {
      spreadsheetId,
    },
    body
  );

  return result;
};

export const copyTemplateSheet = destSheetId => {
  const body = {
    requests: [
      {
        copyPaste: {
          source: {
            sheetId: 1906660678,
          },
          destination: {
            sheetId: destSheetId,
          },
          pasteType: 'PASTE_NORMAL',
        },
      },
    ],
  };
  const result = window.gapi.client.sheets.spreadsheets.batchUpdate(
    {
      spreadsheetId,
    },
    body
  );

  return result;
};
