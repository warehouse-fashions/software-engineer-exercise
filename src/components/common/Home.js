import React from 'react'

import NavDropdown from './NavDropdown'
import Recommend from '../lightbox/Recommend'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {}
    // binds
  }
  // function
  render() {
    return (
      <div>
        <NavDropdown />
        <Recommend />
      </div>
    )
  }
}
