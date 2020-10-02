import React from "react";
import "./Cart.css";

function Cart() {
  const temp = [
    { type: "배터리", name: "KV1", counts: 5 },
    { type: "배터리", name: "KV2", counts: 1 },
    { type: "와이퍼", name: "AVG-G1", counts: 2 },
    { type: "오일", name: "SS01", counts: 20 },
  ];
  return (
    <section id="cart">
      <h1>내 트렁크</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>품목</th>
            <th>상세명</th>
            <th>수량</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {temp.map(item => (
            <tr>
              <td className="type">{item.type}</td>
              <td className="name">{item.name}</td>
              <td className="counts">{item.counts}</td>
              <td className="btn">
                <button className="keep-btn">재고</button>
                <button className="sell-btn">판매</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Cart;
