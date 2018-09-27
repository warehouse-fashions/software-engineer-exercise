import React from 'react';

const RecommendationsView = (props) => {
  if (!props.recommendations) return null;

  const recommendationData = props.recommendations.map((product) => {
    if (!product.image) {
      product.image = {
         "_type": "image",
         "alt": `${product.product_name}`,
         "link": `${require('../noImage.png')}`,
         "title": `${product.product_name}`
      }
    }

    return (
      <div className="product-display">
        <img src={product.image.link} alt={product.image.alt}></img>
        <p className="product_name">{product.product_name}</p>
        <p className="product_price">£{product.price}</p>
    </div>
    )
  })


  return (
    <div className="recommendations-container">
      {recommendationData}
    </div>
  )

}

export default RecommendationsView;
