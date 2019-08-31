import React, { Component } from 'react';
// import { Slide } from 'pure-react-carousel';
import placeholderImage from '../..//img/placeholder-2000x2000.png';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        main_image_src: ''
    };
    this.handleImageData = this.handleImageData.bind(this);
  }

  /**
   * Returns a place holder if image path is not returned
   * TODO: Move handling of data up in to parent component? 
   */
  handleImageData(image) {
    const imageSrc = image.length ? image : placeholderImage;
    this.setState( {main_image_src: imageSrc});

  }

  componentDidMount() {
      this.handleImageData(this.props.main_image_src)
  }

  render() {
    const { key, product_id, name, main_image_alt, currency, selling_price, onClick } = this.props;
    const { main_image_src } = this.state;

    return (
      <div index={key} className='ProductCardContainer'>
        <article className='ProductCard' onClick={onClick}>
          <div className='ProductCardImage'>
            <img src={main_image_src} alt={main_image_alt} />
          </div>
          <div className='ProductCardContent'>
            <p className='ProductName'>{name}</p>
            <p className='ProductSellingPrice'>£{parseFloat(Math.round( selling_price * 100) / 100).toFixed(2)}</p>
          </div>
        </article>
      </div>
    );
  }
}

export default ProductCard;
