import React from "react";
import "./Header.css";

function Header() {
  const name = localStorage.getItem("fullname");
  const handleSignoutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <section id="header">
      <img src="/logo_wh.png" alt="logo" />
      <h1 className="name">{name} 기사님</h1>
      <button className="logout-btn" onClick={handleSignoutClick}>
        로그아웃
      </button>
    </section>
  );
}

export default Header;
