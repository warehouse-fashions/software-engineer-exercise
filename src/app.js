import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Nav from './components/common/Nav'

import '../src/styles/main.scss'

import 'normalize.css'
import 'animate.css'

const App = () => (
  <BrowserRouter>
    <Nav />

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

