import React from "react";
import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const sheetname = "driver1";
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
        range: `${sheetname}!A2:D`,
      })
      .then(
        response => {
          setMyCart(response.result.values);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
  }, []);

  const keepProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = myCart.findIndex(item => item[0] === prodId);
    const prodCount = Number(myCart[prodIdx][3]);

    const value = {
      values: [[prodCount + 1]],
    };

    // google sheet update
    window.gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
        range: `${sheetname}!D${prodIdx + 2}`,
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
    const updCart = myCart.slice();
    updCart[prodIdx][3] = prodCount + 1;
    setMyCart(updCart);
  };

  const sellProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = myCart.findIndex(item => item[0] === prodId);
    const prodCount = Number(myCart[prodIdx][3]);

    const value = {
      values: [[prodCount - 1]],
    };

    // google sheet update
    window.gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
        range: `${sheetname}!D${prodIdx + 2}`,
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
    const updCart = myCart.slice();
    updCart[prodIdx][3] = prodCount - 1;
    setMyCart(updCart);
  };

  return (
    <section id="cart">
      <h1>내 트렁크</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th width="15%">품목</th>
            <th>상세명</th>
            <th width="15%">수량</th>
            <th width="30%">관리</th>
          </tr>
        </thead>
        <tbody>
          {myCart.map(item => (
            <tr key={item[0]} id={item[0]}>
              <td className="type">{item[1]}</td>
              <td className="name">{item[2]}</td>
              <td className="counts">{item[3]}</td>
              <td className="btn">
                <button className="keep-btn" onClick={keepProd}>
                  재고
                </button>
                <button className="sell-btn" onClick={sellProd}>
                  판매
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Cart;
