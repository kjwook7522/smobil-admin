import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { FaSpinner } from 'react-icons/fa';
import { spreadsheetId, categoryStruct, writeLog } from 'common';
import './New.css';

function New({ setCategory }) {
  const initInput = {
    prodid: '',
    category: '배터리',
    prodname: '',
    prodcount: '',
  };

  const submitBtnRef = useRef();

  const [inputs, setInputs] = useState(initInput);
  const [drivers, setDrivers] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    addNewStock();
  };

  const handleInput = e => {
    const inputName = e.target.id;
    const inputValue = e.target.value;
    setInputs({ ...inputs, [inputName]: inputValue });
  };

  const addNewStock = () => {
    const prodId = parseInt(inputs.prodid);
    const prodCategory = inputs.category;
    const prodName = inputs.prodname;
    const prodCount = parseInt(inputs.prodcount);

    drivers.forEach(driver => {
      const sheetname = driver[0];
      const value = {
        values: [[prodId, prodCategory, prodName, 0]],
      };

      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId,
          range: `${sheetname}!A${totalLength + 2}`,
          valueInputOption: 'RAW',
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
    });

    const value = {
      values: [[prodId, prodCategory, prodName, prodCount]],
    };

    window.gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId,
        range: `storage!A${totalLength + 2}`,
        valueInputOption: 'RAW',
        resource: value,
      })
      .then(
        response => {
          console.log(`${response.result.updatedCells} cell updated`);
          alert('제품 추가가 완료되었습니다.');
          window.location.reload();
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
    
    writeLog([prodId, prodCategory, prodName, prodCount, "관리자", "새상품 추가"]);
  };

  useEffect(() => {
    const sheetname1 = 'drivers';
    const sheetname2 = 'storage';

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetname1}!A2:D`,
      })
      .then(
        response => {
          setDrivers(response.result.values);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetname2}!A2:D`,
      })
      .then(
        response => {
          setTotalLength(response.result.values.length);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
  }, []);
  return (
    <section id="new-product">
      <div className="header">
        <h1>신규 제품 입고</h1>
        <TiArrowBack
          onClick={() => {
            setCategory({ ...categoryStruct, menu: true });
          }}
        />
      </div>

      <div className="new-wrapper">
        <form className="new-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="prodid">물품 번호: </label>
            <input id="prodid" type="text" value={inputs.prodid} required onChange={handleInput} />
          </div>
          <div className="input-box">
            <label htmlFor="category">대분류: </label>
            <select id="category" required value={inputs.category} onChange={handleInput}>
              <option value="배터리">배터리</option>
              <option value="오일">오일</option>
              <option value="오일필터">오일필터</option>
              <option value="에어필터">에어필터</option>
              <option value="와이퍼">와이퍼</option>
              <option value="워셔액">워셔액</option>
              <option value="패드">패드</option>
              <option value="에어컨필터">에어컨필터</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className="input-box">
            <label htmlFor="prodname">상세명: </label>
            <input id="prodname" type="text" value={inputs.prodname} required onChange={handleInput} />
          </div>
          <div className="input-box">
            <label htmlFor="prodcount">수량: </label>
            <input id="prodcount" type="number" value={inputs.prodcount} required onChange={handleInput} />
          </div>
          <button ref={submitBtnRef} disabled={isLoading}>
            {isLoading ? <FaSpinner /> : '추가'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default New;
