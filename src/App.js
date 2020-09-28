import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Loading } from "common";
import { Login, Rel } from "pages";
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
      console.log(isSignedIn);
      if (isSignedIn) {
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

    handleClientLoad();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>{loading ? <Loading /> : logined ? <Route exact path="/" component={Rel} /> : <Route exact path="/" component={Login} />}</Switch>
      </Router>
    </div>
  );
}

export default App;
