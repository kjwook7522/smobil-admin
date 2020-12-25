import React from 'react';
import { useEffect, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { spreadsheetId } from 'common';
import './Drivers.css';

function Drivers({ setCategory }) {
  const [driverInfos, setDriverInfos] = useState([]);
  const [driverCart, setDriverCart] = useState({});
  const [storage, setStorage] = useState([]);

  const categoryStruct = {
    drivers: false,
    storage: false,
    new: false,
    manage: false,
    menu: true,
  };

  const getDrivers = () => {
    const sheetname = 'drivers';

    const promiseDriver = new Promise((resolve, reject) => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId,
          range: `${sheetname}!A2:C`,
        })
        .then(
          response => {
            resolve(response.result.values);
            setDriverInfos(response.result.values);
          },
          reason => {
            reject(reason.result.error.message);
          }
        );
    });

    return promiseDriver;
  };

  const getDriverCart = ids => {
    let driverCartTemp = {};

    ids.forEach(id => {
      const sheetname = id;

      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId,
          range: `${sheetname}!A2:D`,
        })
        .then(
          response => {
            driverCartTemp = { ...driverCartTemp, [id]: response.result.values };
            setDriverCart(driverCartTemp);
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );
    });
  };

  const getStorage = () => {
    const sheetname = 'storage';

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetname}!A2:D`,
      })
      .then(
        response => {
          setStorage([...response.result.values]);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
  };

  const updateGoogleSheet = (sheetname, prodIdx, value) => {
    window.gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId,
        range: `${sheetname}!D${prodIdx + 2}`,
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
  };

  const minusCart = (driverId, prodId) => {
    const prodIdx = driverCart[driverId].findIndex(item => item[0] === prodId);
    const prodCount = Number(driverCart[driverId][prodIdx][3]);
    const value = {
      values: [[prodCount - 1]],
    };

    let tempDriverCart = driverCart[driverId];
    tempDriverCart[prodIdx][3] -= 1;
    setDriverCart({ ...driverCart, [driverId]: tempDriverCart });

    updateGoogleSheet(driverId, prodIdx, value);
  };

  const plusPart = prodId => {
    const sheetname = 'storage';

    const prodIdx = storage.findIndex(item => item[0] === prodId);
    const prodCount = Number(storage[prodIdx][3]);
    const value = {
      values: [[prodCount + 1]],
    };

    let tempStorage = [...storage];
    tempStorage[prodIdx][3] = parseInt(tempStorage[prodIdx][3]) + 1;
    setStorage(tempStorage);

    updateGoogleSheet(sheetname, prodIdx, value);
  };

  const keepProd = e => {
    const driverId = e.target.dataset.driverid;
    const prodId = e.target.dataset.productid;
    minusCart(driverId, prodId);
    plusPart(prodId);
  };

  const sellProd = e => {
    const driverId = e.target.dataset.driverid;
    const prodId = e.target.dataset.productid;
    minusCart(driverId, prodId);
  };

  useEffect(() => {
    getDrivers()
      .then(res => {
        let ids = [];
        res.forEach(row => {
          ids.push(row[0]);
        });

        getDriverCart(ids);
      })
      .catch(error => {
        console.log(error);
      });
    getStorage();
  }, []);

  return (
    <section id="drivers">
      <div className="header">
        <h1>기사별 재고확인</h1>
        <TiArrowBack
          onClick={() => {
            setCategory(categoryStruct);
          }}
        />
      </div>

      {driverInfos.map(driver => (
        <div className="driver-board" key={driver[0]}>
          <h1>{driver[1]} 트렁크</h1>
          <table className="driver-table">
            <thead>
              <tr>
                <th width="15%">재고</th>
                <th width="15%">품목</th>
                <th>상세명</th>
                <th width="15%">수량</th>
                <th width="15%">판매</th>
              </tr>
            </thead>
            <tbody>
              {driverCart[driver[0]] /* for check undefined */ &&
                driverCart[driver[0]].map(item =>
                  Number(item[3]) ? (
                    <tr key={item[0]}>
                      <td>
                        <button data-driverid={driver[0]} data-productid={item[0]} className="keep-btn" onClick={keepProd}>
                          재고
                        </button>
                      </td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>
                        <button data-driverid={driver[0]} data-productid={item[0]} className="sell-btn" onClick={sellProd}>
                          판매
                        </button>
                      </td>
                    </tr>
                  ) : null
                )}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

export default Drivers;
