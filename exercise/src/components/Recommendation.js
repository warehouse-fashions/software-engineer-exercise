import React from "react";
import Card from "react-bootstrap/Card";
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
          <Modal show={this.state.show} size="xl" onHide={this.handleClose}>
            <ProductModal
              title={data.name}
              description={data.long_description}
              currency={data.currency}
              price={this.props.data.price}
              variants={data.variants}
              imageGroup={data.image_groups}
              handleClose={this.handleClose}
              handleShow={this.handleShow}
            />
          </Modal>
        </>
      );
    }
  };

  render() {
    return (
      <div>
        <Card onClick={this.handleShow} className="custom_recommendation_card" style={{ width: "18rem", border: "none"}}>
          <Card.Img variant="top" src={this.props.data.image.link} />
          <Card.Body className="custom_recommendation_body">
            <Card.Title className="custom_recommendation_title">{this.props.data.product_name}</Card.Title>
            <Card.Text>{`£${this.props.data.price}`}</Card.Text>
          </Card.Body>
        </Card>
        {this.renderModal()}
      </div>
    );
  }
}

export default Recommendation;