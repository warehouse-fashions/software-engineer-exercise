import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class Lightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    const { handleCloseLightbox } = this.props;

    this.setState({ isOpen: false });
    // Send close event to parent and set state to false
    handleCloseLightbox();

    // TODO: Remove
    console.log('m close: ', this.props);
  }

  render() {
    const { isOpen } = this.state;
    const { handleOpenLightbox, children } = this.props;

    // TODO: Remove
    console.log('props:', this.props);

    return (
      <div>
        <button onClick={this.handleOpenModal}>Open modal</button>
        <Modal open={handleOpenLightbox || isOpen} onClose={this.handleCloseModal} center>
          {children}
        </Modal>
      </div>
    );
  }
}

export default Lightbox;