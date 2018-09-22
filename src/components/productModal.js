import React, {Component} from 'react';
import Modal from 'react-modal';

export default class ProductModal extends Component {

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    style={customStyles}
                >
                    <h4>{this.props.productId}</h4>
                    <button onClick={this.props.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

