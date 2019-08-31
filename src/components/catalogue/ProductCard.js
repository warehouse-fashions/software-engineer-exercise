import React, { Component } from 'react';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        main_image_src: ''
    };
    this.handleImageData = this.handleImageData.bind(this);
  }

  handleImageData(image) {
    console.log(image);
    
    const imageSrc = image.length ? image : 'https://via.placeholder.com/2000';
    this.setState( {main_image_src: imageSrc});

  }

  componentDidMount() {
      this.handleImageData(this.props.main_image_src)
  }

  render() {
    const { product_id, name, main_image_alt, currency, selling_price } = this.props;
    const { main_image_src } = this.state;
    console.log('Props: ', this.props);
    console.log('State: ', this.state);

    return (
      <div key={product_id} className='ProductCardContainer'>
        <article className='ProductCard'>
          <img src={main_image_src} alt={main_image_alt} />
          <p>{name}</p>
          <p>£ {parseFloat(Math.round( selling_price * 100) / 100).toFixed(2)}</p>
        </article>
      </div>
    );
  }
}

export default ProductCard;
