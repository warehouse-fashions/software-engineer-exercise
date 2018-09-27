import React from 'react';
import Recommendations from '../data/recommendations.json';
import Product from '../data/product.json';
import RecommendationsView from '../components/RecommendationsView.js';
import LightBox from '../components/LightBox.js';

class ProductsContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: Product,
      recommendations: Recommendations.hits,
      lightBox: false,
      productId: ''
    };

    this.handleProductSelected = this.handleProductSelected.bind(this);
  }

  handleProductSelected(productId) {
    this.setState({
      lightBox: true,
      productId: productId
    })
  }


  render(){

    let lightBoxDisplay = null;

    if(this.state.lightBox){
      lightBoxDisplay = <LightBox id={this.state.productId} />
    }

    return(
      <div>
        
        <RecommendationsView recommendations={this.state.recommendations} products={this.state.products} onProductSelected={this.handleProductSelected}/>

        <div>
          {lightBoxDisplay}
        </div>

      </div>
    )
  }

}

export default ProductsContainer;
