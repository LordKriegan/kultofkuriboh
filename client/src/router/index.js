import React from "react"
import { Redirect, Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import { User } from "../api"
import * as screens from "../screens"

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => (User.getUserToken() ? <Redirect to="/home" /> : <Component {...props} />)}
  />
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props => (User.getUserToken() ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

export default () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <PublicRoute path="/" component={screens.Auth} exact />
        <PrivateRoute path="/home" component={screens.Home} exact />
        <Route component={screens.NotFound} />
      </Switch>
    </Router>
  )
}
