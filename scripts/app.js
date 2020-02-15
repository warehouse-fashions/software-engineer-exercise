//  to do : 
// Image carousel 
// Close modal button
// styling


function init () {

  const app = document.querySelector('#app')
  const modal = document.querySelector('.modal')
  const header = document.querySelector('.header')

 
  // hide the modal on page load
  modal.classList.replace('modal', 'hidden')

  // const items = []

  // Getting the recommendations data and calling the get products function to get the product data
  function getRecommendations () {
    fetch('./data/recommendations.json')
      .then(res => res.json())
      .then(recommendations => {
        getProduct(recommendations)
        // mapRecommendations(recommendations)
      })
      .catch(err => {
        console.log(err)
      }) 
  }
  //  Invoking this function to get recommendations data
  getRecommendations()

  // Getting the product data
  function getProduct (recommendations) {
    fetch('./data/product.json')
      .then(res => res.json())
      .then(product => {
        // console.log(product, 'product')
        mapItems(product, recommendations)
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  // Mapping the items to the page using the data from products and recommendations 
  function mapItems(product, recommendations) {
    app.innerHTML = recommendations.hits.map(elem => 
      `
    <div class="items">
      ${product.data.map(item => item.name === elem.product_name ? 
    `
      <img src=${item.image_groups[0].images[0].link}
    ` : '').join('')}
      <div> 
        <h2>${elem.product_name}</h2>
        <p>£${elem.price}.00</p>
      </div>
    </div>
    `, ).join('')

    // add an event listener to each item
    const items = document.querySelectorAll('.items')
    items.forEach(item => item.addEventListener('click', function() {
      handleClick(product, recommendations)
    }))
  }

  // handle the click event
  function handleClick(product, recommendations) {
    openModal(product, recommendations)
  }

  function handleImageClick(product, recommendations, rightButton, carouselImage) {
    // console.log('clicked')
    updateImage(product, recommendations, rightButton, carouselImage)


    // const currentImage = product.data.map((p, i) => 
    //   recommendations.hits.map((rec, i) => rec.product_name === p.name ? 
    //     p.image_groups[0].images : ''))

    // // const j = 0

    // // console.log(currentImage)
    // console.log(event.target)
    // console.log(carouselImage.id)

    // // console.log(currentImage.map((c, i) => c[i].length))
    // for (let j = 0; j < 5; j++) {

    //   // currentImage.map((c, i) => console.log(c[i][j]))
    //   currentImage.map((c, i) => console.log(c[carouselImage.id][j]))
    //   // console.log(event.target)

    // }
  }

  function updateImage(product, recommendations, rightButton, carouselImage) {

    const currentImage = product.data.map((p, i) => 
      recommendations.hits.map((rec, i) => rec.product_name === p.name ? 
        p.image_groups[0].images : ''))

    console.log(currentImage)

    const image = currentImage.map((c, i) => c[i]).filter(c => c !== '')
  
    let j = 0
    rightButton.addEventListener('click', function() {

      if (j < image[carouselImage.id].length - 1) {
        j++
        carouselImage.src = image[carouselImage.id][j].link

        // handleImageClick(product, recommendations, rightButton, carouselImage)

      }

    })
  }

  // open the modal and display the item detail
  // product name, price, colour swatch and size variations

  //  image carousel

  function openModal(product, recommendations) {
    // console.log(product.data.map(p => p.image_groups[0].images))
    // console.log(recommendations)
    console.log(product.data.map((item, index) => ({ index, item })
    ))
    modal.classList.replace('hidden', 'modal')
    app.classList.add('modal-open')
    header.classList.add('modal-open')
    modal.innerHTML = 
      `
      <div>${product.data.map((item, i) => 
    item.image_groups[0].images[0].link === event.target.currentSrc ? 
      `<h4>
      ${item.name}
      </h4>
      <div>
      <img id="${i}" class="image-carousel" src=${item.image_groups[0].images[0].link} />
      <button data-id="${i}" class="carousel-button-right">right arrow</button>
      </div>
      <div>
      <img class="swatch" src=${item.image_groups[1].images.map(swatch => swatch.link)} />
      </div>
      <div>
      Sizes available
      <p>
      ${item.variation_attributes[1].values.map(val => val.name).join(' ')}
      </p>
      </div>
      <div>
      ${recommendations.hits.map(rec => rec.product_name === item.name ? 
    `
    £${rec.price}.00
    `
    : '').join('')}
      </div>
      `

      : '').join('')}
      </div>
      `

    const rightButton = document.querySelector('.carousel-button-right')
    const carouselImage = document.querySelector('.image-carousel')

    handleImageClick(product, recommendations, rightButton, carouselImage)
  }


}

document.addEventListener('DOMContentLoaded', init)