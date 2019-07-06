import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn, exact, reviewURI }) => { //prevents logged in user from seeing log in / sign up
  function toRender(props) {
    if (loggedIn) {
      if (path === "/login" || path === "/signup") {
        } else {
        return <Redirect to='/'/>;
        }
      }
      }
     else {
      return <Component {...props} />;
    }
  }
  return (
    <Route path={path} exact={exact} render={toRender} />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => {
      if (loggedIn) {
        return <Component {...props} />
      } else {
        return <Redirect to="/login" />
      }
  }} />
);

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.username),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
