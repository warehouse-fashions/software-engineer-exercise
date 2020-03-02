import React from 'react'
var jsonData = require('../../../data/product.json')

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
    // binds
  }
  
  // function
  componentDidMount(){
    this.setState({ data: jsonData })
  }

  render() {
    if (!this.state.data) return null
    console.log('data: ',this.state.data)
    return <h1>Test Header</h1>
  }
}
