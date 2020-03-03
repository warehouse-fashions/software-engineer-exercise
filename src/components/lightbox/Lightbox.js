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

// replace html string sel in JSON object
function parseHTML(string) {
  return String(string)
    .replace(/<BR>/gi, '\n')
    .replace(/<br class="k-br">/gi, '')
    .replace(/&nbsp;/gi, ' ')
}


let imgArr = []

const Lightbox = ({ all, hits, sel }) => {

  imgArr = sel.image_groups ? sel.image_groups[0].images : []
  // grab sel of variable arrays
  const colArr = sel.variation_attributes
    ? sel.variation_attributes[0].values
    : []
  const sizeArr = sel.variation_attributes
    ? sel.variation_attributes[1].values
    : []
  // update the title when you interact with lightbox
  const title = `${sel ? sel.name : 'Home'} | Warehouse`
  document.getElementsByTagName('title')[0].innerHTML = title

  // price reconciliation (data is missing some prices, that hits have)
  const price = sel ? Object.values(hits.filter((elem) => elem.product_name === sel.name))[0].price : []

  function updateColor(sel, color) {
    // colour picked
    console.log('color: ',color)
  
    // resulting array of produts === color
    // const picked = sel.variants.filter(elem => elem.variation_values.color === color)
    const variant = all.data.filter(elem => elem.id === sel.id)

    // grabimages_groups where the object key variation_value === color

    const picked = variant[0].image_groups.filter(elem => Object.values(elem).includes(color))[0].images


    console.log('variant: ',variant)
    console.log('picked : ',picked)

    imgArr = picked.map(elem => elem.link)
    console.log(imgArr)
  }

  // render
  return (
    <div className='void'>
      <div className='lightbox' name='lightbox'>
        {/* left half */}
        <div className='light-left'>
          <CarouselProvider
            naturalSlideWidth={200}
            naturalSlideHeight={200}
            totalSlides={imgArr.length}
          >
            <Slider>
              {imgArr.map((elem, index) => (
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
          <h3>{sel.name}</h3>
          <h5>£ {Number(`${price}`).toFixed(2)}</h5>

          {/* color variants */}
          <div>
            {colArr.map((elem, index) => (
              <span className='light-color' key={index}>
                <div onClick={() => { updateColor(sel, event.target.id) }} id={elem.value} className='col-box' style={{ backgroundColor: String(elem.name).split(' ').join('') }}></div>
                <span> {elem.name} </span>
              </span>
            ))}
          </div>
          
          {/* size variants */}
          <div>
            {sizeArr.map((elem, index) => (
              <span key={index} className='sizing'>
                {' '}
                {elem.name}{' '}
              </span>
            ))}
          </div>

          {/* additional info */}
          <p className='product'>{parseHTML(sel.c_additionalDescription)}</p>
          <p>{parseHTML(sel.c_additionalInformation)}</p>
        </div>
        {/* end of lightbox */}
      </div>
    </div>
  )
}

export default Lightbox
