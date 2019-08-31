import React, { Component } from 'react';
import '../css/components/ProductCarousel.css';
import ProductCard from './catalogue/ProductCard';

class ProductCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: []
    };
  }

  componentDidMount() {
    fetch(`/api/products/recommendations`)
      .then(response => response.json())
      .then(data => this.setState( {recommendations: data.hits} ));
  }

  render() {
    const { recommendations } = this.state;
    const { name } = this.props;

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
          {ProductRecommendations}
        </header>
      </div>
    );
  }
}

export default ProductCarousel;
