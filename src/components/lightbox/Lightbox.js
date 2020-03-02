import React from 'react'

const Lightbox = ({ data }) => {
  const arr = data.image_groups ? data.image_groups[0].images : []
  console.log(arr)
  return (
    <div className='void'>
      <div className='lightbox' name='lightbox'>
        <div className='light-left'>
          {arr.map((elem,index) => (
            <img className='light-img' src={elem.link} key={index}/>
          ))
          }
        </div>
        <div className='light-right'>
          <h3>{data.name}</h3>
          <h5>£ {Number(`${data.price}`).toFixed(2)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
