import React, {useState} from "react";

export function Carousel({images}) {
    const [image, setImage] = useState(0);

    return (
        <div className="carousel-container">
            <button onClick={(e) => {
                e.stopPropagation();
                setImage(image === 0 ? images.length - 1 : image - 1)
            }} className="left-button">
                &lt;
            </button>
            <div className="carousel" style={{"marginLeft": `${-image * 50}vw`}}>
                {images.map((image, i) => {
                    return (
                        <div className="carouselContent" key={i}>
                            <img src={image.link} alt={image.alt} className='modal-img'/>
                        </div>)
                })}
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                setImage(image === images.length - 1 ? 0 : image + 1)
            }} className="right-button">
                &gt;
            </button>
        </div>
    )
}
