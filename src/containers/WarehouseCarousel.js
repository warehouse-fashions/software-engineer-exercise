import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductItem from '../components/ProductItem';
import { NextArrow, PrevArrow } from '../components/CarouselArrows';

const WarehouseCarousel = ({ProductData}) => {

    const [isDragging, setIsDragging] = useState(false);
    const [draggable, setDraggable] = useState(true);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: draggable,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1140,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const toggleDragging = (value) => setIsDragging(value);
    const toggleDraggable = (value) => setDraggable(value);

    return (
        <div className='carousel-container'>
            <h1>We Recommend</h1>
            <Slider {...settings} >
                {ProductData.map((item, index) =>
                    <ProductItem
                        key={`item${index}-${item.id}`}
                        data={item}
                        draggable={draggable}
                        isDragging={isDragging}
                        toggleDragging={toggleDragging}
                        toggleDraggable={toggleDraggable}
                    />
                )}
            </Slider>
        </div>
    )
}

export default WarehouseCarousel;
