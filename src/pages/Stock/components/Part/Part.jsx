import React from "react";
import { connect } from "react-redux";
import { minusPart, plusProd, addItem } from "actions";
import { TiArrowBack } from "react-icons/ti";
import { writeLog } from "common";
import "./Part.css";

function Part({ category, setCategory, addCart, newItem, categoryList, cartList }) {
  const chgNmToK = category => {
    switch (category) {
      case "battery":
        return "배터리";
      case "oil":
        return "오일";
      case "oil-filter":
        return "오일필터";
      case "air-filter":
        return "에어필터";
      case "wiper":
        return "와이퍼";
      case "washer":
        return "워셔액";
      case "pad":
        return "패드";
      case "aircon":
        return "에어컨필터";
      case "etc":
        return "기타";
      default:
        return;
    }
  };

  const addProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = categoryList.findIndex(item => item[0] === prodId);
    const fullname = localStorage.getItem("fullname");
    const prodCategory = categoryList[prodIdx][1];
    const prodName = categoryList[prodIdx][2];

    if (Number(categoryList[prodIdx][3]) === 0) {
      alert("현재 재고가 없습니다.");
      return;
    }
    addCart(prodId);
    writeLog([parseInt(prodId), prodCategory, prodName, 1, fullname, "트렁크 담기"]);
  };

  return (
    <section id="part">
      <div className="header">
        <h1>{chgNmToK(category)}</h1>
        <TiArrowBack
          onClick={() => {
            setCategory(0);
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
          {categoryList.map(item =>
            item[1] === chgNmToK(category) ? (
              <tr key={item[0]} id={item[0]}>
                <td>{chgNmToK(category)}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
                <td>
                  <button onClick={addProd}>담기</button>
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
  const driverId = localStorage.getItem("userId");

  return {
    addCart: id => {
      dispatch(minusPart(id));
      dispatch(plusProd(id, driverId));
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
