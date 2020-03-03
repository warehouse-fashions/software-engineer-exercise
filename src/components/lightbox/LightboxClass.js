import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ButtonFirst
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

export default class LightboxClass extends React.Component {
  constructor({ all, hits, sel }) {
    super()
    this.state = {
      products: all,
      hits: hits,
      selected: sel,
      imgArr: sel.image_groups ? sel.image_groups[0].images : [],
      colArr: sel.variation_attributes
        ? sel.variation_attributes[0].values
        : [],
      sizeArr: sel.variation_attributes
        ? sel.variation_attributes[1].values
        : [],
      price: sel
        ? Object.values(hits.filter(elem => elem.product_name === sel.name))[0].price
        : []
    }
    this.updateColor = this.updateColor.bind(this)
  }

  componentDidMount() {
    // update window title when you interact with lightbox
    const title = `${
      this.state.selected ?
        this.state.selected.name
        : 'Home' } | Warehouse`
    document.getElementsByTagName('title')[0].innerHTML = title
  }

  componentWillUnmount() {
    // return title to normal upon leaving lightbox
    document.getElementsByTagName('title')[0].innerHTML = 'Home | Warehouse'
  }

  parseHTML(string) {
    // make product data human readable
    return String(string)
      .replace(/<BR>/gi, '\n')
      .replace(/<br class="k-br">/gi, '')
      .replace(/&nbsp;/gi, ' ')
  }

  color(elem) {
    // set color of color variants, concat to improve
    // finding a valid matching color term
    const output = String(elem)
      .replace('Dark ', 'Dark')
      .replace('Light ','Light')
      .split(' ')[0]
    console.log(`colors have turned from:
    ${elem} => ${output}
    `)
    return output
  }

  updateColor(sel, color) {
    // find all product variants which is this product
    const variant = this.state.products.data.filter(elem => elem.id === sel.id)

    // grabimages_groups where the object key variation_value === this color
    const picked = variant[0].image_groups.filter(elem =>
      Object.values(elem).includes(color))[0].images

    // update stateful array with new data
    const imgArr = picked.map(elem => elem)
    this.setState({ imgArr })
    console.log('update image array:', imgArr)
  }

  render() {
    console.log(
      'lightbox props:',
      '\n',
      this.props,
      '\n',
      'lightbox state:',
      this.state
    )
    return (
      <div className='void'>
        <div className='lightbox' name='lightbox'>

          {/* left half */}
          <div className='light-left'>
            <CarouselProvider
              orientation={window.innerWidth < 500 ? 'vertical' : 'horizontal'}
              naturalSlideWidth={200}
              naturalSlideHeight={200}
              totalSlides={this.state.imgArr.length}
            >
              <Slider>
                {this.state.imgArr.map((elem, index) => (
                  <Slide index={index} key={index}>
                    <img className='light-img' src={elem.link} />
                  </Slide>
                ))}
              </Slider>
              <ButtonFirst />
              <div className='car-nav'>
                <ButtonBack>
                  <img className='car-icon' src='../assets/ico/car-nav.png' />
                </ButtonBack>
                <ButtonNext>
                  <img className='car-icon' src='../assets/ico/car-nav.png' />
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>

          {/* right half */}
          <div className='light-right'>

            {/* header & price */}
            <h3>{this.state.selected.name}</h3>
            <h5>£ {Number(`${this.state.price}`).toFixed(2)}</h5>

            {/* color variants */}
            <div>
              {this.state.colArr.map((elem, index) => (
                <span className='light-color' key={index}>
                  <div onClick={() => {
                    this.updateColor(this.state.selected, event.target.id)
                  }}
                  id={elem.value}
                  className='col-box'
                  style={{ backgroundColor: `${this.color(elem.name)}` }}
                  />
                  <span id='colname'> {elem.name} </span>
                </span>
              ))}
            </div>

            {/* size variants */}
            <div>
              {this.state.sizeArr.map((elem, index) => (
                <span key={index} className='sizing'>
                  {elem.name}
                </span>
              ))}
            </div>

            {/* additional info */}
            <p>
              {this.parseHTML(this.state.selected.c_additionalDescription)}
            </p>
            <p>
              {this.parseHTML(this.state.selected.c_additionalInformation)}
            </p>
          </div>
          {/* end of lightbox */}

        </div>
      </div>
    )
  }
}
