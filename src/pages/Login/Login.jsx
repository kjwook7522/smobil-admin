import React from 'react';
import firebase from 'firebase/app';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';
import { authService, googleProvider } from '../../firebaseApp';

function Login() {
  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleGoogleLogin = () => {
    authService
      .signInWithPopup(googleProvider)
      .then(result => {
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage);
        // ...
      });
  };
  return (
    <section id="login">
      <div className="login-frame">
        <img src="/logo_bl.png" alt="logo" />
        <button onClick={handleAuthClick}>
          <FcGoogle />
          <span>구글로 로그인</span>
        </button>
        <button onClick={handleGoogleLogin}>Googl Test</button>
      </div>
    </section>
  );
}

export default Login;
