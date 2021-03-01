import React from 'react';
import { useEffect, useState } from 'react';
import { QueryDocumentSnapshot } from 'firebaseApp';
import { getAllDrivers } from 'common/service/driverService';
import { useHistory } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct, writeLog, getSheetValues, updateSheetSingleValue } from 'common';
import './Drivers.css';
import { useListenTrunks } from 'common/service/trunkService';

const Drivers: React.FC = () => {
  const history = useHistory();
  const [drivers, setDrivers] = useState<Array<QueryDocumentSnapshot>>([]);
  // const [driverInfo, setDriverInfo] = useState<Array<>>([]);

  const [allTrunk, unsubscribeList] = useListenTrunks(['123', '456']);

  const goAdmin = () => {
    history.push('/admin');
  };

  // const getDrivers = () => {
  //   const sheetname = 'drivers';

  //   const promiseDriver = new Promise((resolve, reject) => {
  //     getSheetValues(`${sheetname}!A2:C`).then(
  //       response => {
  //         resolve(response.result.values);
  //         setDriverInfos(response.result.values);
  //       },
  //       reason => {
  //         reject(reason.result.error.message);
  //       }
  //     );
  //   });

  //   return promiseDriver;
  // };

  // const getDriverCart = ids => {
  //   let driverCartTemp = {};

  //   ids.forEach(id => {
  //     const sheetname = id;

  //     getSheetValues(`${sheetname}!A2:D`).then(
  //       response => {
  //         driverCartTemp = { ...driverCartTemp, [id]: response.result.values };
  //         setDriverCart(driverCartTemp);
  //       },
  //       reason => {
  //         console.log(reason.result.error.message);
  //       }
  //     );
  //   });
  // };

  // const getStorage = () => {
  //   const sheetname = 'storage';

  //   getSheetValues(`${sheetname}!A2:D`).then(
  //     response => {
  //       setStorage([...response.result.values]);
  //     },
  //     reason => {
  //       console.log(reason.result.error.message);
  //     }
  //   );
  // };

  // const updateGoogleSheet = (sheetname, prodIdx, value) => {
  //   updateSheetSingleValue(`${sheetname}!D${prodIdx + 2}`, value).then(
  //     response => {
  //       console.log(`${response.result.updatedCells} cell updated`);
  //     },
  //     reason => {
  //       console.log(reason.result.error.message);
  //     }
  //   );
  // };

  // const minusCart = (driverId, prodId) => {
  //   const prodIdx = driverCart[driverId].findIndex(item => item[0] === prodId);
  //   const prodCount = Number(driverCart[driverId][prodIdx][3]);

  //   let tempDriverCart = driverCart[driverId];
  //   tempDriverCart[prodIdx][3] -= 1;
  //   setDriverCart({ ...driverCart, [driverId]: tempDriverCart });

  //   updateGoogleSheet(driverId, prodIdx, prodCount - 1);
  // };

  // const plusPart = prodId => {
  //   const sheetname = 'storage';

  //   const prodIdx = storage.findIndex(item => item[0] === prodId);
  //   const prodCount = Number(storage[prodIdx][3]);

  //   let tempStorage = [...storage];
  //   tempStorage[prodIdx][3] = parseInt(tempStorage[prodIdx][3]) + 1;
  //   setStorage(tempStorage);

  //   updateGoogleSheet(sheetname, prodIdx, prodCount + 1);
  // };

  // const keepProd = e => {
  //   const driverId = e.target.dataset.driverid;
  //   const prodId = e.target.dataset.productid;
  //   const prodIdx = storage.findIndex(item => item[0] === prodId);
  //   const fullname = driverInfos.find(item => item[0] === driverId)[1];
  //   const prodCategory = storage[prodIdx][1];
  //   const prodName = storage[prodIdx][2];

  //   minusCart(driverId, prodId);
  //   plusPart(prodId);
  //   writeLog([parseInt(prodId), prodCategory, prodName, 1, `${fullname}(관리자)`, '창고 재고']);
  // };

  // const sellProd = e => {
  //   const driverId = e.target.dataset.driverid;
  //   const prodId = e.target.dataset.productid;
  //   const prodIdx = storage.findIndex(item => item[0] === prodId);
  //   const fullname = driverInfos.find(item => item[0] === driverId)[1];
  //   const prodCategory = storage[prodIdx][1];
  //   const prodName = storage[prodIdx][2];

  //   minusCart(driverId, prodId);
  //   writeLog([parseInt(prodId), prodCategory, prodName, 1, `${fullname}(관리자)`, '판매']);
  // };

  useEffect(() => {
    // getDrivers()
    //   .then(res => {
    //     let ids = [];
    //     res.forEach(row => {
    //       ids.push(row[0]);
    //     });
    //     getDriverCart(ids);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // getStorage();
    getDriversAndTrunk();
  }, []);

  const getDriversAndTrunk = async () => {
    const allDrivers = await getAllDrivers();
    setDrivers(allDrivers);
    let tempDriverInfo = [];
    allDrivers.forEach(driver => {
      tempDriverInfo.push();
    });
  };

  return (
    <section id="drivers">
      <div className="header">
        <h1>기사별 재고확인</h1>
        <TiArrowBack onClick={goAdmin} />
      </div>

      {drivers.map(driver => {
        const data = driver.data();

        return (
          <div className="driver-board" key={data.uid}>
            <h1>{data.displayName} 트렁크</h1>
            <table className="driver-table">
              <thead>
                <tr>
                  <th>재고</th>
                  <th>품목</th>
                  <th>상세명</th>
                  <th>수량</th>
                  <th>판매</th>
                </tr>
              </thead>
              <tbody>
                {/* for check undefined */}
                {/* {driverCart[driver[0]] &&
                  driverCart[driver[0]].map(item =>
                    Number(item[3]) ? (
                      <tr key={item[0]}>
                        <td>
                          <button
                            data-driverid={driver[0]}
                            data-productid={item[0]}
                            className="keep-btn"
                            onClick={keepProd}
                          >
                            재고
                          </button>
                        </td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>
                          <button
                            data-driverid={driver[0]}
                            data-productid={item[0]}
                            className="sell-btn"
                            onClick={sellProd}
                          >
                            판매
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )} */}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
};

export default Drivers;
