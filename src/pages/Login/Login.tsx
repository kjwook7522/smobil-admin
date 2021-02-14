import React from 'react';
import { authService, googleProvider } from 'firebaseApp';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login: React.FC = () => {
  const handleGoogleLogin = () => {
    authService
      .signInWithPopup(googleProvider)
      .then(result => {
        let user = result.user;
      })
      .catch(error => {
        console.error(error.message);
      });
  };
  return (
    <section id="login">
      <div className="login-frame">
        <img src="/logo_bl.png" alt="logo" />
        <button onClick={handleGoogleLogin}>
          <FcGoogle />
          <span>구글로 로그인</span>
        </button>
      </div>
    </section>
  );
};

export default Login;
