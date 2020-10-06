import React from "react";
import { TiArrowBack } from "react-icons/ti";
import "./Part.css";

function Part({ category, setCategory }) {
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
  return (
    <section id="part">
      <div className="header">
        <h1>{changeName(category)}</h1>
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
          <tr>
            <td>배터리</td>
            <td>테스트 베터리</td>
            <td>25</td>
            <td>
              <button>담기</button>
            </td>
          </tr>
          <tr>
            <td>배터리</td>
            <td>테스트 베터리</td>
            <td>25</td>
            <td>
              <button>담기</button>
            </td>
          </tr>
          <tr>
            <td>배터리</td>
            <td>테스트 베터리</td>
            <td>25</td>
            <td>
              <button>담기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Part;
