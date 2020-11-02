import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const name = localStorage.getItem("fullname");
  const handleSignoutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const checkGoogleId = () => {
    const userId = localStorage.getItem("userId");
    alert("google unique id는 " + userId + "입니다.");
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
        <button className="header-btn" onClick={checkGoogleId}>
          구글 고유번호 확인
        </button>
      </div>
    </section>
  );
}

export default Header;
