// styling

function init () {

  // declaring global variables 
  const app = document.querySelector('#app')
  const modal = document.querySelector('.modal')
  const header = document.querySelector('.header')
 
  // hide the modal on page load
  modal.classList.replace('modal', 'hidden')

  // Getting the recommendations data and calling the get products function to get the product data
  function getRecommendations () {
    fetch('./data/recommendations.json')
      .then(res => res.json())
      .then(recommendations => {
        getProduct(recommendations)
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
    app.innerHTML = recommendations.hits.map((elem, i) => 
      `
    <div id=${i} class="items">
      ${product.data.map(item => item.name === elem.product_name ? 
    `
      <img id=${i} src=${elem.image ? elem.image.link : item.image_groups[0].images[0].link}
    ` : '').join('')}
      <div> 
        <h2>${elem.image ? elem.image.title : elem.product_name}</h2>
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
  // handle the clicking through the images event
  function handleImageClick(product, recommendations, carouselButtons, carouselImage) {
    updateImage(product, recommendations, carouselButtons, carouselImage)

  }

  function updateImage(product, recommendations, carouselButtons, carouselImage) {
    //  display default product image
    const currentImage = product.data.map(pro => 
      recommendations.hits.map(rec => rec.product_name === pro.name ? 
        pro.image_groups[0].images : ''))
    
    // map out each array of item images to it's item index
    const image = currentImage.map((current, i) => current[i])

    let j = 0
    carouselButtons.forEach(button => button.addEventListener('click', function() {
      if (event.target.id === 'right-button') {

        // target the length of the array of images on each item through the index of the item 
        // ie.([image array] on item [20])
        if (j < image[carouselImage.id].length - 1) {
          j++
          // update the image source with the next image link in the array of images as the user clicks through
          carouselImage.src = image[carouselImage.id][j].link
        }
      }

      // as above to go back down through the array of images 
      if (event.target.id === 'left-button') {
        if (j > 0) {
          j--
          // replace the image source with the previous image in the array of images as the user clicks through
          carouselImage.src = image[carouselImage.id][j].link
        }
      }

    }))
  }

  // open the modal and display the item detail
  // product name, price, colour swatch and size variations
  function openModal(product, recommendations) {
    modal.classList.replace('hidden', 'modal')
    app.classList.add('modal-open')
    header.classList.add('modal-open')
    modal.innerHTML = 
      `
      <div class="modal-data">${product.data.map((item, i) => 
    i.toString() === event.target.id ?
      `
      <div class="carousel-left">
      <button id="left-button" class="carousel-button"> < </button>
      <img id="${i}" class="image-carousel" src=${item.image_groups[0].images[0].link} />
      <button id="right-button" class="carousel-button"> > </button>
      </div>
      <div class="carousel-right">
      <div class="carousel-header">
      <h4 class="carousel-name">
      ${item.name}
      </h4>
      <button class="close-modal">X</button>
      </div>
      <div class="modal-price">
      ${recommendations.hits.map((rec, i) => i.toString() === event.target.id ?
    `
    £${rec.price}.00
    `
    : '').join('')}
      </div>
      <div class="modal-swatch">
      <img class="swatch" src=${item.image_groups[1].view_type === 'swatch' ? 
    item.image_groups[1].images.map(swatch => swatch.link) : 
    item.image_groups[2].images.map(swatch => swatch.link)} />
      </div>
      <div class="modal-sizes">
      ${item.variation_attributes[1].values.map(val => 
    `<p>${val.name}</p>`).join(' ')}
      </div>
      </div>  
      `

      : '').join('')}
      </div>
      `

    const carouselButtons = document.querySelectorAll('.carousel-button')
    const carouselImage = document.querySelector('.image-carousel')
    const closeModalButton = document.querySelector('.close-modal')

    handleImageClick(product, recommendations, carouselButtons, carouselImage)
    handleCloseModal(closeModalButton)
    // }
  }
  // activating the close modal 
  function handleCloseModal(closeModalButton) {
    closeModalButton.addEventListener('click', closeModal)
  }

  function closeModal() {
    modal.classList.replace('modal', 'hidden')
    app.classList.remove('modal-open')
    header.classList.remove('modal-open')
  }


}

document.addEventListener('DOMContentLoaded', init)