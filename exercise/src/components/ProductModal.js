import React from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductModal extends React.Component{
    state = {
      selectedSwatch: 0
    }

    renderCarousel = () => {
        if (this.props.imageGroup){
            const images = this.props.imageGroup.filter((imgGrp) => imgGrp.view_type === "hi-res");
            const renderedImages = images[this.state.selectedSwatch].images.map((imgObject, keyVal) => {
              return (
                <Carousel.Item key={keyVal}>
                  <img
                    src={imgObject.link}
                    width="200"
                    alt={imgObject.alt}
                  />
                </Carousel.Item>
              );
            });
            return renderedImages;
        }
    }

    renderSwatches = () => {
        if (this.props.imageGroup) {
            const swatches = this.props.imageGroup.filter((imgGrp) => imgGrp.view_type === "swatch");
            const renderedSwatches = swatches.map((swatchObject, keyVal) => {
                return (
                  <div key={keyVal} className="custom_modal_swatch" onClick={() => {this.setState({ selectedSwatch: keyVal })}}>
                      <img src={swatchObject.images[0].link} alt=""/>
                  </div>
                );
            });
            return renderedSwatches;
        }
    }

    renderSizes = () => {
        if (this.props.variants){
            const sizes = this.props.variants;
            const renderedSizes = sizes.map((sizeVariant, keyVal) => {
                return (
                  <Col xs={2} sm={4} md={3} lg={2} xl={2} key={keyVal}>
                    <div className="custom_modal_size">
                      <p className="custom_modal_p">{sizeVariant.variation_values.size}</p>
                    </div>
                  </Col>
                );
            });
            return renderedSizes;
        }
    }

    render(){
        return (
          <>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row className="show-grid">
                  <Col sm={6}>
                    <Carousel
                      indicators={false}
                      interval={null}
                      className="bg-light custom_modal_carousel"
                      nextIcon={
                        <FontAwesomeIcon
                          icon="chevron-right"
                          className="custom_modal_nextIcon"
                        />
                      }
                      prevIcon={
                        <FontAwesomeIcon
                          icon="chevron-left"
                          className="custom_modal_nextIcon"
                        />
                      }
                    >
                      {this.renderCarousel()}
                    </Carousel>
                  </Col>
                  <Col sm={6}>
                    <h4 className="custom_modal_title">{this.props.title}</h4>
                    <p>{`£${this.props.price}`}</p>
                    <div className="custom_modal_swatches">
                        {this.renderSwatches()}
                    </div>
                    <div className="custom_modal_sizes">
                      <Row className="show-grid">
                        {this.renderSizes()}
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </>
        );
    }
}

export default ProductModal;