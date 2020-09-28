import React from "react";
import "./Login.css";

function Login() {
  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  }
  return (
    <section id="login">
      <div className="login-frame">
        <img src="/logo.png" alt="logo" />
        <button onClick={handleAuthClick}>Google로 로그인</button>
      </div>
    </section>
  );
}

export default Login;
