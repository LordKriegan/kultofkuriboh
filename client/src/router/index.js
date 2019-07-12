import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"

import * as screens from "../screens"

export default () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/" component={screens.Auth} exact />
        <Route path="/home" component={screens.Home} exact />
        <Route component={screens.NotFound} />
      </Switch>
    </Router>
  )
}
