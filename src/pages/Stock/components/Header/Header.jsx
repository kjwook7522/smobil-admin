import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { authService } from '../../../../firebaseApp';

function Header() {
  console.log('test');
  // const name = localStorage.getItem("fullname");
  const name = authService.currentUser.displayName;
  const handleSignoutClick = () => {
    // window.gapi.auth2.getAuthInstance().signOut();
    authService.signOut();
  };

  return (
    <section id="header">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name"> 기사님</h1>
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
}

export default Header;
