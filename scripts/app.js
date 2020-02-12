// complete scroll

// set up modal

function init () {

  const app = document.querySelector('#app')
  console.log(app)
  const images = document.querySelector('.images')
  console.log(images)

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
        console.log(product, 'product')
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
    ` : '')

    .join('')}
    <div> 
      <h2>${elem.product_name}</h2>
      <p>£${elem.price}.00</p>
    </div>

    </div>`,
  
    ).join('')


    // console.log(product.data.map(item => item.variants.map((el, i)  => el.product_id.includes(recID[i]))))
    // console.log(product.data.map(item => item.image_groups.map(i => i.images[0].link)))
    const items = document.querySelectorAll('.items')
    handleClick(items)
  }

  function handleClick (items) {
    items.forEach(item => item.addEventListener('click', openModal))
  }

  function openModal () {
    console.log('clicked')
  }
  

  // images.addEventListener('click', openModal)
}


document.addEventListener('DOMContentLoaded', init)