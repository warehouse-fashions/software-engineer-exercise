import React from 'react';

const LightBox = (props) => {
  if (!props.id) return null;

  return(
    <div>
      <h1 className='lightbox'>Hello world</h1>
    </div>
  )
}

export default LightBox;
