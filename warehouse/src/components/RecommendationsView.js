import React from 'react';

const RecommendationsView = (props) => {
  if (!props.recommendations) return null;
  if (!props.products) return null;

  function displayLightBox(evt) {
    props.onProductSelected(evt)
  }

  const recommendationData = props.recommendations.map((product) => {
    if (!product.image) {
      product.image = {
         "_type": "image",
         "alt": `${product.product_name}`,
         "link": `${require('../noImage.png')}`,
         "title": `${product.product_name}`
      }
    }

    function displayLightBox(id) {
      props.onProductSelected(id)
    }

    return (
      <div className="product-display">
        <img src={product.image.link} alt={product.image.alt}></img>
        <p className="product_name" onClick={() => displayLightBox(product.product_id)}>{product.product_name}</p>
        <p className="product_price" >£{product.price}</p>
    </div>
    )
  })


  return (
    <div className="recommendations-container">
      <h2 className="page-header">We Recommend</h2>
      {recommendationData}
    </div>
  )

}

export default RecommendationsView;
