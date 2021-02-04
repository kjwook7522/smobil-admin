import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading } from 'common';
import { Login, Stock, Admin, GoogleId } from 'pages';
import { setLogin, setLoading } from 'actions';
import { spreadsheetId } from './common/constant';
import firebase from 'firebase/app';
import './firebaseApp';
import './App.css';

function App({ isLogined, isLoading, dispatchLogin, dispatchLoading }) {
  useEffect(() => {
    const CLIENT_ID = '542989334376-gjqs6grpj2o23t91n1ttht0gtu10mk3g.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyALB0KHFqZ_Be9WJKf_eIa0Nb3GHjr_LxM';
    const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
    const handleClientLoad = () => {
      window.gapi.load('client:auth2', initClient);
    };

    const updateSigninStatus = isSignedIn => {
      if (isSignedIn) {
        saveMyInfo();
        dispatchLoading(true);
        dispatchLogin(true);
        checkDeliver();
      } else {
        dispatchLogin(false);
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
          dispatchLoading(false);
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };

    const saveMyInfo = () => {
      const fullname = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
      const userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
      const email = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('userId', userId);
      localStorage.setItem('email', email);
    };

    const checkDeliver = () => {
      const sheetname = 'drivers';
      const driverId = localStorage.getItem('userId');
      let driverList = [];

      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId,
          range: `${sheetname}!A2:C`,
        })
        .then(
          response => {
            driverList = response.result.values;
            if (driverList.find(row => row[0] === driverId)) {
              dispatchLoading(false);
            } else {
              window.gapi.auth2.getAuthInstance().signOut();
              window.location.pathname = 'googleid';
            }
          },
          reason => {
            console.log(reason.result.error.message);
          }
        );
    };

    //******* prevent double tab zoom *******//
    var lastTouchEnd = 0;
    document.documentElement.addEventListener(
      'touchend',
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

    // handleClientLoad();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var uid = user.uid;
        dispatchLogin(true);
        dispatchLoading(false);
        // ...
      } else {
        console.log('sign out');
        dispatchLogin(false);
        // User is signed out
        // ...
      }
    });
  }, [dispatchLoading, dispatchLogin]);

  return (
    <div className="App">
      <Router>
        <Switch>
          {isLoading ? (
            <Route exact path="/" component={Loading} />
          ) : isLogined ? (
            <Route exact path="/" component={Stock} />
          ) : (
            <Route exact path="/" component={Login} />
          )}
          {isLoading ? (
            <Route exact path="/" component={Loading} />
          ) : isLogined ? (
            <Route path="/admin" component={Admin} />
          ) : (
            <Route exact path="/admin" component={Login} />
          )}
          <Route path="/googleid" component={GoogleId} />
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLogined: state.login,
    isLoading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: set => {
      dispatch(setLogin(set));
    },
    dispatchLoading: set => {
      dispatch(setLoading(set));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
