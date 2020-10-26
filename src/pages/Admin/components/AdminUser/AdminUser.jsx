import React from "react";
import { FaTruckMoving, FaBoxOpen, FaPlusSquare, FaUserCog } from "react-icons/fa";
import "./AdminUser.css";

function AdminUser({ replace }) {
  const goMain = () => {
    replace("/");
  };

  return (
    <section id="admin">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name">관리자</h1>
      <button className="back-btn" onClick={goMain}>돌아가기</button>

      <div className="manage-menu">
        <div className="col-4">
          <div className="menu-item">
            <FaTruckMoving />
            <p>기사별 재고 확인</p>
          </div>
        </div>
        <div className="col-4">
          <div className="menu-item">
            <FaBoxOpen />
            <p>창고 재고 확인</p>
          </div>
        </div>
        <div className="col-4">
          <div className="menu-item">
            <FaPlusSquare />
            <p>신규 제품 입고</p>
          </div>
        </div>
        <div className="col-4">
          <div className="menu-item">
            <FaUserCog />
            <p>기사 관리</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminUser;
