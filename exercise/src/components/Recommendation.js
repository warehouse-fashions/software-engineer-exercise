import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductModal from "./ProductModal";

class Recommendation extends React.Component {
  state = {
    show: false,
    selectedProductData: []
  };

  handleClose = () => {
    this.setState({
      show: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
    this.getData(this.props.data.product_id);
  }

  getData = (productID) => {
    fetch("data/product.json")
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({
        selectedProductData: data.data.find((i) => productID.includes(i.id))
      });
    })
    .catch(err => console.log(err));
  }

  renderModal = () => {
    const data = this.state.selectedProductData;
    if(data){
      return (
        <>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedProductData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.selectedProductData.long_description}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  };

  render() {
    // console.log(this.props.data);
    return (
      <div>
        <Card onClick={this.handleShow} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={this.props.data.image.link} />
          <Card.Body>
            <Card.Title>{this.props.data.product_name}</Card.Title>
            <Card.Text>{`£${this.props.data.price}`}</Card.Text>
            <Button variant="primary" >
              Launch demo modal
            </Button>
          </Card.Body>
        </Card>
        {this.renderModal()}
      </div>
    );
  }
}

export default Recommendation;