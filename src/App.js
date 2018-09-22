import React, {Component} from 'react';
import './App.css';
import Slider from "react-slick";
import recommendations from './data/recommendations'
import ProductModal from './components/productModal'

class App extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(productId) {
        this.setState({
            modalIsOpen: true,
            productId: productId
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {

        const items = recommendations.hits
            .filter((recommendationsWithOutImage) => {
                return recommendationsWithOutImage.image
            })
            .map((recommendationWithImage) => {
                return <div key={recommendationWithImage.product_id}>
                    <img className='item-image' alt={recommendationWithImage.image.alt}
                         src={recommendationWithImage.image.link}
                         onClick={() => this.openModal(recommendationWithImage.product_id)}/>
                    <h3>{recommendationWithImage.product_name}</h3>
                    <h5>{recommendationWithImage.price}.00</h5>
                </div>
            });

        return (
            <div className="App">
                <h1 className="App-title">WE RECOMMEND</h1>
                <Slider {...sliderSettings}>
                    {items}
                </Slider>
                {this.state.modalIsOpen && <ProductModal isOpen={this.state.modalIsOpen}
                                                         closeModal={this.closeModal}
                                                         productId={this.state.productId}
                />}
            </div>
        );
    }
}

const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default App;
