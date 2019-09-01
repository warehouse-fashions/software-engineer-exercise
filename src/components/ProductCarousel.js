import React, { Component } from 'react';
import '../css/components/ProductCarousel.css';
import ProductCard from './catalogue/ProductCard';
import ProductDetailsView from './catalogue/ProductDetailsView';
import Lightbox from './Lightbox';

// Import Slick Carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
      selectedVariantId: 0,
      selectedProduct: undefined,
      isLightboxOpen: false
    };

    this.handleOpenLightbox = this.handleOpenLightbox.bind(this);
    this.handleCloseLightbox = this.handleCloseLightbox.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/recommendations`)
      .then(response => response.json())
      .then(data => this.setState( {recommendations: data.hits} ));

    fetch(`/api/products`)
      .then(response => response.json())
      .then(data => this.setState( {products: data.data} ));
  }

  handleOpenLightbox(variantId) {
    const { products } = this.state;
    const productId = variantId.slice(0, -4);
    const selectedProduct = products.filter(p => { return p.id === productId})[0];

    this.setState(
      {
        selectedVariantId: variantId,
        selectedProduct: selectedProduct,
        isLightboxOpen: true
      }
    );
  }

  handleCloseLightbox() {
    this.setState({ isLightboxOpen: false });
  };

  render() {
    const { recommendations, selectedVariantId, selectedProduct, isLightboxOpen } = this.state;
    const { name } = this.props;

    // Workaround for click event not detecting mousemove
    let isDragging = false;

    // TODO: Identify breakpoints and better naming
    const breakpointLarge = 820;
    const breakpointMedium = 620;
    const breakpointSmall = 520;

    // Iterate over recommendations and return the ProductCard for each
    const ProductRecommendations = recommendations.map((item, key) =>
      <ProductCard
        key= {key}
        product_id= {item.product_id}
        name= {item.product_name}
        main_image_src= {item.image ? item.image.link : ''}
        main_image_alt= {item.image ? item.image.alt : ''}
        currency= {item.currency}
        selling_price= {item.price}
        onClick={e => !isDragging && this.handleOpenLightbox(item.product_id)}
      />
    );

    // Slick Carousel Settings
    const carouselSettings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      responsive: [
        {
          breakpoint: breakpointLarge,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: breakpointMedium,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: breakpointSmall,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ],
      beforeChange: () => isDragging = true,
      afterChange: () => isDragging = false
    };

    return (
      <div className="ProductCarousel">
        <header className="ListingHeader">
          <h1>{name}</h1>
        </header>
        <div>
          <Slider {...carouselSettings}>
            {ProductRecommendations}
          </Slider>
        </div>

        <Lightbox handleOpenLightbox={isLightboxOpen} handleCloseLightbox={this.handleCloseLightbox}>
          <ProductDetailsView product={selectedProduct} selectedVariantId={selectedVariantId} />
        </Lightbox>
      </div>
    );
  }
}

export default ProductCarousel;
