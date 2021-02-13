import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { driverReject } from 'actions/driver';
import { authService } from 'firebaseApp';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const name = authService.currentUser?.displayName;
  
  const handleSignoutClick = () => {
    dispatch(driverReject());
    authService.signOut();
  };

  return (
    <section id="header">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name">{name} 기사님</h1>
      <div className="btn-wrapper">
        <button className="header-btn" onClick={handleSignoutClick}>
          로그아웃
        </button>
        <Link to="/admin">
          <button className="header-btn">관리자 전환</button>
        </Link>
      </div>
    </section>
  );
};

export default Header;
