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
      <ul>
        <li>{product.price}</li>
        <li>{product.product_name}</li>
        <li>{product.image.alt}</li>
        <li><img src={product.image.link} ></img></li>
      </ul>
    )
  })


  return (
    <div>
      {recommendationData}
    </div>
  )

}

export default RecommendationsView;
