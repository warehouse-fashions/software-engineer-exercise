import React from 'react'

import ProductCard from './ProductCard'
import Lightbox from './Lightbox'

var jsonProd = require('../../../data/product.json')
var jsonRec = require('../../../data/recommendations.json')

export default class Recommend extends React.Component {
  constructor() {
    super()
    this.state = {
      products: {}, 
      recommendations: {},
      hit: '', //selected item to display in lightbox
      data: '' //lightbox data for selected item
    }
    this.showLight = this.showLight.bind(this)
  }
  componentDidMount() {
    this.setState({
      products: jsonProd,
      recommendations: jsonRec
    })
    document.addEventListener('keydown', this.hideLight, false)
    document.addEventListener('click', this.hideLight, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.hideLight, false)
    document.removeEventListener('click', this.hideLight, false)
  }

  showLight() {
    console.log('event =',event.target.name) 
    const data = this.state.products.data.filter(
      product => product.name === event.target.name)[0]
      
    this.setState({ data })

    const lightbox = document.getElementsByClassName('void')[0]
    lightbox.style.display = 'flex'
    console.log(this.state)
  }

  hideLight() {
    if (event.key === 'Escape') {
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
    } else if (event.toElement.className === 'void') {
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
    }
  }

  render() {
    if (!this.state.recommendations.hits) return null
    const hits = this.state.recommendations.hits.filter(product =>
      Object.keys(product).includes('image')
    )
    console.log(this.state)
    return (
      <div className='recommend'>
        <h3>We Recommend</h3>
        <div className='grid'>
          {hits.map((elem, index) => (
            <ProductCard key={index} hits={elem} showLight={this.showLight} />
          ))}
          <Lightbox
            data={this.state.data}
          />
        </div>
      </div>
    )
  }
}
