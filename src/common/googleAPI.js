import { spreadsheetId } from 'common';

export const writeLog = logData => {
  const sheetname = 'log';
  
  const nowDate = (new Date()).toString();
  logData.push(nowDate);
  const value = {
    values: [logData]
  }

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
