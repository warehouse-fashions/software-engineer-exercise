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
      hit: '', //recommended items 
      data: '', //all data
      lightSel: '' //lightbox data for selected item
    }
    this.showLight = this.showLight.bind(this)
    this.hideLight = this.hideLight.bind(this)
  }
  componentDidMount() {
    this.setState({
      products: jsonProd,
      recommendations: jsonRec
    })
    // ESC and Click listeners for lightbox
    document.addEventListener('keydown', this.hideLight, false)
    document.addEventListener('click', this.hideLight, false)
  }
  // Responsible disposal of event listers
  componentWillUnmount() {
    document.removeEventListener('keydown', this.hideLight, false)
  }

  showLight() {
    // set data for lightbox
    const lightSel = this.state.products.data.filter(
      product => product.name === event.target.name)[0]
    this.setState({ lightSel })

    console.log('updating lightbox...',lightSel)

    // show lightbox
    const lightbox = document.getElementsByClassName('void')[0]
    lightbox.style.display = 'flex'

    // reset carousel
    document.getElementsByClassName('buttonFirst___2rhFr')[0].click()
  }

  hideLight() {
    // if either ESC or user clicked out of lightbox => hide lightbox
    if (event.key === 'Escape') {
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
      this.setState({ data: '' })
    } else if (event.toElement.className === 'void') {
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
      this.setState({ data: '' })
    }
  }

  render() {
    // as long as we have recommendations, render them
    if (!this.state.recommendations.hits) return null

    console.log(this.state.products.data.map(elem => elem.variation_attributes[0].values))
    // filter recommendations to those which we have images for
    const hits = this.state.recommendations.hits.filter(product =>
      Object.keys(product).includes('image'))
    // render
    return (
      <div className='recommend'>
        <h3>We Recommend</h3>
        <div className='grid'>
          {hits.map((elem, index) => (
            <ProductCard key={index} hits={elem} showLight={this.showLight} />
          ))}
          <Lightbox
            all={this.state.products}
            hits={hits}
            sel={this.state.lightSel}
          />
        </div>
      </div>
    )
  }
}
