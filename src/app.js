import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'

import '../src/styles/main.scss'

import 'normalize.css'

const App = () => (
  <BrowserRouter>
    {/* navbar */}

    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
    {/* footer */}
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

