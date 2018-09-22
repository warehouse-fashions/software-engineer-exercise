import React, {Component} from 'react';
import Modal from 'react-modal';
import products from '../data/product'

export default class ProductModal extends Component {

    constructor() {
        super();
        this.state = {
            product: ''
        };
    }

    componentDidMount(){
        this.findProduct();
    }

    findProduct(){
        const productIdSlice = this.props.productId.slice(0,6);

        const foundItems = products.data
            .filter((product) => {
                return product.id === productIdSlice
            });

        this.setState({
            product: foundItems[0]
        });
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    style={customStyles}
                >
                    <h3>{this.state.product.name}</h3>
                    <h4>£{this.state.product.price}.00</h4>
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

