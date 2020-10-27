import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { initCart, minusProd, deleteItem, plusPart } from "actions";
import "./Cart.css";

function Cart({ initList, myCart, sell, keep, remove }) {
  useEffect(() => {
    initList();
  }, [initList]);

  const keepProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = myCart.findIndex(item => item[0] === prodId);
    keep(prodId);
    if (Number(myCart[prodIdx][3]) === 0) {
      // remove(prodId);
    }
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
            <th width="15%">재고</th>
            <th width="15%">품목</th>
            <th>상세명</th>
            <th width="15%">수량</th>
            <th width="15%">판매</th>
          </tr>
        </thead>
        <tbody>
          {myCart.map(item =>
            Number(item[3]) ? (
              <tr key={item[0]} id={item[0]}>
                <td className="btn">
                  <button className="keep-btn" onClick={keepProd}>
                    재고
                  </button>
                </td>
                <td className="type">{item[1]}</td>
                <td className="name">{item[2]}</td>
                <td className="counts">{item[3]}</td>
                <td className="btn">
                  <button className="sell-btn" onClick={sellProd}>
                    판매
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </section>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    initList: () => {
      // const sheetname = "driver1";
      const sheetname = localStorage.getItem("userId");

      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          range: `${sheetname}!A2:D`,
        })
        .then(
          response => {
            dispatch(initCart(response.result.values));
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );
    },
    keep: prodId => {
      dispatch(minusProd(prodId));
      dispatch(plusPart(prodId));
    },
    sell: prodId => {
      dispatch(minusProd(prodId));
    },
    remove: prodId => {
      dispatch(deleteItem(prodId));
    },
  };
}

function mapStateToProps(state) {
  return {
    myCart: state.myCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
