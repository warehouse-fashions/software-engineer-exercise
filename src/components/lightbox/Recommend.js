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
      hit: ''
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
    const select = this.state.recommendations.hits.filter(
      product => product.product_id === event.target.id
    )
    console.log('sel hit = ', select[0])
    this.setState({ hit: select[0] })
    const lightbox = document.getElementsByClassName('lightbox')[0]
    lightbox.style.display = 'flex'
  }

  hideLight() {
    if (event.key === 'Escape') {
      console.log('escape')
      const lightbox = document.getElementsByClassName('lightbox')[0]
      lightbox.style.display = 'none'
    } else if (event.toElement.className === '') {
      const lightbox = document.getElementsByClassName('lightbox')[0]
      lightbox.style.display = 'none'
    }
  }

  render() {
    if (!this.state.recommendations.hits) return null
    const hits = this.state.recommendations.hits.filter(product =>
      Object.keys(product).includes('image')
    )
    console.log('hits', hits)
    return (
      <div className='recommend'>
        <h3>We Recommend</h3>
        <div className='grid'>
          {hits.map((elem, index) => (
            <ProductCard key={index} hits={elem} showLight={this.showLight} />
          ))}
          <Lightbox hits={this.state.hit} />
        </div>
      </div>
    )
  }
}
