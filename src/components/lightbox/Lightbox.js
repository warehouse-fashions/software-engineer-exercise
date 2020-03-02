import React from 'react'

const Lightbox = ({ hits }) => {
  return (
    <div className='lightbox' name='lightbox'>
      <div className='light-left'>
        <img></img>
      </div>
      <div className='light-right'>
        <h3>{hits.product_name}</h3>
        <h5>£ {Number(`${hits.price}`).toFixed(2)}</h5>
      </div>
    </div>
  )
}

export default Lightbox
