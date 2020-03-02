import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

function parseHTML(string) {
  return String(string)
    .replace(/<BR>/gi, '\n')
    .replace(/<br class="k-br">/gi, '')
    .replace(/&nbsp;/gi, ' ')
}

const Lightbox = ({ data }) => {
  const imgArr = data.image_groups ? data.image_groups[0].images : []
  const colArr = data.variation_attributes
    ? data.variation_attributes[0].values
    : []
  const sizeArr = data.variation_attributes
    ? data.variation_attributes[1].values
    : []
  return (
    <div className='void'>
      <div className='lightbox' name='lightbox'>
        <div className='light-left'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={imgArr.length}
          >
            <div className='car-nav'>
              <ButtonBack>&lt;</ButtonBack>
              <ButtonNext>&gt;</ButtonNext>
            </div>
            <Slider>
              {imgArr.map((elem, index) => (
                <Slide index={index} key={index}>
                  <img className='light-img' src={elem.link} />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>

        <div className='light-right'>
          <h3>{data.name}</h3>
          <h5>£ {Number(`${data.price}`).toFixed(2)}</h5>
          <div>
            {colArr.map((elem, index) => (
              <span key={index}> {elem.name} </span>
            ))}
          </div>
          <div>
            {sizeArr.map((elem, index) => (
              <span key={index} className='sizing'>
                {' '}
                {elem.name}{' '}
              </span>
            ))}
          </div>
          <p className='product'>{parseHTML(data.c_additionalDescription)}</p>
          <p>{parseHTML(data.c_additionalInformation)}</p>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
