import React from 'react';
import Recommendations from '../data/recommendations.json';
import Product from '../data/product.json';

class ProductsContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: Product,
      recommendations: Recommendations
    };
  }

  render(){
    return(
      <div></div>
    )
  }



}

export default ProductsContainer;
