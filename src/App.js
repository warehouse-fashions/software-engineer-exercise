import React, {Component} from 'react';
import './App.css';
import Slider from "react-slick";
import recommendations from './data/recommendations'

class App extends Component {

    render() {

        const items = recommendations.hits
            .filter((recommendationsWithOutImage) => {
                return recommendationsWithOutImage.image
            })
            .map((recommendationWithImage) => {
                return <div key={recommendationWithImage.product_id}>
                    <img className='item-image' alt={recommendationWithImage.image.alt}
                         src={recommendationWithImage.image.link}/>
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
