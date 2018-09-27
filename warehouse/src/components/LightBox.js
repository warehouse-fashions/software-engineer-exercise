import React from 'react';
import Product from '../data/product.json';
import Modal from 'react-responsive-modal';

class LightBox extends React.Component {
  constructor(props){
    super();
    this.state = {
      open: true,
      product: '',
      images: []
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
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    const images = this.state.images.map((image) => {
      return (
        <div>
          <img src={image.link}></img>
        </div>
      )
    })

    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h4>{this.state.product.name}</h4>
          <h4>£{this.state.product.price}</h4>
          {images}
        </Modal>
      </div>
    );
  }
}

export default LightBox;
