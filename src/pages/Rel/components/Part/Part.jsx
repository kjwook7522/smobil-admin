import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { initPart, minusPart, plusProd, addItem } from "actions";
import { TiArrowBack } from "react-icons/ti";
import "./Part.css";

function Part({ category, setCategory, initList, resetList, addCart, newItem, categoryList, cartList }) {
  useEffect(() => {
    initList(category);
  }, [category, initList]);

  const changeName = () => {
    switch (category) {
      case "battery":
        return "배터리";
      case "oil":
        return "오일";
      case "filter":
        return "필터";
      case "wiper":
        return "와이퍼";
      default:
        return;
    }
  };

  const addProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = categoryList.findIndex(item => item[0] === prodId);

    if (!cartList.find(item => item[0] === prodId)) {
      newItem(prodId, changeName(), categoryList[prodIdx][1]);
    } else {
      if (categoryList[prodIdx][2] === 0) {
        alert("현재 재고가 없습니다.");
        return;
      }
      addCart(prodId, category);
    }
  };

  return (
    <section id="part">
      <div className="header">
        <h1>{changeName(category)}</h1>
        <TiArrowBack
          onClick={() => {
            setCategory(0);
            resetList();
          }}
        />
      </div>
      <table className="part-table">
        <thead>
          <tr>
            <th width="15%">품목</th>
            <th>상세명</th>
            <th width="15%">수량</th>
            <th width="15%">관리</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map(item => (
            <tr key={item[0]} id={item[0]}>
              <td>{changeName(category)}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>
                <button onClick={addProd}>담기</button>
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
    initList: category => {
      const sheetname = category;

      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
          range: `${sheetname}!A2:C`,
        })
        .then(
          response => {
            dispatch(initPart(response.result.values));
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );
    },
    resetList: () => {
      dispatch(initPart([]));
    },
    addCart: (id, part) => {
      dispatch(minusPart(id, part));
      dispatch(plusProd(id));
    },
    newItem: (id, kind, name) => {
      dispatch(addItem(id, kind, name));
    },
  };
}

function mapStateToProps(state) {
  return {
    categoryList: state.partList,
    cartList: state.myCart,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Part);
