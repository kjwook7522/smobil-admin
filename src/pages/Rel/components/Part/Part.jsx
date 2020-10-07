import React from "react";
import { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import "./Part.css";

function Part({ category, setCategory }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const sheetname = category;

    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1UvqnHHLpQIZHUNEERvyJ-2YGhYhBDPYxHbul3Jm9qp0",
        range: `${sheetname}!A2:C`,
      })
      .then(
        response => {
          setCategoryList(response.result.values);
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
  }, [category]);

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
          {categoryList.map(item => (
            <tr key={item[0]}>
              <td>{changeName(category)}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>
                <button>담기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Part;
