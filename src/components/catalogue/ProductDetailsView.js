import React, { Component } from 'react';
import '../../css/components/catalogue/ProductDetailsView.css';

// Import Slick Carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import placeholderImage from '../../img/placeholder-2000x2000.png';

class ProductDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedVariantId: 0,
        productName: '',
        selectedVariantSellingPrice: 0,
        productSwatches: [],
        selectedVariantSizes: [],
        selectedVariantImages: []
    };
    this.handleProductData = this.handleProductData.bind(this);
  }

  handleProductData(selectedVariantId) {
    const { product } = this.props;

    // Get variation_values for selected variant
    const selectedVariant = product.variants.filter(v => {
      return v.product_id === selectedVariantId;
    })[0];

    const selectedVariantColorId = selectedVariant.variation_values.color;

    // Get hi-res images for selected variant
    const selectedVariantImages = product.image_groups.filter(ig => {
      return ig.view_type === 'hi-res' && ig.variation_value === selectedVariantColorId;
    })[0].images;

    // Get all swatch images
    // TODO: Cleanup - sloppy, no return
    let productSwatches = [];
    product.image_groups.filter(ig => {
      if (ig.view_type === 'swatch') {
        ig.images.map(i => {
          let image = i;
          image.color_id = ig.variation_value;
          productSwatches.push(image);
        });
      }
    });

    // Get sizes for selected variant
    // TODO: Cleanup - sloppy, no return
    let selectedVariantSizes = [];
    product.variants.filter(v => {
      if (v.variation_values.color === selectedVariantColorId) {
        selectedVariantSizes.push(v.variation_values.size);
      }
    });

    this.setState(
      {
        productName: product.name,
        selectedVariantSellingPrice: selectedVariant.price,
        selectedVariantImages: selectedVariantImages,
        selectedVariantSizes: selectedVariantSizes,
        productSwatches: productSwatches
      }
    );
  }

  componentDidMount() {
    this.handleProductData(this.props.selectedVariantId);
  }

  render() {
    const { productName, selectedVariantSellingPrice, selectedVariantImages, productSwatches, selectedVariantSizes } = this.state;

    // Slick Carousel Settings
    const carouselSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    const images = selectedVariantImages.map((image, key) => {
      return (
        <div key={key}>
          <img src={image.link} alt={image.alt}></img>
        </div>
      )
    });

    const swatches = productSwatches.map((swatch, key) => {
      return (
        <div key={key}>
          <img src={swatch.link} alt={swatch.alt}></img>
        </div>
      )
    });

    const sizes = selectedVariantSizes.map((size, key) => {
      return (
        <div key={key}>
          <p>{size}</p>
        </div>
      )
    });

    return (
      <div className='ProductDetailsViewContainer'>
        <div className='ProductDetailsView'>
          <div className='ImageCarousel'>
            {
              images ?
                (
                  <Slider {...carouselSettings}>
                    {images}
                  </Slider>
                )
              :
                (
                  <img src={placeholderImage} alt='' />
                )
            }
          </div>

          <div className='ProductDetails'>
            <p>{productName}</p>
            <p className='ProductSellingPrice'>£{parseFloat(Math.round( selectedVariantSellingPrice * 100) / 100).toFixed(2)}</p>

            {
              swatches ?
                (
                  <div className='ProductSwatches'>
                    {swatches}
                  </div>
                )
              : null
            }

            {
              sizes ?
                (
                  <div className='ProductSizes'>
                    {sizes}
                  </div>
                )
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetailsView;
