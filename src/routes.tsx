import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './containers/Home'

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route component={Home} exact={true} path={'/'} />
    </Switch>
  </HashRouter>
)

export default Routes
