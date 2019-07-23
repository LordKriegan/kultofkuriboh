import React from "react"
import { Redirect, Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import AppDrawer from '../components/AppDrawer'
import { User } from "../api"
import * as screens from "../screens"

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      User.getToken() ? <Redirect to="/home" /> : <Component {...props} user={User.getUser()} />
    }
  />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      User.getToken() ? <Component {...props} user={User.getUser()} /> : <Redirect to="/" />
    }
  />
)

export default () => {
  return (
    <Router history={createBrowserHistory()}>
      <AppDrawer />
      <Switch>
        <PublicRoute path="/" component={screens.Auth} exact />
        <PrivateRoute path="/home" component={screens.Home} exact />
        <PrivateRoute path="/profile" component={screens.Profile} exact />
        <PrivateRoute path="/trade" component={screens.Trade} exact />
        <PrivateRoute path="/collection" component={screens.Collection} exact />
        <PrivateRoute path="/findusers" component={screens.SearchUsers} exact />
        <Route component={screens.NotFound} />
      </Switch>
    </Router>
  )
}
