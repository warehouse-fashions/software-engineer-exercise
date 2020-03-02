import React from 'react'

const ProductCard = ({ hits, showLight }) => {
  return (
    <div className='product-card'>
      <img 
        id={hits.product_id}
        src={hits.image.link}
        className='card-img'
        onClick={showLight}
      />

      <h4>{hits.product_name}</h4>
      <h5>£ {Number(`${hits.price}`).toFixed(2)}</h5>
    </div>
  )
}

export default ProductCard
