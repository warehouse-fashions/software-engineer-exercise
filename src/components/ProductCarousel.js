import React, { Component } from 'react';
import '../css/components/ProductCarousel.css';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ProductCard from './catalogue/ProductCard';
import throttle from 'lodash.throttle';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations_count: 0,
      recommendations: [],
      showItemsCount: 4
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  /**
   * Determine the width of the viewport and specify
   * the number of items to show in the carousel
   */
  handleWindowResize() {
    const width = window.innerWidth;

    // TODO: Identify appropriate breakpoints & name accordingly
    const breakpointMedium = 700;
    const breakpointSmall = 520;

    // TODO: Cleanup
    if (width >= breakpointMedium) {
      this.setState({ showItemsCount: 4 });
    }
    if (width > breakpointSmall && width < breakpointMedium) {
      this.setState({ showItemsCount: 3 });
    }
    if (width <= breakpointSmall) {
      this.setState({ showItemsCount: 1 });
    }
  }

  componentDidMount() {
    fetch(`/api/products/recommendations`)
      .then(response => response.json())
      .then(data => this.setState( {recommendations_count: data.count, recommendations: data.hits} ));

    // Listen on user resizing the window
    window.addEventListener('resize', this.handleWindowResize);

    // Throttle - don't call handleResize more than 5x per second
    throttle(() => {
      this.handleWindowResize();
    }, 200);
  }

  render() {
    const { recommendations_count, showItemsCount, recommendations } = this.state;
    const { name } = this.props;

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
      />
    );

    return (
      <div className="ProductCarousel">
        <header className="ListingHeader">
          <h1>{name}</h1>
        </header>
        <div>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={150}
            totalSlides={recommendations_count}
            visibleSlides={showItemsCount}
          >
            <Slider>
              {ProductRecommendations}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    );
  }
}

export default ProductCarousel;
