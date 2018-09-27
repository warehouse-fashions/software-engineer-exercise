import React from 'react';
import Recommendations from '../data/recommendations.json';
import Product from '../data/product.json';
import RecommendationsView from '../components/RecommendationsView.js';

class ProductsContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: Product,
      recommendations: Recommendations.hits,
    };

    this.handleProductSelected = this.handleProductSelected.bind(this);
  }

  handleProductSelected(product) {
    console.log(product);
  }


  render(){
    return(
      <div>
        <RecommendationsView recommendations={this.state.recommendations} products={this.state.products} onProductSelected={this.handleProductSelected}/>
      </div>
    )
  }

}

export default ProductsContainer;
