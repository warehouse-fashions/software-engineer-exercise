function init () {

  const app = document.querySelector('#app')
  console.log(app)
  // const body = document.querySelector('.body')

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
        console.log(product, 'pro', recommendations, 'rec')
        mapItems(product, recommendations)
      })
      .catch(err => {
        console.log(err)
      }) 
  }

  // Mapping the items to the page using the data from products and recommendations 
  function mapItems(product, recommendations) {
    console.log(product,'hi')
    console.log(recommendations,'lo')
  }

  // function mapRecommendations(recommendations) {
  //   // console.log('hello', data.hits.length)
  //   app.innerHTML = recommendations.hits.map(elem => 
  //     // console.log(elem)
  //     `<div> 
  //     <h2>${elem.product_name}</h2>
  //     </div>`
  //   ).join('')


  // }

}

document.addEventListener('DOMContentLoaded', init)