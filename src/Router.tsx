import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';

interface Props {
  isLogin: boolean;
}

const AppRouter: React.FC<Props> = ({ isLogin }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLogin ? <Home /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
