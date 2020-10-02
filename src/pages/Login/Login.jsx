import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

function Login() {
  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };
  return (
    <section id="login">
      <div className="login-frame">
        <img src="/logo_bl.png" alt="logo" />
        <button onClick={handleAuthClick}>
          <FcGoogle />
          <span>구글로 로그인</span>
        </button>
      </div>
    </section>
  );
}

export default Login;
