import React from "react";
import { connect } from "react-redux";
import { minusPart, plusProd, addItem } from "actions";
import { TiArrowBack } from "react-icons/ti";
import "./Part.css";

function Part({ category, setCategory, addCart, newItem, categoryList, cartList }) {
  const chgNmToK = category => {
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

  // const chgNmToE = category => {
  //   switch (category) {
  //     case "배터리":
  //       return "battery";
  //     case "오일":
  //       return "oil";
  //     case "필터":
  //       return "filter";
  //     case "와이퍼":
  //       return "wiper";
  //     default:
  //       return;
  //   }
  // };

  const addProd = e => {
    const prodId = e.target.parentElement.parentElement.id;
    const prodIdx = categoryList.findIndex(item => item[0] === prodId);

    if (!cartList.find(item => item[0] === prodId)) {
      newItem(prodId, chgNmToK(category), categoryList[prodIdx][2]);
    }
    if (Number(categoryList[prodIdx][3]) === 0) {
      alert("현재 재고가 없습니다.");
      return;
    }
    addCart(prodId);
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
  return {
    addCart: id => {
      dispatch(minusPart(id));
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
