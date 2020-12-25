import React from "react";
import { FaTruckMoving, FaBoxOpen, FaPlusSquare, FaUserCog } from "react-icons/fa";
import { categoryStruct } from "common";
import "./AdminMenu.css";

function AdminMenu({ replace, setCategory }) {
  const goMain = () => {
    replace("/");
  };

  const selectCategory = e => {
    switch (e.currentTarget.id) {
      case "drivers":
        setCategory({ ...categoryStruct, drivers: true });
        return;
      case "storage":
        setCategory({ ...categoryStruct, storage: true });
        return;
      case "new":
        setCategory({ ...categoryStruct, new: true });
        return;
      case "manage":
        setCategory({ ...categoryStruct, manage: true });
        return;
      default:
        return;
    }
  };

  return (
    <section id="admin-menu">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name">관리자</h1>
      <button className="back-btn" onClick={goMain}>
        돌아가기
      </button>

      <div className="manage-menu">
        <div className="col-4">
          <div id="drivers" className="menu-item" onClick={selectCategory}>
            <FaTruckMoving />
            <p>기사별 재고 확인</p>
          </div>
        </div>
        <div className="col-4">
          <div id="storage" className="menu-item" onClick={selectCategory}>
            <FaBoxOpen />
            <p>창고 재고 확인</p>
          </div>
        </div>
        <div className="col-4">
          <div id="new" className="menu-item" onClick={selectCategory}>
            <FaPlusSquare />
            <p>신규 제품 입고</p>
          </div>
        </div>
        <div className="col-4">
          <div id="manage" className="menu-item" onClick={selectCategory}>
            <FaUserCog />
            <p>기사 관리</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminMenu;
