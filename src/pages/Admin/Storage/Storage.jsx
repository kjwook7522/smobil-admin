import React from 'react';
import { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct, getSheetValues, updateSheetSingleValue } from 'common';
import './Storage.css';

function Storage({ setCategory }) {
  const initialCategory = {
    airFilter: [],
    oilFilter: [],
    airconFilter: [],
    battery: [],
    wiper: [],
    oil: [],
    washer: [],
    pad: [],
    etc: [],
  };

  const [storageList, setStorageList] = useState([]);
  const [categoryList, setCategoryList] = useState(initialCategory);
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

  const renderTables = () => {
    let tablesJsx = [];
    for (let category in categoryList) {
      tablesJsx.push(
        <React.Fragment key={category}>
          <h1 className="stock-table-header">{chgNmToK(category)}</h1>
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
              {categoryList[category].map(item => (
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
        </React.Fragment>
      );
    }
    return tablesJsx;
  };

  const chgNmToK = category => {
    switch (category) {
      case "battery":
        return "배터리";
      case "oil":
        return "오일";
      case "oilFilter":
        return "오일필터";
      case "airFilter":
        return "에어필터";
      case "wiper":
        return "와이퍼";
      case "washer":
        return "워셔액";
      case "pad":
        return "패드";
      case "airconFilter":
        return "에어컨필터";
      case "etc":
        return "기타";
      default:
        return;
    }
  };

  useEffect(() => {
    const sheetname = 'storage';

    const splitCategory = list => {
      let tempCategoryList = {
        airFilter: [],
        oilFilter: [],
        airconFilter: [],
        battery: [],
        wiper: [],
        oil: [],
        washer: [],
        pad: [],
        etc: [],
      };

      list.forEach(item => {
        switch (item[1]) {
          case '에어필터':
            tempCategoryList.airFilter.push(item);
            break;
          case '오일필터':
            tempCategoryList.oilFilter.push(item);
            break;
          case '에어컨필터':
            tempCategoryList.airconFilter.push(item);
            break;
          case '배터리':
            tempCategoryList.battery.push(item);
            break;
          case '와이퍼':
            tempCategoryList.wiper.push(item);
            break;
          case '오일':
            tempCategoryList.oil.push(item);
            break;
          case '워셔액':
            tempCategoryList.washer.push(item);
            break;
          case '패드':
            tempCategoryList.pad.push(item);
            break;
          case '기타':
            tempCategoryList.etc.push(item);
            break;
          default:
            break;
        }
      });
      setCategoryList(tempCategoryList);
    };

    getSheetValues(`${sheetname}!A2:D`).then(
      response => {
        const data = response.result.values;
        const tempInputs = {};

        data.forEach(row => {
          tempInputs[row[0]] = row[3];
        });

        setStorageList(data);
        setInputs(tempInputs);
        splitCategory(data);
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

      {renderTables()}
      {/* <h1 className="stock-table-header">123</h1>
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
      </table> */}
    </section>
  );
}

export default Storage;
