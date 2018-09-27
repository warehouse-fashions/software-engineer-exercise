import React from 'react';

const RecommendationsView = (props) => {
  if (!props.recommendations) return null;

  const recommendationData = props.recommendations.map((product) => {
    return (
      <ul>
        <li>{product.price}</li>
        <li>{product.product_name}</li>
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
