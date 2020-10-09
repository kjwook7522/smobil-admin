import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { init, minusProd, plusProd } from "actions";
import "./Cart.css";

function Cart({ initList, myCart, sell, keep }) {

  useEffect(() => {
    initList();
  }, [initList]);

  const keepProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    keep(prodId);
  };

  const sellProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    sell(prodId);
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

function mapDispatchToProps(dispatch) {
  return {
    initList: () => {
      const sheetname = "driver1";

      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          range: `${sheetname}!A2:D`,
        })
        .then(
          response => {
            dispatch(init(response.result.values));
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );
    },
    keep: prodId => {
      dispatch(plusProd(prodId));
    },
    sell: prodId => {
      dispatch(minusProd(prodId));
    },
  };
}

function mapStateToProps(state) {
  return {
    myCart: state.myCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
