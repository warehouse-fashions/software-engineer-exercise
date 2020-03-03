import React from 'react'

import ProductCard from './ProductCard'
// import Lightbox from './Lightbox'
import LightboxClass from './LightboxClass'

var jsonProd = require('../../../data/product.json')
var jsonRec = require('../../../data/recommendations.json')

export default class Recommend extends React.Component {
  constructor() {
    super()
    this.state = {
      render: false,
      products: jsonProd,
      recommendations: jsonRec,
      hit: '', //recommended items
      data: '', //all data
      lightSel: '' //lightbox data for selected item
    }
    this.showLight = this.showLight.bind(this)
    this.hideLight = this.hideLight.bind(this)
    this.hideMobile = this.hideMobile.bind(this)
  }
  componentDidMount() {
    // ESC and Click listeners for lightbox
    document.addEventListener('keydown', this.hideLight, false)
    document.addEventListener('click', this.hideLight, false)
    document.addEventListener('touchstart', this.hideMobile, false)
  }

  componentWillUnmount() {
    // Good practice, but uness for this exercise.
    document.removeEventListener('keydown', this.hideLight, false)
    document.removeEventListener('click', this.hideLight, false)
    document.removeEventListener('touchstart', this.hideMobile, false)
  }

  showLight() {
    // set data for lightbox
    // toggle render
    const render = true
    const lightSel = this.state.products.data.filter(
      product => product.name === event.target.name)[0]
    this.setState({ lightSel, render })
    // show lightbox:
    // we need to delay showing and resetting lightbox
    // to let the re-render kick in and display elements
    // this is also important for the above props to 
    // register on child components first mount
    setTimeout(()=>{
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'flex'
      document.getElementsByClassName('buttonFirst___2rhFr')[0].click()
    },50)
    console.log('updating lightbox...', lightSel)
  }

  hideLight() {
    // if either ESC or user clicked out of lightbox => hide lightbox
    if (!this.state.render) {
      return null
    } else if (event.key === 'Escape' ||
    event.toElement.className === 'void') {
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
      const render = false
      this.setState({ data: '', render })
    } 
    console.log(event)
  }

  hideMobile() {
    if (!this.state.render) {
      return null
    }
    if (event.srcElement.className === 'close'){
      const lightbox = document.getElementsByClassName('void')[0]
      lightbox.style.display = 'none'
      const render = false
      this.setState({ data: '', render })
    }
  }

  render() {
    console.log('lightbox = ',this.state.render)

    // as long as we have recommendations, render them
    if (!this.state.recommendations.hits) return null
    
    // filter recommendations to those which we have images for
    const hits = this.state.recommendations.hits.filter(product =>
      Object.keys(product).includes('image'))

    return (
      <div className='recommend'>
        <h3>We Recommend</h3>
        <div className='grid'>
          {hits.map((elem, index) => (
            <ProductCard key={index} hits={elem} showLight={this.showLight} />
          ))}
          {this.state.render ? (
            <LightboxClass
              all={this.state.products}
              hits={hits}
              sel={this.state.lightSel}
            />
          ) : null}
        </div>
      </div>
    )
  }
}
