import React from 'react';
import Product from '../data/product.json';
import Modal from 'react-responsive-modal';

class LightBox extends React.Component {
  constructor(props){
    super();
    this.state = {
      open: true,
      product: '',
      images: [],
      colours: [],
      sizes: []
    };
  }

  componentDidMount(){
    this.returnProductFromId();
  }

  returnProductFromId(){
    const productId = this.props.id.slice(0, -4);

    const productData = Product.data.filter(product => product.id === productId)[0];
    this.setState({product: productData})
    this.setState({images: productData.image_groups[0].images})
    this.setState({colours: productData.image_groups[1].images})
    this.setState({sizes: productData.variants})
  }

  onCloseLightbox = () => {
    this.setState({ open: false });
    this.props.onCloseLightbox()
  };

  render() {

    const images = this.state.images.map((image) => {
      return (
        <div>
          <img className="product-images" src={image.link}></img>
        </div>
      )
    })

    const colours = this.state.colours.map((colour) => {
      return (
        <div>
          <img className="product-colour" src={colour.link}></img>
        </div>
      )
    })

    const sizes = this.state.sizes.map((size) => {
      return (
        <div>
        <p className="product-sizes">{size.variation_values.size}</p>
        </div>
      )
    })

    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseLightbox} center>
          <h3>{this.state.product.name}</h3>
          <h4>£{this.state.product.price}</h4>
          {colours}
          {sizes}
          {images}
        </Modal>
      </div>
    );
  }
}

export default LightBox;
