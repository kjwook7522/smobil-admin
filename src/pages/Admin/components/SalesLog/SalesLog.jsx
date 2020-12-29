import React from 'react';
import { useState, useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct, spreadsheetId } from 'common';
import './SalesLog.css';

function SalesLog({ setCategory }) {
  const [logs, setLogs] = useState([]);

  const convertDate = date => {
    const _date = new Date(date);
    const timeStr = _date.toLocaleString('ko-KR');

    return timeStr;
  }

  useEffect(() => {
    const sheetname = 'log';

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetname}!A2:G`,
      })
      .then(
        response => {
          setLogs(response.result.values);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
  }, []);
  return (
    <section id="sales-log">
      <div className="header">
        <h1>판매 기록</h1>
        <TiArrowBack
          onClick={() => {
            setCategory({ ...categoryStruct, menu: true });
          }}
        />
      </div>

      <table className="sales-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>품목</th>
            <th>상세명</th>
            <th>수량</th>
            <th>담당자</th>
            <th>상태</th>
            <th>시간</th>
          </tr>
        </thead>
        <tbody>
          {logs.slice().reverse().map((item, idx) => (
            <tr key={idx}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
              <td>{item[5]}</td>
              <td>{convertDate(item[6])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SalesLog;
