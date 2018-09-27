import React from 'react';
import Product from '../data/product.json';
import Modal from 'react-responsive-modal';

class LightBox extends React.Component {
  constructor(props){
    super();
    this.state = {
      open: true
    };
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Product Information Here</h2>
        </Modal>
      </div>
    );
  }
}

export default LightBox;
