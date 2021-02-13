import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaTruckMoving, FaBoxOpen, FaPlusSquare, FaUserCog, FaHistory } from 'react-icons/fa';
import './Admin.css';

const Admin: React.FC = () => {
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  return (
    <section id="admin">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name">관리자</h1>
      <button className="back-btn" onClick={goHome}>
        돌아가기
      </button>

      <div className="manage-menu">
        <div className="col-4">
          <Link to="/admin/drivers">
            <div id="drivers" className="menu-item">
              <FaTruckMoving />
              <p>기사별 재고 확인</p>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/admin/storage">
            <div id="storage" className="menu-item">
              <FaBoxOpen />
              <p>창고 재고 확인</p>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/admin/new">
            <div id="new" className="menu-item">
              <FaPlusSquare />
              <p>신규 제품 입고</p>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/admin/manage">
            <div id="manage" className="menu-item">
              <FaUserCog />
              <p>기사 관리</p>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link to="/admin/log">
            <div id="log" className="menu-item">
              <FaHistory />
              <p>판매 기록</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Admin;
