import React, {useState} from "react";
import "./Carousel.css";

export function Carousel({images}) {
    const [image, setImage] = useState(0);

    return (
        <div className="carousel">
            <div className="carousel-inner">
                <button onClick={(e) => {
                    e.stopPropagation();
                    setImage(image === 0 ? images.length - 1 : image - 1)
                }} className="left-button">
                    &lt;
                </button>
                <div className="carousel-widget" style={{"marginLeft": `${-image * 100}%`}}>
                    {images.map((image, i) => <div className="carousel-item">
                            <img src={image.link} alt={image.alt} key={i}/>
                        </div>
                    )}
                </div>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setImage(image === images.length - 1 ? 0 : image + 1)
                }} className="right-button">
                    &gt;
                </button>
            </div>
        </div>
    )
}
