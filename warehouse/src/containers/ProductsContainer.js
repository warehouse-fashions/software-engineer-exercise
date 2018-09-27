import React from 'react';
import Recommendations from '../data/recommendations.json';
import Product from '../data/product.json';
import RecommendationsView from '../components/RecommendationsView.js';

class ProductsContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: Product,
      recommendations: Recommendations.hits
    };
  }

  render(){
    return(
      <div>
        <RecommendationsView recommendations={this.state.recommendations} />
      </div>
    )
  }



}

export default ProductsContainer;
