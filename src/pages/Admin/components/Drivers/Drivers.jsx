import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import "./Drivers.css";

function Drivers({ setCategory }) {
  const [driverInfos, setDriverInfos] = useState([]);
  const [driverCart, setDriverCart] = useState({});

  const categoryStruct = {
    drivers: false,
    storage: false,
    new: false,
    manage: false,
    menu: true,
  };

  const getDrivers = () => {
    const sheetname = "drivers";

    const promiseDriver = new Promise((resolve, reject) => {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
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
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
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
              {driverCart[driver[0]] && /* for check undefined */
                driverCart[driver[0]].map(item =>
                  Number(item[3]) ? (
                    <tr>
                      <td>
                        <button className="keep-btn">재고</button>
                      </td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>
                        <button className="sell-btn">판매</button>
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
