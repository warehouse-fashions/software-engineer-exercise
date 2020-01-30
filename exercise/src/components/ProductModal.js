import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductModal extends React.Component{
    renderCarousel = () => {
        if (this.props.imageGroup){
            const images = this.props.imageGroup.filter((imgGrp) => imgGrp.view_type === "hi-res");
            const renderedImages = images[0].images.map((imgObject, keyVal) => {
              return (
                <Carousel.Item key={keyVal}>
                  <img
                    src={imgObject.link}
                    width="200"
                    alt="dress_img"
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
                    <div key={keyVal}>
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
                    <div key={keyVal}>
                        <p>{sizeVariant.variation_values.size}</p>
                    </div>
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
                      className="bg-light custom_projects_carousel"
                      nextIcon={
                        <FontAwesomeIcon
                          icon="chevron-right"
                          className="custom_projects_nextIcon"
                        />
                      }
                      prevIcon={
                        <FontAwesomeIcon
                          icon="chevron-left"
                          className="custom_projects_nextIcon"
                        />
                      }
                    >
                      {this.renderCarousel()}
                    </Carousel>
                  </Col>
                  <Col sm={6}>
                    {this.props.title}
                    {`£${this.props.price}`}
                    {this.renderSwatches()}
                    {this.renderSizes()}
                    {this.props.description}
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