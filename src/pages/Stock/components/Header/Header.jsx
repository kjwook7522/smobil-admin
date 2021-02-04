import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import firebase from 'firebase/app';

function Header() {
  // const name = localStorage.getItem("fullname");
  const name = firebase.auth().currentUser.displayName
  const handleSignoutClick = () => {
    // window.gapi.auth2.getAuthInstance().signOut();
    firebase.auth().signOut();
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
}

export default Header;
