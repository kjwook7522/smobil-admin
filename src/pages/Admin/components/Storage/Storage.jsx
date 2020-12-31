import React from 'react';
import { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct, getSheetValues, updateSheetSingleValue } from 'common';
import './Storage.css';

function Storage({ setCategory }) {
  const [storageList, setStorageList] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleInput = e => {
    const id = e.target.parentElement.parentElement.id;
    setInputs({ ...inputs, [id]: e.target.value });
  };

  const getMyInput = id => {
    if (!inputs[id]) return '';
    else return inputs[id];
  };

  const applySheet = e => {
    const sheetname = 'storage';
    const prodId = e.currentTarget.parentElement.parentElement.id;
    const prodIdx = storageList.findIndex(item => item[0] === prodId);
    const prodCount = inputs[prodId];

    updateSheetSingleValue(`${sheetname}!D${prodIdx + 2}`, prodCount).then(
      response => {
        console.log(`${response.result.updatedCells} cell updated`);
        alert('적용되었습니다.');
      },
      reason => {
        console.log(reason.result.error.message);
        alert('적용이 실패하였습니다.');
      }
    );
  };

  useEffect(() => {
    const sheetname = 'storage';

    getSheetValues(`${sheetname}!A2:D`).then(
      response => {
        const data = response.result.values;
        const tempInputs = {};

        data.forEach(row => {
          tempInputs[row[0]] = row[3];
        });

        setStorageList(data);
        setInputs(tempInputs);
      },
      reason => {
        console.log(reason.result.error.message);
      }
    );
  }, []);

  return (
    <section id="storage-stock">
      <div className="header">
        <h1>창고 재고 확인</h1>
        <TiArrowBack
          onClick={() => {
            setCategory({ ...categoryStruct, menu: true });
          }}
        />
      </div>

      <table className="storage-stock-table">
        <thead>
          <tr>
            <th width="15%">품목</th>
            <th>상세명</th>
            <th width="15%">수량</th>
            <th width="15%">관리</th>
          </tr>
        </thead>
        <tbody>
          {storageList.map(item => (
            <tr key={item[0]} id={item[0]}>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>
                <input type="number" value={getMyInput(item[0])} onChange={handleInput} />
              </td>
              <td>
                <button onClick={applySheet}>적용</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Storage;
