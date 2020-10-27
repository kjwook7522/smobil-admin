import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Loading } from "common";
import { Login, Rel, Admin } from "pages";
import "./App.css";

function App() {
  const [logined, setLogined] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CLIENT_ID = "542989334376-gjqs6grpj2o23t91n1ttht0gtu10mk3g.apps.googleusercontent.com";
    const API_KEY = "AIzaSyALB0KHFqZ_Be9WJKf_eIa0Nb3GHjr_LxM";
    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    const handleClientLoad = () => {
      window.gapi.load("client:auth2", initClient);
    };

    const updateSigninStatus = isSignedIn => {
      if (isSignedIn) {
        saveMyInfo();
        setLogined(true);
      } else {
        setLogined(false);
      }
    };

    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          setLoading(false);
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };

    const saveMyInfo = () => {
      const fullname = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
      const userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
      const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
    };

    //******* prevent double tab zoom *******//
    var lastTouchEnd = 0;
    document.documentElement.addEventListener(
      "touchend",
      function (e) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    //****************************************//

    handleClientLoad();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          {loading ? <Loading /> : logined ? <Route exact path="/" component={Rel} /> : <Route exact path="/" component={Login} />}
          {loading ? <Loading /> : logined ? <Route path="/admin" component={Admin} /> : <Route exact path="/admin" component={Login} />}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
